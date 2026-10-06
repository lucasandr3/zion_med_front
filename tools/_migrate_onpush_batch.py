# -*- coding: utf-8 -*-
"""Batch migrate pages to OnPush + signals. Pattern from pessoas-listagem / _migrate_fase4_show."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def close_sets(body: str, names: list[str]) -> str:
    for name in names:
        needle = f"this.{name}.set("
        out: list[str] = []
        i = 0
        while True:
            j = body.find(needle, i)
            if j < 0:
                out.append(body[i:])
                break
            out.append(body[i:j])
            start = j + len(needle)
            depth = 1
            depth_brace = depth_bracket = 0
            k = start
            in_str = None
            while k < len(body):
                ch = body[k]
                if in_str:
                    if ch == "\\" and k + 1 < len(body):
                        k += 2
                        continue
                    if ch == in_str:
                        in_str = None
                    k += 1
                    continue
                if ch in ("'", '"', "`"):
                    in_str = ch
                elif ch == "(":
                    depth += 1
                elif ch == ")":
                    depth -= 1
                    if depth == 0:
                        end = k + 1
                        if end < len(body) and body[end] == ";":
                            out.append(needle + body[start : end + 1])
                            i = end + 1
                        else:
                            out.append(needle + body[start:k] + ");")
                            i = k + 1
                        break
                elif ch == "{":
                    depth_brace += 1
                elif ch == "}":
                    depth_brace -= 1
                elif ch == "[":
                    depth_bracket += 1
                elif ch == "]":
                    depth_bracket -= 1
                elif ch == ";" and depth == 1 and depth_brace == 0 and depth_bracket == 0:
                    out.append(needle + body[start:k] + ");")
                    i = k + 1
                    break
                k += 1
            else:
                out.append(body[j:])
                i = len(body)
                break
        body = "".join(out)
    return body


def wire_class_body(body: str, names: list[str]) -> str:
    ordered = sorted(names, key=len, reverse=True)
    for name in ordered:
        body = re.sub(
            rf"this\.{re.escape(name)}(?![A-Za-z0-9_])\s*=(?!=)\s*",
            rf"this.{name}.set(",
            body,
        )
    body = close_sets(body, ordered)
    for name in ordered:
        body = re.sub(
            rf"this\.{re.escape(name)}(?![A-Za-z0-9_])(?!\s*\.set)(?!\s*\.update)(?!\s*\()",
            rf"this.{name}()",
            body,
        )
        body = body.replace(f"this.{name}()()", f"this.{name}()")
        body = body.replace(f"this.{name}().set(", f"this.{name}.set(")
        body = body.replace(f"this.{name}().update(", f"this.{name}.update(")
    return body


def patch_html(html: str, names: list[str]) -> str:
    before = r"(?<![A-Za-z0-9_/-])"
    after = r"(?![A-Za-z0-9_])"

    def transform_expr(expr: str) -> str:
        for name in sorted(names, key=len, reverse=True):
            expr = re.sub(
                rf"{before}{re.escape(name)}\s*=\s*!{re.escape(name)}{after}",
                rf"{name}.set(!{name}())",
                expr,
            )
            expr = re.sub(rf"{before}{re.escape(name)}\s*=(?!=)\s*", rf"{name}.set(", expr)
        out: list[str] = []
        i = 0
        while True:
            j = expr.find(".set(", i)
            if j < 0:
                out.append(expr[i:])
                break
            out.append(expr[i : j + 5])
            start = j + 5
            depth = 1
            k = start
            in_str = None
            closed = False
            while k < len(expr) and depth > 0:
                ch = expr[k]
                if in_str:
                    if ch == "\\" and k + 1 < len(expr):
                        k += 2
                        continue
                    if ch == in_str:
                        in_str = None
                    k += 1
                    continue
                if ch in ("'", "`"):
                    in_str = ch
                elif ch == '"':
                    out.append(expr[start:k] + ")")
                    i = k
                    closed = True
                    break
                elif ch == "(":
                    depth += 1
                elif ch == ")":
                    depth -= 1
                    if depth == 0:
                        out.append(expr[start : k + 1])
                        i = k + 1
                        closed = True
                        break
                elif ch == ";" and depth == 1:
                    out.append(expr[start:k] + ")")
                    i = k
                    closed = True
                    break
                k += 1
            if not closed:
                out.append(expr[start:] + ")")
                break
        expr = "".join(out)
        for name in sorted(names, key=len, reverse=True):
            expr = re.sub(rf"{before}{re.escape(name)}\.(?!\()", rf"{name}().", expr)
            expr = re.sub(
                rf"{before}{re.escape(name)}{after}(?!\s*\()(?!\s*\.set)",
                rf"{name}()",
                expr,
            )
            expr = expr.replace(f"{name}()()", f"{name}()")
            expr = expr.replace(f"{name}().set(", f"{name}.set(")
        return expr

    html = re.sub(r"\{\{([\s\S]*?)\}\}", lambda m: "{{" + transform_expr(m.group(1)) + "}}", html)
    html = re.sub(
        r"@(if|else if)\s*\(([\s\S]*?)\)\s*\{",
        lambda m: f"@{m.group(1)} (" + transform_expr(m.group(2)) + ") {",
        html,
    )
    html = re.sub(
        r"@for\s*\(([\s\S]*?)\)\s*\{",
        lambda m: "@for (" + transform_expr(m.group(1)) + ") {",
        html,
    )
    html = re.sub(
        r"(\[\s*[\w.:%-]+\s*\]|\(\s*[\w.:-]+\s*\))\s*=\s*\"([^\"]*)\"",
        lambda m: m.group(1) + '="' + transform_expr(m.group(2)) + '"',
        html,
    )
    html = re.sub(
        r"(\[\s*[\w.:%-]+\s*\]|\(\s*[\w.:-]+\s*\))\s*=\s*'([^']*)'",
        lambda m: m.group(1) + "='" + transform_expr(m.group(2)) + "'",
        html,
    )
    return html


def ensure_imports(ts: str) -> str:
    m = re.search(r"import \{([^}]+)\} from '@angular/core';", ts)
    if not m:
        raise SystemExit("no core import")
    parts = [p.strip() for p in m.group(1).split(",") if p.strip()]
    parts = [p for p in parts if p != "ChangeDetectorRef"]
    for e in ("ChangeDetectionStrategy", "signal"):
        if e not in parts:
            parts.append(e)
    if "Signal" not in parts and "Signal" in ts:
        pass
    seen: set[str] = set()
    uniq: list[str] = []
    for p in parts:
        if p not in seen:
            seen.add(p)
            uniq.append(p)
    return re.sub(
        r"import \{[^}]+\} from '@angular/core';",
        "import { " + ", ".join(uniq) + " } from '@angular/core';",
        ts,
        count=1,
    )


def ensure_onpush(ts: str) -> str:
    if "changeDetection:" in ts:
        return ts
    if "standalone: true," in ts:
        return ts.replace(
            "standalone: true,",
            "standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush,",
            1,
        )
    return re.sub(
        r"@Component\(\{\n",
        "@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n",
        ts,
        count=1,
    )


def _is_class_field(ts: str, name_end: int) -> bool:
    i = name_end
    while i < len(ts) and ts[i] in " \t":
        i += 1
    if i >= len(ts):
        return False
    if ts.startswith("=", i) and not ts.startswith("==", i) and not ts.startswith("=>", i):
        return True
    if ts[i] != ":":
        return False
    i += 1
    while i < len(ts) and ts[i] in " \t":
        i += 1
    if i < len(ts) and ts[i] == "(":
        return False
    depth_brace = depth_bracket = depth_paren = 0
    in_str = None
    while i < len(ts):
        ch = ts[i]
        if in_str:
            if ch == "\\" and i + 1 < len(ts):
                i += 2
                continue
            if ch == in_str:
                in_str = None
            i += 1
            continue
        if ts.startswith("=>", i) and depth_brace == 0 and depth_paren == 0:
            return False
        if ch in ("'", '"', "`"):
            in_str = ch
        elif ch == "{":
            depth_brace += 1
        elif ch == "}":
            depth_brace -= 1
        elif ch == "[":
            depth_bracket += 1
        elif ch == "]":
            depth_bracket -= 1
        elif ch == "(":
            depth_paren += 1
        elif ch == ")":
            depth_paren -= 1
        elif ch == "=" and depth_brace == 0 and depth_bracket == 0 and depth_paren == 0:
            if not ts.startswith("==", i) and not ts.startswith("=>", i):
                return True
        elif ch in ",;" and depth_brace == 0 and depth_bracket == 0 and depth_paren == 0:
            return False
        i += 1
    return False


def replace_field_decl(ts: str, name: str, expr: str) -> str:
    pattern = rf"^([ \t]+)((?:(?:private|protected|public|readonly)\s+)*){re.escape(name)}\b"
    for m in re.finditer(pattern, ts, re.M):
        if not _is_class_field(ts, m.end()):
            continue
        indent = m.group(1)
        start = m.start()
        i = m.end()
        depth_brace = depth_bracket = depth_paren = 0
        in_str = None
        while i < len(ts):
            ch = ts[i]
            if in_str:
                if ch == "\\" and i + 1 < len(ts):
                    i += 2
                    continue
                if ch == in_str:
                    in_str = None
                i += 1
                continue
            if ch in ("'", '"', "`"):
                in_str = ch
            elif ch == "{":
                depth_brace += 1
            elif ch == "}":
                depth_brace -= 1
            elif ch == "[":
                depth_bracket += 1
            elif ch == "]":
                depth_bracket -= 1
            elif ch == "(":
                depth_paren += 1
            elif ch == ")":
                depth_paren -= 1
            elif ch == ";" and depth_brace == 0 and depth_bracket == 0 and depth_paren == 0:
                end = i + 1
                existing = ts[start:end]
                if "signal(" in existing:
                    return ts
                replacement = f"{indent}readonly {name} = {expr};"
                return ts[:start] + replacement + ts[end:]
            i += 1
        print(f"WARN no semicolon for {name}", file=sys.stderr)
        return ts
    print(f"WARN missing decl {name}", file=sys.stderr)
    return ts


def migrate_component(
    ts_rel: str,
    html_rel: str | None,
    converts: list[tuple[str, str]],
    class_marker: str,
    extra_html_names: list[str] | None = None,
) -> None:
    ts_path = ROOT / ts_rel
    ts = ts_path.read_text(encoding="utf-8")
    names = [n for n, _ in converts]

    ts = ensure_imports(ts)
    ts = ensure_onpush(ts)
    for name, expr in converts:
        ts = replace_field_decl(ts, name, expr)

    idx = ts.find(class_marker)
    if idx < 0:
        raise SystemExit(f"class marker missing: {class_marker}")
    head, body = ts[:idx], ts[idx:]
    body = wire_class_body(body, names)
    ts = head + body
    ts_path.write_text(ts, encoding="utf-8")

    if html_rel:
        html_path = ROOT / html_rel
        html = html_path.read_text(encoding="utf-8")
        html_names = names + (extra_html_names or [])
        html = patch_html(html, html_names)
        for n in html_names:
            html = html.replace(f"{n}()()", f"{n}()")
        html_path.write_text(html, encoding="utf-8")
    print("OK", ts_rel)


def onpush_only(ts_rel: str) -> None:
    ts_path = ROOT / ts_rel
    ts = ts_path.read_text(encoding="utf-8")
    ts = ensure_imports(ts)
    ts = ensure_onpush(ts)
    ts_path.write_text(ts, encoding="utf-8")
    print("OnPush-only", ts_rel)


def main() -> None:
    migrate_component(
        "src/app/paginas/protocolos/protocolos-detalhe.component.ts",
        "src/app/paginas/protocolos/protocolos-detalhe.component.html",
        [
            ("protocolo", "signal<ProtocoloDetalheData | null>(null)"),
            ("erro", "signal('')"),
            ("comentarioEnviando", "signal(false)"),
            ("revisaoEnviando", "signal(false)"),
            ("gerandoPdf", "signal(false)"),
            ("gerandoDossie", "signal(false)"),
            ("revisaoFormVisible", "signal(false)"),
            ("revogarFormVisible", "signal(false)"),
            ("revogando", "signal(false)"),
            ("solicitandoReconsentimento", "signal(false)"),
            ("staffSalvando", "signal(false)"),
            ("clinicaConfig", "signal<ClinicaConfig | null>(null)"),
            ("pessoaCompleta", "signal<Pessoa | null>(null)"),
            ("docHash", "signal('')"),
            ("docCode", "signal('')"),
            ("docVerifyUrl", "signal('')"),
            ("docQrDataUrl", "signal('')"),
        ],
        "export class ProtocolosDetalheComponent",
    )

    migrate_component(
        "src/app/paginas/templates/templates-campos.component.ts",
        "src/app/paginas/templates/templates-campos.component.html",
        [
            ("template", "signal<Template | null>(null)"),
            ("campos", "signal<TemplateCampo[]>([])"),
            ("linkPublicoUrl", "signal('')"),
            ("listaPronta", "signal(false)"),
            ("erro", "signal('')"),
            ("gerandoLink", "signal(false)"),
            ("desativandoLink", "signal(false)"),
            ("salvandoCampo", "signal(false)"),
            ("removendoId", "signal<number | null>(null)"),
            ("reordenando", "signal(false)"),
            ("aplicandoEstruturaTcle", "signal(false)"),
            ("salvandoActorsRules", "signal(false)"),
        ],
        "export class TemplatesCamposComponent",
    )

    migrate_component(
        "src/app/paginas/link-bio/link-bio.component.ts",
        "src/app/paginas/link-bio/link-bio.component.html",
        [
            ("state", "signal<LinkBioState | null>(null)"),
            ("erro", "signal('')"),
            ("previewSessionVersion", "signal(0)"),
            ("previewUrlSafe", "signal<SafeResourceUrl | null>(null)"),
            ("modeloPersistido", "signal<LinkBioLayoutModel>(1)"),
        ],
        "export class LinkBioComponent",
    )

    migrate_component(
        "src/app/paginas/clinica/clinica-configuracoes.component.ts",
        "src/app/paginas/clinica/clinica-configuracoes.component.html",
        [
            ("pageData", "signal<ConfigPageData | null>(null)"),
            ("listaPronta", "signal(false)"),
            ("salvando", "signal(false)"),
            ("erro", "signal('')"),
            ("sucesso", "signal(false)"),
            ("retencaoPreview", "signal<{ enabled: boolean; eligible_count: number; already_anonymized_count: number; cutoff_date: string | null } | null>(null)"),
            ("carregandoRetencaoPreview", "signal(false)"),
            ("salvandoNovaEmpresa", "signal(false)"),
            ("erroNovaEmpresa", "signal('')"),
            ("logs", "signal<ClinicaAuditLog[]>([])"),
            ("logsLoading", "signal(false)"),
            ("logsLoaded", "signal(false)"),
            ("logsError", "signal('')"),
            ("logsPage", "signal(1)"),
            ("logsLastPage", "signal(1)"),
            ("logsTotal", "signal(0)"),
            ("waState", "signal<WhatsappEvolutionState | null>(null)"),
            ("waLoading", "signal(false)"),
            ("waError", "signal('')"),
            ("waCriandoInstancia", "signal(false)"),
            ("waTokenExibicaoUnica", "signal<string | null>(null)"),
            ("waConectando", "signal(false)"),
            ("waQrSrc", "signal<string | null>(null)"),
            ("waQrLinkCode", "signal<string | null>(null)"),
            ("waQrCarregando", "signal(false)"),
            ("waPairCarregando", "signal(false)"),
            ("waPairingCode", "signal<string | null>(null)"),
            ("waDesconectando", "signal(false)"),
            ("waRemovendo", "signal(false)"),
            ("waTestEnviando", "signal(false)"),
            ("enderecoLoading", "signal(false)"),
            ("enderecoErro", "signal('')"),
            ("enderecoSucesso", "signal(false)"),
        ],
        "export class ClinicaConfiguracoesComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-dashboard/plataforma-dashboard.component.ts",
        "src/app/paginas/plataforma/plataforma-dashboard/plataforma-dashboard.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("tenantsCount", "signal(0)"),
            ("clinicsCount", "signal(0)"),
            ("usersCount", "signal(0)"),
            ("leadsCount", "signal(0)"),
            ("ultimosTenants", "signal<PlatformTenant[]>([])"),
            ("ultimosLeads", "signal<PlatformLead[]>([])"),
            ("ultimosLogs", "signal<PlatformAuditLog[]>([])"),
        ],
        "export class PlataformaDashboardComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-clientes/plataforma-clientes.component.ts",
        "src/app/paginas/plataforma/plataforma-clientes/plataforma-clientes.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("tenants", "signal<PlatformTenant[]>([])"),
        ],
        "export class PlataformaClientesComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-leads/plataforma-leads.component.ts",
        "src/app/paginas/plataforma/plataforma-leads/plataforma-leads.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("leads", "signal<PlatformLead[]>([])"),
        ],
        "export class PlataformaLeadsComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-faturas/plataforma-faturas.component.ts",
        "src/app/paginas/plataforma/plataforma-faturas/plataforma-faturas.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("faturas", "signal<PlatformInvoice[]>([])"),
        ],
        "export class PlataformaFaturasComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-logs/plataforma-logs.component.ts",
        "src/app/paginas/plataforma/plataforma-logs/plataforma-logs.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("error", "signal('')"),
            ("logs", "signal<PlatformAuditLog[]>([])"),
            ("currentPage", "signal(1)"),
            ("lastPage", "signal(1)"),
            ("total", "signal(0)"),
        ],
        "export class PlataformaLogsComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-assinaturas/plataforma-assinaturas.component.ts",
        "src/app/paginas/plataforma/plataforma-assinaturas/plataforma-assinaturas.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("assinaturas", "signal<PlatformSubscription[]>([])"),
        ],
        "export class PlataformaAssinaturasComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-organizacoes-online/plataforma-organizacoes-online.component.ts",
        "src/app/paginas/plataforma/plataforma-organizacoes-online/plataforma-organizacoes-online.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("linhas", "signal<PlatformOrganizationPresence[]>([])"),
        ],
        "export class PlataformaOrganizacoesOnlineComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-planos/plataforma-planos.component.ts",
        "src/app/paginas/plataforma/plataforma-planos/plataforma-planos.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("planos", "signal<PlatformPlan[]>([])"),
            ("excluindoId", "signal<string | number | null>(null)"),
        ],
        "export class PlataformaPlanosComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-plano-form/plataforma-plano-form.component.ts",
        "src/app/paginas/plataforma/plataforma-plano-form/plataforma-plano-form.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("saving", "signal(false)"),
            ("error", "signal('')"),
        ],
        "export class PlataformaPlanoFormComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-novidades/plataforma-novidades.component.ts",
        "src/app/paginas/plataforma/plataforma-novidades/plataforma-novidades.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("erro", "signal(false)"),
            ("notas", "signal<ReleaseNote[]>([])"),
            ("excluindoId", "signal<number | null>(null)"),
            ("salvando", "signal(false)"),
            ("editandoId", "signal<number | null>(null)"),
            ("exibirFormulario", "signal(false)"),
        ],
        "export class PlataformaNovidadesComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-trafico-landing/plataforma-trafico-landing.component.ts",
        "src/app/paginas/plataforma/plataforma-trafico-landing/plataforma-trafico-landing.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("atualizando", "signal(false)"),
            ("stats", "signal<LandingAnalyticsData | null>(null)"),
        ],
        "export class PlataformaTraficoLandingComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-cliente-detalhe/plataforma-cliente-detalhe.component.ts",
        "src/app/paginas/plataforma/plataforma-cliente-detalhe/plataforma-cliente-detalhe.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal(false)"),
            ("data", "signal<PlatformTenantDetail | null>(null)"),
        ],
        "export class PlataformaClienteDetalheComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-configuracoes/plataforma-configuracoes.component.ts",
        "src/app/paginas/plataforma/plataforma-configuracoes/plataforma-configuracoes.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("savingSettings", "signal(false)"),
            ("error", "signal('')"),
            ("successSettings", "signal('')"),
            ("data", "signal<PlatformSettingsData | null>(null)"),
        ],
        "export class PlataformaConfiguracoesComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-emails/plataforma-emails.component.ts",
        "src/app/paginas/plataforma/plataforma-emails/plataforma-emails.component.html",
        [
            ("listaPronta", "signal(false)"),
            ("estadoErro", "signal('')"),
            ("saving", "signal(false)"),
            ("loadingHistorico", "signal(false)"),
            ("formError", "signal('')"),
            ("emails", "signal<PlatformManualEmail[]>([])"),
            ("currentPage", "signal(1)"),
            ("lastPage", "signal(1)"),
            ("total", "signal(0)"),
        ],
        "export class PlataformaEmailsComponent",
    )

    migrate_component(
        "src/app/paginas/plataforma/plataforma-configuracoes/plataforma-servicos-tab.component.ts",
        "src/app/paginas/plataforma/plataforma-configuracoes/plataforma-servicos-tab.component.html",
        [
            ("savingSettings", "signal(false)"),
            ("savingStatus", "signal(false)"),
            ("successSettings", "signal('')"),
            ("successStatus", "signal('')"),
            ("error", "signal('')"),
        ],
        "export class PlataformaServicosTabComponent",
    )

    migrate_component(
        "src/app/paginas/formulario-publico/formulario-publico-sucesso.component.ts",
        "src/app/paginas/formulario-publico/formulario-publico-sucesso.component.html",
        [
            ("protocolNumber", "signal<string | null>(null)"),
            ("clinicName", "signal<string | null>(null)"),
            ("clinicLogoUrl", "signal<string | null>(null)"),
            ("patientDownloadToken", "signal<string | null>(null)"),
            ("patientDownloadUrl", "signal<string | null>(null)"),
            ("patientCopyEmailedHint", "signal(false)"),
            ("downloading", "signal(false)"),
            ("dark", "signal(false)"),
            ("emailSending", "signal(false)"),
            ("emailSentMessage", "signal<string | null>(null)"),
        ],
        "export class FormularioPublicoSucessoComponent",
    )

    migrate_component(
        "src/app/paginas/formulario-publico/formulario-publico-feegow.component.ts",
        "src/app/paginas/formulario-publico/formulario-publico-feegow.component.html",
        [
            ("feegowHorariosDisponiveis", "signal<string[]>([])"),
            ("feegowProfissionaisDisponiveis", "signal<{ value: string; label: string }[]>([])"),
            ("feegowHorasPorProfissional", "signal<Record<string, string[]>>({})"),
            ("feegowDisponibilidadeErro", "signal('')"),
            ("feegowBuscandoDisponibilidade", "signal(false)"),
        ],
        "export class FormularioPublicoFeegowComponent",
    )

    for rel in (
        "src/app/paginas/formulario-publico/formulario-publico-gate.component.ts",
        "src/app/paginas/formulario-publico/formulario-publico-otp.component.ts",
        "src/app/paginas/formulario-publico/formulario-publico-footer.component.ts",
        "src/app/paginas/formulario-publico/formulario-publico-consent.component.ts",
        "src/app/paginas/formulario-publico/formulario-publico-fields.component.ts",
        "src/app/paginas/formulario-publico/formulario-publico-header.component.ts",
        "src/app/paginas/formulario-publico/formulario-publico-preenchedora.component.ts",
        "src/app/paginas/plataforma/plataforma-placeholder/plataforma-placeholder.component.ts",
        "src/app/paginas/plataforma/plataforma-configuracoes/plataforma-integracoes-tab.component.ts",
    ):
        onpush_only(rel)


if __name__ == "__main__":
    main()
