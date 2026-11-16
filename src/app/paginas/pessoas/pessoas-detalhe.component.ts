import { Component, OnInit, inject, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { PessoasService, PessoaDetalhe, PessoaHistoricoItem } from '../../core/services/pessoas.service';
import { ZmSkeletonPessoaDetalheComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { AuthService } from '../../core/services/auth.service';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { formatarDataBr, formatarDataHoraBr } from '@/shared/utils/date';
import { digitsOnlyCpf, formatCpfDisplay } from '../../core/utils/cpf';
import { toolPersonQueryParams } from '../../mobile/tools/tool-person-context';
import type { Protocolo } from '../../core/services/protocolos.service';

type AbaFicha = 'dados' | 'estatisticas' | 'protocolos' | 'historico';
type FiltroProtocolo = 'all' | 'pending' | 'approved' | 'rejected' | 'revoked';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-pessoas-detalhe',
  standalone: true,
  host: { class: 'n-page n-page--flush' },
  imports: [
    ...NORD_FORM_IMPORTS,
    CommonModule,
    RouterLink,
    ZmSkeletonPessoaDetalheComponent,
    GestgoCardComponent,
    ZmPageBackLinkComponent,
  ],
  templateUrl: './pessoas-detalhe.component.html',
  styleUrls: ['./pessoas-detalhe.component.css'],
})
export class PessoasDetalheComponent implements OnInit {
  pessoa: PessoaDetalhe | null = null;
  readonly carregando = signal(true);
  erro = '';
  inativando = false;
  solicitandoReconsentimento = false;
  abaAtiva: AbaFicha = 'dados';
  filtroProtocolos: FiltroProtocolo = 'all';
  cpfRevelado = false;
  historico: PessoaHistoricoItem[] = [];
  historicoCarregando = false;
  historicoErro = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pessoasService = inject(PessoasService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private auth = inject(AuthService);

  get podeInativar(): boolean {
    return this.auth.hasPermission('people.deactivate');
  }

  get podeSolicitarReconsentimento(): boolean {
    return this.pessoa?.consent_summary?.status?.toLowerCase() === 'expired';
  }

  temConsentimentoValido(): boolean {
    const s = this.pessoa?.consent_summary?.status?.toLowerCase();
    return s === 'valid';
  }

  /** Timeline no formato da referência: protocolos + cadastro. */
  linhaDoTempo(): Array<{ id: string; title: string; sub: string; at: string; icon: string; route?: string }> {
    const p = this.pessoa;
    if (!p) return [];
    const events: Array<{ id: string; title: string; sub: string; at: string; icon: string; route?: string; sort: number }> = [];

    if (this.historico.length > 0) {
      for (const item of this.historico) {
        const at = item.occurred_at || '';
        const title = item.kind === 'protocol' ? 'Protocolo criado' : item.kind === 'document_send' ? 'Envio de documento' : item.title;
        const subParts = [
          item.protocol_number,
          item.title && item.kind === 'protocol' ? item.title : null,
          item.channel,
        ].filter(Boolean);
        events.push({
          id: `${item.kind}-${item.id}`,
          title,
          sub: subParts.join(' · ') || this.labelHistoricoKind(item.kind),
          at,
          icon: item.kind === 'protocol' ? 'description' : item.kind === 'document_send' ? 'send' : 'person',
          route: item.route_hint || undefined,
          sort: new Date(at).getTime() || 0,
        });
      }
    } else {
      for (const pr of p.recent_protocols ?? []) {
        const at = pr.submitted_at || pr.created_at || '';
        events.push({
          id: `proto-${pr.id}`,
          title: 'Protocolo criado',
          sub: [pr.protocol_number || pr.id, pr.template_name].filter(Boolean).join(' · '),
          at,
          icon: 'description',
          route: `/protocolos/${pr.id}`,
          sort: new Date(at).getTime() || 0,
        });
      }
    }

    if (p.created_at) {
      events.push({
        id: 'cadastro',
        title: 'Pessoa cadastrada',
        sub: `Código ${p.code}`,
        at: p.created_at,
        icon: 'person',
        sort: new Date(p.created_at).getTime() || 0,
      });
    }

    return events
      .sort((a, b) => b.sort - a.sort)
      .map(({ sort: _s, ...rest }) => rest);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || Number.isNaN(Number(id))) {
      this.carregando.set(false);
      this.erro = 'ID inválido';
      return;
    }

    this.carregando.set(true);
    this.erro = '';
    this.pessoa = null;

    this.pessoasService
      .get(Number(id))
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe({
        next: (p) => {
          if (!p?.id) {
            this.pessoa = null;
            this.erro = 'Pessoa não encontrada.';
            return;
          }
          this.pessoa = p;
          this.erro = '';
        },
        error: () => {
          this.pessoa = null;
          this.erro = 'Pessoa não encontrada.';
        },
      });
  }

