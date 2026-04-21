import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LinksPublicosService, LinkPublico } from '../../core/services/links-publicos.service';
import { ToastService } from '../../core/services/toast.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';

@Component({
  selector: 'app-pagina-links-publicos',
  standalone: true,
  imports: [CommonModule, RouterLink, ZmSkeletonListComponent],
  templateUrl: './links-publicos.component.html',
  styleUrl: './links-publicos.component.css',
})
export class LinksPublicosComponent implements OnInit {
  templates: { id: number; name: string; category_label?: string; public_url: string; public_token?: string }[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  copiedTemplateId: number | null = null;
  private linksService = inject(LinksPublicosService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.erro = '';
    this.listaPronta = false;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.linksService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        const base = typeof window !== 'undefined' ? window.location.origin : '';
        this.templates = list.map((t: LinkPublico) => ({
          id: t.id,
          name: t.template_name ?? t.name ?? '',
          category_label: (t as { category_label?: string }).category_label,
          public_url: (t as { public_url?: string }).public_url ?? (t.public_token ? `${base}/f/${t.public_token}` : ''),
          public_token: t.public_token,
        }));
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar os links.';
        this.toast.error('Erro ao carregar', this.erro);
      },
    });
  }

  copiarLink(templateId: number, url: string): void {
    if (!url) {
      this.toast.warning('Link indisponível', 'Este template ainda não possui URL pública.');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          this.copiedTemplateId = templateId;
          this.toast.success('Link copiado', 'Você já pode colar e enviar para o cliente.');
          setTimeout(() => {
            if (this.copiedTemplateId === templateId) {
              this.copiedTemplateId = null;
            }
          }, 2000);
        })
        .catch(() => {
          this.toast.error('Não foi possível copiar', 'Tente novamente ou use a opção abrir.');
        });
      return;
    }
    this.toast.error('Navegador incompatível', 'Seu navegador não permite copiar automaticamente.');
  }

}
