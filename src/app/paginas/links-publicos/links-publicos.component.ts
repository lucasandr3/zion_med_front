import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LinksPublicosService, LinkPublico } from '../../core/services/links-publicos.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-pagina-links-publicos',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingOverlayComponent],
  templateUrl: './links-publicos.component.html',
  styleUrl: './links-publicos.component.css',
})
export class LinksPublicosComponent implements OnInit {
  templates: { id: number; name: string; category_label?: string; public_url: string; public_token?: string }[] = [];
  carregando = false;
  erro = '';
  private linksService = inject(LinksPublicosService);

  ngOnInit(): void {
    this.carregando = true;
    this.linksService.list().subscribe({
      next: (list) => {
        const base = typeof window !== 'undefined' ? window.location.origin : '';
        this.templates = list.map((t: LinkPublico) => ({
          id: t.id,
          name: t.template_name ?? t.name ?? '',
          category_label: (t as { category_label?: string }).category_label,
          public_url: (t as { public_url?: string }).public_url ?? (t.public_token ? `${base}/f/${t.public_token}` : ''),
          public_token: t.public_token,
        }));
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar os links.';
      },
    });
  }

  copiarLink(url: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {});
    }
  }
}
