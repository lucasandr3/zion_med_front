import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  MobileToolsService,
  type MobileMessageTemplate,
} from '../../core/services/mobile-tools.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-mobile-tool-mensagens',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './mobile-tool-mensagens.component.html',
  styleUrls: ['../mobile-shared.css'],
})
export class MobileToolMensagensComponent implements OnInit {
  private readonly tools = inject(MobileToolsService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly templates = signal<MobileMessageTemplate[]>([]);
  readonly selectedId = signal<number | null>(null);
  readonly nome = signal('');
  readonly procedimento = signal('');
  readonly draft = signal('');

  readonly selected = computed(() => {
    const id = this.selectedId();
    return this.templates().find((t) => t.id === id) || null;
  });

  readonly preview = computed(() =>
    this.draft()
      .replaceAll('{nome}', this.nome().trim() || 'cliente')
      .replaceAll('{procedimento}', this.procedimento().trim() || 'seu atendimento'),
  );

  ngOnInit(): void {
    this.tools.messages().subscribe({
      next: (list) => {
        this.templates.set(list || []);
        const first = list[0];
        if (first) {
          this.selectedId.set(first.id);
          this.draft.set(first.body);
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Mensagens', 'Não foi possível carregar os modelos.');
      },
    });
  }

  onSelect(id: number): void {
    this.selectedId.set(id);
    const t = this.templates().find((x) => x.id === id);
    if (t) this.draft.set(t.body);
  }

  salvar(): void {
    const id = this.selectedId();
    if (!id) return;
    this.saving.set(true);
    this.tools.updateMessage(id, this.draft()).subscribe({
      next: (updated) => {
        this.templates.update((list) => list.map((t) => (t.id === updated.id ? updated : t)));
        this.saving.set(false);
        this.toast.success('Mensagens', 'Modelo salvo.');
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error('Mensagens', err?.error?.message || 'Falha ao salvar.');
      },
    });
  }

  async copiar(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.preview());
      this.toast.success('Mensagens', 'Texto copiado.');
    } catch {
      this.toast.error('Mensagens', 'Não foi possível copiar.');
    }
  }

  whatsapp(): void {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(this.preview())}`,
      '_blank',
      'noopener,noreferrer',
    );
  }
}
