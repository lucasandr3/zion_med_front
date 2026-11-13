import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProtocolosService, type Protocolo } from '../core/services/protocolos.service';
import { preparePainelHop } from '../core/utils/gestgo-experience.util';

type DocFilter = 'pending' | 'approved' | '';

@Component({
  selector: 'app-mobile-documentos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './mobile-documentos.component.html',
  styleUrls: ['./mobile-shared.css'],
})
export class MobileDocumentosComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly protocolos = inject(ProtocolosService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly items = signal<Protocolo[]>([]);
  readonly filter = signal<DocFilter>('pending');

  ngOnInit(): void {
    const status = (this.route.snapshot.queryParamMap.get('status') || 'pending') as DocFilter;
    if (status === 'pending' || status === 'approved' || status === '') {
      this.filter.set(status);
    }
    this.carregar();
  }

  setFilter(f: DocFilter): void {
    this.filter.set(f);
    this.carregar();
  }

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);
    const status = this.filter();
    this.protocolos
      .list({
        status: status || undefined,
        per_page: 40,
        page: 1,
      })
      .subscribe({
        next: (res) => {
          this.items.set(res.data || []);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Não foi possível carregar os documentos.');
          this.loading.set(false);
        },
      });
  }

  pacienteNome(p: Protocolo): string {
    return p.person?.name || p.submitter_name || 'Paciente';
  }

  iniciais(nome: string): string {
    const parts = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
  }

  statusLabel(s: string): string {
    if (s === 'approved') return 'Assinado';
    if (s === 'pending') return 'Pendente';
    return s || '—';
  }

  abrirDocumento(id: number): void {
    const hop = preparePainelHop(`/protocolos/${id}`, '/m/documentos');
    void this.router.navigate([hop.path], { queryParams: hop.queryParams });
  }
}
