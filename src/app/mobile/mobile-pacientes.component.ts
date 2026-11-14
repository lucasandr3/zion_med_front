import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PessoasService, type Pessoa, type PessoaDetalhe } from '../core/services/pessoas.service';
import { preparePainelHop } from '../core/utils/gestgo-experience.util';
import { MobileShellService } from './mobile-shell.service';

@Component({
  selector: 'app-mobile-pacientes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './mobile-pacientes.component.html',
  styleUrls: ['./mobile-shared.css'],
})
export class MobilePacientesComponent implements OnInit {
  private readonly pessoas = inject(PessoasService);
  private readonly shell = inject(MobileShellService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly search$ = new Subject<string>();

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly items = signal<Pessoa[]>([]);
  readonly query = signal('');
  readonly detailId = signal<number | null>(null);
  readonly detail = signal<PessoaDetalhe | null>(null);
  readonly detailLoading = signal(false);

  ngOnInit(): void {
    this.search$
      .pipe(
        debounceTime(280),
        distinctUntilChanged(),
        switchMap((q) => {
          this.loading.set(true);
          this.error.set(null);
          return this.pessoas.list({ search: q || undefined, per_page: 30, page: 1 }).pipe(
            catchError(() => {
              this.error.set('Não foi possível carregar pacientes.');
              return of({
                data: [] as Pessoa[],
                meta: { current_page: 1, last_page: 1, per_page: 30, total: 0 },
              });
            }),
          );
        }),
      )
      .subscribe((res) => {
        this.items.set(res.data || []);
        this.loading.set(false);
      });

    this.search$.next('');

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 0) this.abrirDetalhe(id);
  }

  onQuery(value: string): void {
    this.query.set(value);
    this.search$.next(value.trim());
  }

  abrirNotificacoes(): void {
    this.shell.openNotifications();
  }

  abrirMenu(): void {
    this.shell.openMenu();
  }

  iniciais(nome: string): string {
    const parts = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
  }

  abrirDetalhe(id: number): void {
    this.detailId.set(id);
    this.detailLoading.set(true);
    this.pessoas.get(id).subscribe({
      next: (p) => {
        this.detail.set(p);
        this.detailLoading.set(false);
      },
      error: () => {
        this.detail.set(null);
        this.detailLoading.set(false);
        this.error.set('Paciente não encontrado.');
      },
    });
  }

  fecharDetalhe(): void {
    this.detailId.set(null);
    this.detail.set(null);
  }

  enviarFicha(personId: number): void {
    const hop = preparePainelHop(`/envios?person_id=${personId}`, '/m/pacientes');
    void this.router.navigate([hop.path], { queryParams: hop.queryParams });
  }

  abrirDocumentos(): void {
    void this.router.navigate(['/m/documentos'], { queryParams: { status: '' } });
  }
}
