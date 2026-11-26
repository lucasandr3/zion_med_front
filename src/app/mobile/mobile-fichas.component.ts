import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplatesService, type Template } from '../core/services/templates.service';
import { setPreferPainelExperience } from '../core/utils/gestgo-experience.util';
import { MobileShellService } from './mobile-shell.service';

@Component({
  selector: 'app-mobile-fichas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './mobile-fichas.component.html',
  styleUrls: ['./mobile-shared.css'],
})
export class MobileFichasComponent implements OnInit {
  private readonly templates = inject(TemplatesService);
  private readonly shell = inject(MobileShellService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly items = signal<Template[]>([]);
  readonly query = signal('');

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const list = this.items();
    if (!q) return list;
    return list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q) ||
        (t.document_kind || '').toLowerCase().includes(q),
    );
  });

  ngOnInit(): void {
    this.templates.list({ is_active: true }).subscribe({
      next: (list) => {
        // Só modelos ativos (API + filtro local).
        this.items.set((list || []).filter((t) => !!t.is_active));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os modelos.');
        this.loading.set(false);
      },
    });
  }

  abrirNotificacoes(): void {
    this.shell.openNotifications();
  }

  abrirMenu(): void {
    this.shell.openMenu();
  }

  enviar(templateId: number): void {
    void this.router.navigate(['/m/enviar'], { queryParams: { template_id: templateId } });
  }

  abrirPainelModelos(): void {
    setPreferPainelExperience(true);
    void this.router.navigateByUrl('/templates');
  }
}