  setAbaAtiva(aba: AbaFicha): void {
    this.abaAtiva = aba;
    if (aba === 'historico' && this.pessoa && !this.historico.length && !this.historicoCarregando) {
      this.carregarHistorico();
    }
  }

  filtrarProtocolos(filtro: FiltroProtocolo): void {
    this.filtroProtocolos = filtro;
    this.abaAtiva = 'protocolos';
  }

  limparFiltroProtocolos(): void {
    this.filtroProtocolos = 'all';
  }

  protocolosFiltrados(): Protocolo[] {
    const list = this.pessoa?.recent_protocols ?? [];
    if (this.filtroProtocolos === 'all') return list;
    return list.filter((p) => (p.status || '').toLowerCase() === this.filtroProtocolos);
  }

  totalProtocolos(): number {
    return this.pessoa?.stats?.protocols_count ?? this.pessoa?.recent_protocols?.length ?? 0;
  }

  ultimoProtocoloLabel(): string {
    const raw = this.pessoa?.last_protocol_at
      ?? this.pessoa?.recent_protocols?.[0]?.submitted_at
      ?? this.pessoa?.recent_protocols?.[0]?.created_at;
    if (!raw) return '—';
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return '—';
    const hoje = new Date();
    const a = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const b = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diff = Math.round((a.getTime() - b.getTime()) / 864e5);
    if (diff === 0) return 'Hoje';
    if (diff === 1) return 'Ontem';
    return formatarDataBr(d) || '—';
  }

  iniciais(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  }

  copiar(texto: string): void {
    void navigator.clipboard?.writeText(texto);
  }

