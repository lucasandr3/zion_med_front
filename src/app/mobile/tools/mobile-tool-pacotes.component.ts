import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MobileToolsService, type MobilePackage } from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-mobile-tool-pacotes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './mobile-tool-pacotes.component.html',
  styleUrls: ['../mobile-shared.css'],
})
export class MobileToolPacotesComponent implements OnInit {
  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly items = signal<MobilePackage[]>([]);
  clientName = '';
  label = '';
  total = 5;

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.tools.packages().subscribe({
      next: (list) => {
        this.items.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Pacotes', 'Não foi possível carregar.');
      },
    });
  }

  criar(): void {
    if (!this.clientName.trim() || !this.label.trim()) {
      this.toast.error('Pacotes', 'Informe cliente e serviço.');
      return;
    }
    this.tools
      .createPackage({
        client_name: this.clientName.trim(),
        label: this.label.trim(),
        total_sessions: Math.max(1, Math.floor(Number(this.total) || 1)),
      })
      .subscribe({
        next: (row) => {
          this.items.update((list) => [row, ...list]);
          this.clientName = '';
          this.label = '';
          this.toast.success('Pacotes', 'Pacote criado.');
        },
        error: (err) => this.toast.error('Pacotes', err?.error?.message || 'Falha ao criar.'),
      });
  }

  registrar(id: number): void {
    this.tools.registerSession(id).subscribe({
      next: (row) => {
        this.items.update((list) => list.map((p) => (p.id === row.id ? row : p)));
        this.toast.success('Pacotes', 'Sessão registrada.');
      },
      error: (err) => this.toast.error('Pacotes', err?.error?.message || 'Falha.'),
    });
  }

  pct(p: MobilePackage): number {
    if (!p.total_sessions) return 0;
    return Math.min(100, Math.round((100 * p.done_sessions) / p.total_sessions));
  }
}
