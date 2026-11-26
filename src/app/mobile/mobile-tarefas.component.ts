import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AutomationsService,
  type OrgOperationalTaskRow,
} from '../core/services/automations.service';
import { MobileShellService } from './mobile-shell.service';

type FiltroTarefa = 'open' | 'done' | 'all';

@Component({
  selector: 'app-mobile-tarefas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './mobile-tarefas.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-tarefas.component.css'],
})
export class MobileTarefasComponent implements OnInit {
  private readonly automations = inject(AutomationsService);
  private readonly shell = inject(MobileShellService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly acting = signal(false);
  readonly items = signal<OrgOperationalTaskRow[]>([]);
  readonly openCount = signal(0);
  readonly doneCount = signal(0);
  readonly filtro = signal<FiltroTarefa>('open');
  readonly novaTitulo = signal('');

  ngOnInit(): void {
    this.carregar();
  }

  setFiltro(f: FiltroTarefa): void {
    this.filtro.set(f);
    this.carregar();
  }

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);
    const status = this.filtro() === 'all' ? undefined : this.filtro();
    this.automations.getTasks(status).subscribe({
      next: (res) => {
        this.items.set(res.data?.items ?? []);
        this.openCount.set(res.data?.open ?? 0);
        this.doneCount.set(res.data?.done ?? 0);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar as tarefas.');
        this.loading.set(false);
      },
    });
  }

  criar(): void {
    const title = this.novaTitulo().trim();
    if (!title) {
      this.shell.toast('Informe um título');
      return;
    }
    this.acting.set(true);
    this.automations.createTask({ title, priority: 'normal' }).subscribe({
      next: () => {
        this.acting.set(false);
        this.novaTitulo.set('');
        this.shell.toast('Tarefa criada');
        this.filtro.set('open');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.shell.toast('Não foi possível criar');
      },
    });
  }

  concluir(item: OrgOperationalTaskRow): void {
    if (!window.confirm(`Marcar "${item.title}" como concluída?`)) return;
    this.acting.set(true);
    this.automations.completeTask(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.shell.toast('Tarefa concluída');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.shell.toast('Não foi possível concluir');
      },
    });
  }

  reabrir(item: OrgOperationalTaskRow): void {
    this.acting.set(true);
    this.automations.reopenTask(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.shell.toast('Tarefa reaberta');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.shell.toast('Não foi possível reabrir');
      },
    });
  }

  formatDate(iso?: string | null): string {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  isOpen(item: OrgOperationalTaskRow): boolean {
    return (item.status || '').toLowerCase() !== 'done' && !(item.completed_at);
  }
}
