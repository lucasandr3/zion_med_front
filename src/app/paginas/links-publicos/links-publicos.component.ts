import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LinksPublicosService, LinkPublico } from '../../core/services/links-publicos.service';
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
  private linksService = inject(LinksPublicosService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
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
      },
    });
  }

  copiarLink(url: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {});
    }
  }
}
