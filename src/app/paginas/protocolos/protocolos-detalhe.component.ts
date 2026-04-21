import { Component, OnInit, inject, Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ProtocolosService,
  ProtocoloDetalheData,
  ProtocoloEvent,
  ProtocoloField,
} from '../../core/services/protocolos.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-protocolos-detalhe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonCardComponent],
  templateUrl: './protocolos-detalhe.component.html',
  styleUrl: './protocolos-detalhe.component.css',
})
export class ProtocolosDetalheComponent implements OnInit {
  protocolo: ProtocoloDetalheData | null = null;
  showSkeleton!: Signal<boolean>;
  erro = '';
  comentarioEnviando = false;
  revisaoEnviando = false;

  revisaoFormVisible = false;
  revisaoAprovado = true;
  comentarioRevisao = '';
  novoComentario = '';

  private route = inject(ActivatedRoute);
  private protocolosService = inject(ProtocolosService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private auth = inject(AuthService);

  get podeRevisarProtocolo(): boolean {
    return this.auth.hasPermission('submissions.approve');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.carregar(+id);
  }

  carregar(id: number): void {
    this.erro = '';
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.protocolosService.get(id));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (p) => {
        this.protocolo = p;
      },
      error: () => {
        this.erro = 'Não foi possível carregar o protocolo.';
      },
    });
  }

  get isPending(): boolean {
    const s = this.protocolo?.status?.toLowerCase();
    return s === 'pending' || s === 'pendente';
  }

  statusLabel(): string {
    const s = this.protocolo?.status;
    if (!s) return '';
    const map: Record<string, string> = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Reprovado',
    };
    return map[s.toLowerCase()] ?? s;
  }

  templateNome(): string {
    if (!this.protocolo) return '—';
    if (this.protocolo.template_name) return this.protocolo.template_name;
    return (this.protocolo.template as { name?: string } | undefined)?.name ?? '—';
  }

  dataFormatada(val: string | undefined): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  abrirRevisao(aprovado: boolean): void {
    if (!this.podeRevisarProtocolo) return;
    const jaMostrandoMesmaDecisao = this.revisaoFormVisible && this.revisaoAprovado === aprovado;
    if (jaMostrandoMesmaDecisao) {
      this.revisaoFormVisible = false;
      return;
    }
    this.revisaoAprovado = aprovado;
    this.revisaoFormVisible = true;
    setTimeout(() => {
      document.getElementById('revisao_form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  fecharRevisao(): void {
    this.revisaoFormVisible = false;
    this.comentarioRevisao = '';
  }

  toggleFormRevisao(): void {
    if (!this.podeRevisarProtocolo) return;
    this.revisaoFormVisible = !this.revisaoFormVisible;
  }

  baixarPdf(): void {
    if (!this.protocolo) return;
    this.protocolosService.pdf(this.protocolo.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `protocolo-${this.protocolo!.protocol_number || this.protocolo!.id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      },
    });
  }

  async enviarRevisao(): Promise<void> {
    if (!this.protocolo || !this.podeRevisarProtocolo) return;
    if (this.revisaoAprovado === false) {
      const ok = await this.confirm.request({
        title: 'Reprovar protocolo?',
        message: 'Tem certeza que deseja reprovar este protocolo? O submetente pode ser notificado.',
        confirmLabel: 'Sim, reprovar',
        variant: 'danger',
      });
      if (!ok) return;
    }
    this.revisaoEnviando = true;
    this.protocolosService.aprovar(this.protocolo.id, this.revisaoAprovado, this.comentarioRevisao || undefined).subscribe({
      next: () => {
        this.revisaoEnviando = false;
        this.revisaoFormVisible = false;
        this.comentarioRevisao = '';
        if (this.revisaoAprovado) {
          this.toast.success('Protocolo aprovado', 'A revisão foi registrada.');
        } else {
          this.toast.warning('Protocolo reprovado', 'A revisão foi registrada.');
        }
        this.carregar(this.protocolo!.id);
      },
      error: (err) => {
        this.revisaoEnviando = false;
        this.erro = this.mensagemErroApi(err, 'Não foi possível enviar a revisão.');
        this.toast.error('Erro', this.erro);
      },
    });
  }

  enviarComentario(): void {
    if (!this.protocolo || !this.novoComentario.trim()) return;
    this.comentarioEnviando = true;
    this.protocolosService.comentario(this.protocolo.id, this.novoComentario.trim()).subscribe({
      next: () => {
        this.comentarioEnviando = false;
        this.novoComentario = '';
        this.toast.success('Comentário adicionado', 'Seu comentário foi publicado.');
        this.carregar(this.protocolo!.id);
      },
      error: (err) => {
        this.comentarioEnviando = false;
        this.erro = this.mensagemErroApi(err, 'Não foi possível adicionar o comentário.');
        this.toast.error('Erro', this.erro);
      },
    });
  }

  eventosTimeline(): ProtocoloEvent[] {
    const p = this.protocolo;
    if (!p) return [];
    if (p.events?.length) return p.events;
    return [
      {
        type: 'created',
        type_label: 'Protocolo criado',
        body: undefined,
        user: undefined,
        created_at: p.created_at,
      },
    ];
  }

  camposTemplate(): ProtocoloField[] {
    const fields = this.protocolo?.template?.fields;
    if (!fields?.length) return [];
    return fields.filter((f) => f.type !== 'file' && f.type !== 'signature');
  }

  valorCampo(field: ProtocoloField): string {
    const p = this.protocolo;
    if (!p) return '—';
    const key = field.name_key;
    const val = p.values_keyed?.[key] ?? (p.form_data as Record<string, unknown>)?.[key];
    if (val == null) return '—';
    if (typeof val === 'object' && 'value_text' in val && val.value_text != null) return String(val.value_text);
    if (typeof val === 'object' && 'value_json' in val) {
      const j = (val as { value_json?: unknown }).value_json;
      if (Array.isArray(j)) return j.join(', ');
      if (j != null) return String(j);
    }
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join(', ');
    return String(val);
  }

  private mensagemErroApi(err: unknown, fallback: string): string {
    if (!(err instanceof HttpErrorResponse)) return fallback;
    const e = err.error as { message?: string; errors?: Record<string, string[]> } | null;
    if (e?.errors) {
      for (const msgs of Object.values(e.errors)) {
        if (msgs?.length) return msgs[0];
      }
    }
    if (typeof e?.message === 'string' && e.message.trim()) return e.message.trim();
    return fallback;
  }
}
