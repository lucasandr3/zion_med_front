import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ProtocolosService,
  ProtocoloDetalheData,
  ProtocoloEvent,
  ProtocoloField,
} from '../../core/services/protocolos.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-protocolos-detalhe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LoadingOverlayComponent],
  templateUrl: './protocolos-detalhe.component.html',
  styleUrl: './protocolos-detalhe.component.css',
})
export class ProtocolosDetalheComponent implements OnInit {
  protocolo: ProtocoloDetalheData | null = null;
  carregando = false;
  erro = '';
  acaoEmAndamento = false;
  mensagemSucesso = '';

  revisaoFormVisible = false;
  revisaoAprovado = true;
  comentarioRevisao = '';
  novoComentario = '';

  private route = inject(ActivatedRoute);
  private protocolosService = inject(ProtocolosService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.carregar(+id);
  }

  carregar(id: number): void {
    this.carregando = true;
    this.erro = '';
    this.protocolosService.get(id).subscribe({
      next: (p) => {
        this.protocolo = p;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
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

  toggleFormRevisao(): void {
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

  enviarRevisao(): void {
    if (!this.protocolo) return;
    if (this.revisaoAprovado === false && !confirm('Tem certeza que deseja reprovar este protocolo? O submetente pode ser notificado.')) {
      return;
    }
    this.acaoEmAndamento = true;
    this.protocolosService.aprovar(this.protocolo.id, this.revisaoAprovado, this.comentarioRevisao || undefined).subscribe({
      next: () => {
        this.acaoEmAndamento = false;
        this.revisaoFormVisible = false;
        this.comentarioRevisao = '';
        this.mensagemSucesso = this.revisaoAprovado ? 'Protocolo aprovado.' : 'Protocolo reprovado.';
        this.carregar(this.protocolo!.id);
      },
      error: () => {
        this.acaoEmAndamento = false;
        this.erro = 'Não foi possível enviar a revisão.';
      },
    });
  }

  enviarComentario(): void {
    if (!this.protocolo || !this.novoComentario.trim()) return;
    this.acaoEmAndamento = true;
    this.protocolosService.comentario(this.protocolo.id, this.novoComentario.trim()).subscribe({
      next: () => {
        this.acaoEmAndamento = false;
        this.novoComentario = '';
        this.mensagemSucesso = 'Comentário adicionado.';
        this.carregar(this.protocolo!.id);
      },
      error: () => {
        this.acaoEmAndamento = false;
        this.erro = 'Não foi possível adicionar o comentário.';
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
}
