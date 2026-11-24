import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KnowledgeArticle, KnowledgeService } from '../../core/services/knowledge.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-ajuda',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink],
  templateUrl: './ajuda.component.html',
  styleUrl: './ajuda.component.css',
})
export class AjudaComponent implements OnInit {
  readonly items = signal<KnowledgeArticle[]>([]);
  readonly selected = signal<KnowledgeArticle | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly query = signal('');

  private readonly search$ = new Subject<string>();
  private knowledge = inject(KnowledgeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.search$.pipe(debounceTime(250), distinctUntilChanged()).subscribe((q) => this.buscar(q));
    this.buscar('');
    this.route.queryParamMap.subscribe((params) => {
      const slug = params.get('artigo');
      if (slug) {
        this.abrirSlug(slug);
      }
    });
  }

  onQuery(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.query.set(value);
    this.search$.next(value.trim());
  }

  buscar(q: string): void {
    this.loading.set(true);
    this.knowledge.searchHelp(q || undefined).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.error.set('');
        this.items.set(res.data ?? []);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Não foi possível carregar a ajuda.');
      },
    });
  }

  abrir(item: KnowledgeArticle): void {
    this.abrirSlug(item.slug);
  }

  abrirSlug(slug: string): void {
    this.knowledge.getHelpArticle(slug).subscribe({
      next: (res) => {
        this.selected.set(res.data);
        void this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { artigo: slug },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      },
      error: () => {
        this.error.set('Artigo não encontrado.');
      },
    });
  }

  voltarLista(): void {
    this.selected.set(null);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { artigo: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  categoryLabel(id: string): string {
    const map: Record<string, string> = {
      primeiros_passos: 'Primeiros passos',
      fichas_documentos: 'Fichas e documentos',
      assinatura_eletronica: 'Assinatura eletrônica',
      protocolos: 'Protocolos',
      planos_pagamentos: 'Planos e pagamentos',
      solucao_problemas: 'Solução de problemas',
    };
    return map[id] ?? id;
  }
}
