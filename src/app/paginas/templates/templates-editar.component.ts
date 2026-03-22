import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-templates-editar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent],
  templateUrl: './templates-editar.component.html',
  styleUrl: './templates-editar.component.css',
})
export class TemplatesEditarComponent implements OnInit {
  template: Template | null = null;
  name = '';
  description = '';
  is_active = true;
  public_enabled = false;
  public_require_person_link = false;
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  salvando = false;
  erro = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
      this.erro = 'ID inválido';
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.get(Number(id)));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (t) => {
        this.listaPronta = true;
        this.template = t;
        this.name = t.name ?? '';
        this.description = t.description ?? '';
        this.is_active = t.is_active ?? true;
        this.public_enabled = t.public_enabled ?? false;
        this.public_require_person_link = t.public_require_person_link ?? false;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Template não encontrado.';
      },
    });
  }

  salvar(): void {
    if (!this.template || !this.name.trim()) return;
    this.salvando = true;
    this.erro = '';
    this.templatesService
      .update(this.template.id, {
        name: this.name.trim(),
        description: this.description.trim() || undefined,
        is_active: this.is_active,
        public_enabled: this.public_enabled,
        public_require_person_link: this.public_enabled ? this.public_require_person_link : false,
      })
      .subscribe({
        next: () => {
          this.salvando = false;
          const label = this.name.trim();
          this.toast.success('Template salvo!', `${label} foi salvo com sucesso.`);
          this.router.navigate(['/templates']);
        },
        error: () => {
          this.salvando = false;
          this.erro = 'Não foi possível salvar.';
          this.toast.error('Erro ao salvar', 'Não foi possível salvar as alterações.');
        },
      });
  }
}
