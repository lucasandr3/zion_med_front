import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ProtocolosService,
  type ProtocoloDetalheData,
} from '../core/services/protocolos.service';
import { preparePainelHop, setPreferPainelExperience } from '../core/utils/gestgo-experience.util';
import { MobileShellService } from './mobile-shell.service';

@Component({
  selector: 'app-mobile-documento-detalhe',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './mobile-documento-detalhe.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-documento-detalhe.component.css'],
})
export class MobileDocumentoDetalheComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly protocolos = inject(ProtocolosService);
  private readonly shell = inject(MobileShellService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly doc = signal<ProtocoloDetalheData | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id') || 0);
    if (id <= 0) {
      this.error.set('Documento inválido.');
      this.loading.set(false);
      return;
    }
    this.protocolos.get(id).subscribe({
      next: (d) => {
        this.doc.set(d);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível abrir este documento.');
        this.loading.set(false);
      },
    });
  }

  pacienteNome(d: ProtocoloDetalheData): string {
    return d.person?.name || d.submitter_name || 'Paciente';
  }

  statusLabel(s: string): string {
    if (s === 'approved') return 'Assinado';
    if (s === 'pending') return 'Pendente';
    if (s === 'rejected') return 'Recusado';
    return s || '—';
  }

  formatDate(iso?: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  reenviar(d: ProtocoloDetalheData): void {
    const q: Record<string, string> = {};
    if (d.template_id) q['template_id'] = String(d.template_id);
    if (d.person_id) q['person_id'] = String(d.person_id);
    void this.router.navigate(['/m/enviar'], { queryParams: q });
  }

  abrirNoPainel(id: number): void {
    setPreferPainelExperience(true);
    const hop = preparePainelHop(`/protocolos/${id}`, '/m/documentos');
    void this.router.navigate([hop.path], { queryParams: hop.queryParams });
  }

  async copiarProtocolo(d: ProtocoloDetalheData): Promise<void> {
    const text = d.protocol_number || String(d.id);
    try {
      await navigator.clipboard.writeText(text);
      this.shell.toast('Protocolo copiado');
    } catch {
      this.shell.toast('Não foi possível copiar');
    }
  }
}
