import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioPublicoService, FormularioPublicoData, FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-formulario-publico-show',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingOverlayComponent],
  templateUrl: './formulario-publico-show.component.html',
  styleUrl: './formulario-publico-show.component.css',
})
export class FormularioPublicoShowComponent implements OnInit {
  token = '';
  data: FormularioPublicoData | null = null;
  valores: Record<string, string | number | boolean> = {};
  submitterName = '';
  submitterEmail = '';
  carregando = true;
  enviando = false;
  erro = '';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formularioService = inject(FormularioPublicoService);

  constructor() {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }

  ngOnInit(): void {
    if (!this.token) {
      this.carregando = false;
      this.erro = 'Link inválido.';
      return;
    }
    this.formularioService.getByToken(this.token).subscribe({
      next: (d) => {
        this.data = d;
        this.carregando = false;
        d.fields.forEach((f) => {
          if (f.type === 'checkbox') this.valores[f.name_key] = false;
          else this.valores[f.name_key] = '';
        });
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.message ?? 'Formulário não encontrado ou não disponível.';
      },
    });
  }

  enviar(): void {
    if (!this.data || this.enviando) return;
    this.enviando = true;
    this.erro = '';
    const payload: Record<string, unknown> = {
      _submitter_name: this.submitterName || undefined,
      _submitter_email: this.submitterEmail || undefined,
      ...this.valores,
    };
    this.formularioService.submit(this.token, payload).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/f/sucesso']);
      },
      error: (err) => {
        this.enviando = false;
        this.erro = err.error?.message ?? (err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : 'Não foi possível enviar. Tente novamente.');
      },
    });
  }

  trackByKey(_index: number, f: FormularioPublicoField): string {
    return f.name_key;
  }
}