  telefoneHref(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  utilitarioQueryParams(): Record<string, string> {
    if (!this.pessoa) return {};
    return toolPersonQueryParams(this.pessoa);
  }

  cpfVisivel(): string {
    const raw = this.pessoa?.cpf ?? '';
    const d = digitsOnlyCpf(raw);
    if (!d) return raw || '—';
    if (this.cpfRevelado) return formatCpfDisplay(d);
    if (d.length >= 11) return `***.${d.slice(3, 6)}.***-**`;
    return raw;
  }

  alternarCpf(): void {
    this.cpfRevelado = !this.cpfRevelado;
  }

  idadeAnos(): number | null {
    const birth = this.pessoa?.birth_date;
    if (!birth) return this.pessoa?.age ?? null;
    const b = new Date(birth);
    if (Number.isNaN(b.getTime())) return this.pessoa?.age ?? null;
    const now = new Date();
    let age = now.getFullYear() - b.getFullYear();
    if (now < new Date(now.getFullYear(), b.getMonth(), b.getDate())) age--;
    return age;
  }

  mesmaDataCadastro(): boolean {
    if (!this.pessoa?.created_at || !this.pessoa?.updated_at) return false;
    const a = new Date(this.pessoa.created_at).getTime();
    const b = new Date(this.pessoa.updated_at).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return false;
    return Math.abs(a - b) < 60_000;
  }

  consentBadgeVariant(): 'success' | 'warning' | 'danger' | 'neutral' {
    const s = this.pessoa?.consent_summary?.status?.toLowerCase();
    if (s === 'valid') return 'success';
    if (s === 'pending' || s === 'expired') return 'warning';
    if (s === 'revoked') return 'danger';
    return 'neutral';
  }

  distribuicao(): Array<{ key: string; label: string; count: number; pct: number; color: string }> {
    const stats = this.pessoa?.stats;
    if (!stats) return [];
    const total = stats.protocols_count || 0;
    const parts = [
      { key: 'pending', label: 'Pendente', count: stats.pending_protocols || 0, color: '#e8a300' },
      { key: 'approved', label: 'Aprovado', count: stats.approved_protocols || 0, color: '#12b886' },
      { key: 'rejected', label: 'Reprovado', count: stats.rejected_protocols || 0, color: '#d64545' },
      { key: 'revoked', label: 'Revogado', count: stats.revoked_protocols || 0, color: '#8a9494' },
    ];
    return parts
      .filter((p) => p.count > 0)
      .map((p) => ({ ...p, pct: total > 0 ? (p.count / total) * 100 : 0 }));
  }

  dataFormatada(val: string | undefined | null): string {
    return formatarDataHoraBr(val) || '—';
  }

  formatarDataCurta(val: string | undefined | null): string {
    return formatarDataBr(val) || '—';
  }

  dataCurta(val: string | undefined | null): string {
    return formatarDataBr(val) || '—';
  }

  horaCurta(val: string | undefined | null): string {
    if (!val) return '';
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  statusProtocolo(s: string): string {
    const map: Record<string, string> = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Reprovado',
      revoked: 'Revogado',
    };
    return map[s?.toLowerCase()] ?? s;
  }

  badgeProtocoloVariant(status: string): 'warning' | 'success' | 'danger' | 'neutral' {
    const s = status?.toLowerCase();
    if (s === 'pending') return 'warning';
    if (s === 'approved') return 'success';
    if (s === 'revoked') return 'neutral';
    return 'danger';
  }

  carregarHistorico(): void {
    if (!this.pessoa) return;
    this.historicoCarregando = true;
    this.historicoErro = '';
    this.pessoasService.historicoDocumental(this.pessoa.id).subscribe({
      next: (items) => {
        this.historico = items;
        this.historicoCarregando = false;
      },
      error: () => {
        this.historicoCarregando = false;
        this.historicoErro = 'Não foi possível carregar o histórico documental.';
      },
    });
  }

  labelHistoricoKind(kind: string): string {
    if (kind === 'protocol') return 'Protocolo';
    if (kind === 'document_send') return 'Envio';
    return kind;
  }

  async inativar(): Promise<void> {
    if (!this.pessoa || !this.podeInativar) return;
    const ok = await this.confirm.request({
      title: 'Inativar pessoa?',
      message: 'A ficha ficará inativa. Formulários públicos com código não aceitarão mais esta pessoa até reativar.',
      confirmLabel: 'Sim, inativar',
      variant: 'danger',
    });
    if (!ok) return;
    this.inativando = true;
    this.pessoasService.destroy(this.pessoa.id).subscribe({
      next: () => {
        this.inativando = false;
        this.toast.success('Pessoa inativada', '');
        this.router.navigate(['/pessoas']);
      },
      error: (err) => {
        this.inativando = false;
        this.toast.error('Erro', err.error?.message ?? 'Não foi possível inativar.');
      },
    });
  }

  async solicitarReconsentimento(): Promise<void> {
    if (!this.pessoa || !this.podeSolicitarReconsentimento) return;
    const ok = await this.confirm.request({
      title: 'Solicitar reconsentimento?',
      message: 'Será enviado um novo link do termo de consentimento ao paciente (e-mail ou WhatsApp da ficha).',
      confirmLabel: 'Enviar link',
    });
    if (!ok) return;
    this.solicitandoReconsentimento = true;
    this.pessoasService.solicitarReconsentimento(this.pessoa.id).subscribe({
      next: (res) => {
        this.solicitandoReconsentimento = false;
        this.toast.success('Reconsentimento enviado', res.message);
      },
      error: (err) => {
        this.solicitandoReconsentimento = false;
        this.toast.error('Erro', err.error?.message ?? 'Não foi possível solicitar reconsentimento.');
      },
    });
  }
}
