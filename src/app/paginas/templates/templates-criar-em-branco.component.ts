import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesService } from '../../core/services/templates.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-templates-criar-em-branco',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './templates-criar-em-branco.component.html',
  styleUrl: './templates-criar-em-branco.component.css',
})
export class TemplatesCriarEmBrancoComponent {
  name = '';
  description = '';
  is_active = true;
  public_enabled = false;
  salvando = false;
  erro = '';

  private templatesService = inject(TemplatesService);
  private router = inject(Router);
  private toast = inject(ToastService);

  salvar(): void {
    if (!this.name.trim()) return;
    this.salvando = true;
    this.erro = '';
    this.templatesService
      .create({
        name: this.name.trim(),
        description: this.description.trim() || undefined,
        is_active: this.is_active,
        public_enabled: this.public_enabled,
      })
      .subscribe({
        next: (t) => {
          this.salvando = false;
          this.toast.success('Template criado!', `${this.name.trim()} foi criado.`);
          this.router.navigate(['/templates', t.id, 'campos']);
        },
        error: () => {
          this.salvando = false;
          this.erro = 'Não foi possível criar o template.';
          this.toast.error('Erro ao criar', this.erro);
        },
      });
  }
}
