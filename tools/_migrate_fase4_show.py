# -*- coding: utf-8 -*-
"""Safe migration: formulario-publico-show -> signals + OnPush."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TS_PATH = ROOT / "src/app/paginas/formulario-publico/formulario-publico-show.component.ts"
HTML_PATH = ROOT / "src/app/paginas/formulario-publico/formulario-publico-show.component.html"

CONVERT: list[tuple[str, str]] = [
    ("data", "signal<FormularioPublicoData | null>(null)"),
    ("submitterName", "signal('')"),
    ("submitterEmail", "signal('')"),
    ("personGateOk", "signal(false)"),
    ("personCpfDigits", "signal('')"),
    ("personCpfDisplay", "signal('')"),
    ("personCode", "signal('')"),
    ("personBirthDate", "signal('')"),
    ("personGateErro", "signal('')"),
    ("validandoPerson", "signal(false)"),
    ("personValidatedName", "signal<string | null>(null)"),
    ("personValidatedId", "signal<number | null>(null)"),
    ("personPendingConfirmName", "signal<string | null>(null)"),
    ("personNameConfirmed", "signal(false)"),
    ("procedureSchedulingAllowed", "signal(true)"),
    ("consentSummaryLabel", "signal('')"),
    ("kioskMode", "signal(false)"),
    ("acceptTerms", "signal(false)"),
    ("comprehensionAck", "signal(false)"),
    ("noticeScrollState", "signal<Record<string, boolean>>({})"),
    ("termScrollCompleted", "signal(true)"),
    ("guardianName", "signal('')"),
    ("guardianRelation", "signal('')"),
    ("witnessName", "signal('')"),
    ("professionalExplained", "signal(false)"),
    ("professionalSignerName", "signal('')"),
    ("assistedMode", "signal(false)"),
    ("quizAnswers", "signal<Record<string, number | null>>({})"),
    ("otpChannel", "signal<'email' | 'whatsapp'>('email')"),
    ("otpPhone", "signal('')"),
    ("otpCode", "signal('')"),
    ("otpVerified", "signal(false)"),
    ("otpSending", "signal(false)"),
    ("otpVerifying", "signal(false)"),
    ("otpErro", "signal('')"),
    ("enviando", "signal(false)"),
    ("erro", "signal('')"),
    ("dark", "signal(false)"),
    ("currentStepIndex", "signal(0)"),
    ("largeTextMode", "signal(false)"),
    ("invalidFieldKeys", "signal(new Set<string>())"),
]


def assert_sane(ts: str, label: str) -> None:
    if "from '../../core/utils/clinical-step.util';" not in ts:
        raise SystemExit(f"CORRUPT after {label}: clinical-step import missing")
    if "export class FormularioPublicoShowComponent" not in ts:
        raise SystemExit(f"CORRUPT after {label}: class missing")
    if "formularioPublicoService" not in ts and "FormularioPublicoService" not in ts:
        raise SystemExit(f"CORRUPT after {label}: service missing")


def ensure_imports(ts: str) -> str:
    m = re.search(r"import \{([^}]+)\} from '@angular/core';", ts)
    if not m:
        raise SystemExit("no core import")
    parts = [p.strip() for p in m.group(1).split(",") if p.strip()]
    parts = [p for p in parts if p != "ChangeDetectorRef"]
    for e in ("ChangeDetectionStrategy", "signal", "Signal"):
        if e not in parts:
            parts.append(e)
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


def convert_decls(ts: str) -> str:
    for name, expr in CONVERT:
        pat = rf"^([ \t]+)(?:private )?{re.escape(name)}(?:\s*:\s*[^=;\n]+)?\s*=\s*[^;]+;"
        new, n = re.subn(pat, rf"\1readonly {name} = {expr};", ts, count=1, flags=re.M)
        if not n:
            print("WARN missing decl", name, file=sys.stderr)
        else:
            ts = new

    new, n = re.subn(
        r"^([ \t]+)private termScrolledAt: string \| null = null;",
        r"\1private readonly termScrolledAt = signal<string | null>(null);",
        ts,
        count=1,
        flags=re.M,
    )
    if not n:
        print("WARN missing termScrolledAt", file=sys.stderr)
    else:
        ts = new

    if "valoresRevision" not in ts:
        ts = re.sub(
            r"(valores(?::\s*[^=]+)?\s*=\s*\{\};)",
            r"\1\n  /** Invalidates progress getters when `valores` mutates in-place. */\n  readonly valoresRevision = signal(0);",
            ts,
            count=1,
        )
    return ts


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
    body = re.sub(
        r"this\.currentStepIndex\+\+",
        "this.currentStepIndex.update((n) => n + 1)",
        body,
    )
    body = re.sub(
        r"this\.currentStepIndex--",
        "this.currentStepIndex.update((n) => n - 1)",
        body,
    )
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


def patch_methods(ts: str) -> str:
    ts = ts.replace(
        """  onCampoAlterado(): void {
    this.recomputeTermScrollCompleted();
    this.cdr.markForCheck();
  }""",
        """  onCampoAlterado(): void {
    this.valoresRevision.update((n) => n + 1);
    this.recomputeTermScrollCompleted();
  }""",
    )
    ts = re.sub(r"\n\s*this\.cdr\.markForCheck\(\);", "", ts)
    ts = re.sub(r"\n\s*private cdr = inject\(ChangeDetectorRef\);", "", ts)
    for gname in ("progressPercent", "progressCountLabel"):
        ts = re.sub(
            rf"(get {gname}\(\)[^{{]*\{{\n)",
            rf"\1    this.valoresRevision();\n",
            ts,
            count=1,
        )
    return ts


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


def alias_html_data(html: str) -> str:
    html = html.replace(
        "@if (!showSkeleton() && data() && !kioskMode()) {",
        "@if (!showSkeleton() && !kioskMode() && data(); as formData) {",
        1,
    )
    html = html.replace('[data]="data()"', '[data]="formData"', 1)
    html = html.replace(
        "@if (!showSkeleton() && data()) {",
        "@if (!showSkeleton() && data(); as formData) {",
        1,
    )
    html = html.replace("data().template", "formData.template")
    html = html.replace("data().person_link", "formData.person_link")
    html = html.replace("data().otp_whatsapp_available", "formData.otp_whatsapp_available")
    return html


def fix_data_locals(ts: str) -> str:
    def rewrite(src: str, needle: str) -> str:
        idx = src.find(needle)
        if idx < 0:
            return src
        brace = src.find("{", idx)
        if brace < 0:
            return src
        depth = 0
        end = None
        for i in range(brace, len(src)):
            if src[i] == "{":
                depth += 1
            elif src[i] == "}":
                depth -= 1
                if depth == 0:
                    end = i
                    break
        if end is None:
            return src
        body = src[brace : end + 1]
        if "const data = this.data();" in body:
            return src
        if not re.search(r"if\s*\(\s*!this\.data\(\)", body):
            return src
        new_body = re.sub(
            r"if\s*\(\s*!this\.data\(\)\s*(\|\|[^)]*)?\)\s*return([^;]*);",
            r"const data = this.data();\n    if (!data\1) return\2;",
            body,
            count=1,
        )
        head, _, rest = new_body.partition("const data = this.data();")
        rest = rest.replace("this.data()!", "data")
        rest = re.sub(r"this\.data\(\)\?", "data?", rest)
        rest = re.sub(r"this\.data\(\)\.", "data.", rest)
        rest = re.sub(r"(?<![\w.])this\.data\(\)(?!\s*\.set)", "data", rest)
        new_body = head + "const data = this.data();" + rest
        return src[:brace] + new_body + src[end + 1 :]

    for n in (
        "enviar(): void {",
        "showAssistedCosignBlock(): boolean {",
        "professionalCosignFieldKey(): string {",
        "showActorsBlock(): boolean {",
        "requireGuardianBlock(): boolean {",
        "private applyPersonPrefill(",
        "private validarCamposObrigatorios(",
    ):
        ts = rewrite(ts, n)

    ts = re.sub(
        r"(private get visibleFormFields\(\)[^{]*\{\n)"
        r"(\s*)if \(!this\.data\(\)\?\.fields\?\.length\) return \[\];\n"
        r"\2return (\w+)\(this\.data\(\)\.fields, this\.valores\);\n",
        r"\1\2const data = this.data();\n"
        r"\2if (!data?.fields?.length) return [];\n"
        r"\2return \3(data.fields, this.valores);\n",
        ts,
        count=1,
    )
    ts = re.sub(
        r"if \(this\.data\(\)\) \{\n(\s*)(\w+)\(this\.data\(\)\.fields, this\.valores\);",
        r"const data = this.data();\n    if (data) {\n\1\2(data.fields, this.valores);",
        ts,
        count=1,
    )
    return ts


def main() -> None:
    ts = TS_PATH.read_text(encoding="utf-8")
    html = HTML_PATH.read_text(encoding="utf-8")
    assert_sane(ts, "start")

    names = [n for n, _ in CONVERT] + ["termScrolledAt", "logoImageFailed"]

    ts = ensure_imports(ts)
    assert_sane(ts, "imports")
    ts = ensure_onpush(ts)
    assert_sane(ts, "onpush")
    ts = convert_decls(ts)
    assert_sane(ts, "decls")

    idx = ts.index("export class FormularioPublicoShowComponent")
    head, body = ts[:idx], ts[idx:]
    body = wire_class_body(body, names)
    ts = head + body
    assert_sane(ts, "wire")

    ts = patch_methods(ts)
    assert_sane(ts, "methods")
    ts = fix_data_locals(ts)
    assert_sane(ts, "data-locals")

    ts = ts.replace(
        "onNoticeScrolled(event: { key: string); scrolled: boolean }): void {",
        "onNoticeScrolled(event: { key: string; scrolled: boolean }): void {",
    )
    ts = re.sub(r"(\w+):\s*(string|number|boolean)\)\s*;", r"\1: \2;", ts)

    html_names = [n for n, _ in CONVERT] + ["logoImageFailed", "showSkeleton"]
    html = patch_html(html, html_names)
    html = html.replace("showSkeleton()()", "showSkeleton()")
    html = html.replace("logoImageFailed()()", "logoImageFailed()")
    html = alias_html_data(html)

    TS_PATH.write_text(ts, encoding="utf-8")
    HTML_PATH.write_text(html, encoding="utf-8")
    print("lines", len(ts.splitlines()))
    print("markForCheck", ts.count("markForCheck"))
    print("ChangeDetectorRef", "ChangeDetectorRef" in ts)
    print("OnPush", "OnPush" in ts)
    print("valoresRevision", "valoresRevision" in ts)
    print("broken ++", "currentStepIndex()++" in ts)
    print("type corrupt", len(re.findall(r":\s*\w+\)\s*;", ts)))


if __name__ == "__main__":
    main()
