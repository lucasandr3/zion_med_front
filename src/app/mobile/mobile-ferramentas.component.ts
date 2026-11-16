import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MobileToolsService, type MobileToolCatalogItem } from '../core/services/mobile-tools.service';
import { MobileShellService } from './mobile-shell.service';

/** Só as 3 tools prioritárias ficam visíveis no app. */
const PRIORITY_KEYS = new Set(['orcamento', 'mensagens', 'retornos']);

const PRIORITY_FALLBACK: MobileToolCatalogItem[] = [
  { key: 'orcamento', name: 'Orçamentos', category: 'Financeiro', ready: true },
  { key: 'mensagens', name: 'Mensagens', category: 'Relacionamento', ready: true },
  { key: 'retornos', name: 'Retornos', category: 'Relacionamento', ready: true },
];

@Component({
  selector: 'app-mobile-ferramentas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './mobile-ferramentas.component.html',
  styleUrls: ['./mobile-shared.css'],
})
export class MobileFerramentasComponent implements OnInit {
  private readonly shell = inject(MobileShellService);
  private readonly toolsApi = inject(MobileToolsService);

  readonly loading = signal(true);
  readonly tools = signal<MobileToolCatalogItem[]>([]);

  readonly items = computed(() =>
    this.tools().filter((t) => PRIORITY_KEYS.has(t.key) && t.ready !== false),
  );

  ngOnInit(): void {
    this.shell.lastToolCategory.set(null);

    this.toolsApi.catalog().subscribe({
      next: (list) => {
        const filtered = (list || []).filter((t) => PRIORITY_KEYS.has(t.key));
        this.tools.set(filtered.length ? filtered : PRIORITY_FALLBACK);
        this.loading.set(false);
      },
      error: () => {
        this.tools.set(PRIORITY_FALLBACK);
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

  routeFor(key: string): string {
    const map: Record<string, string> = {
      orcamento: 'orcamento',
      mensagens: 'mensagens',
      retornos: 'retornos',
    };
    return map[key] || key;
  }

  descFor(key: string): string {
    const map: Record<string, string> = {
      orcamento: 'Listagem de propostas e nova proposta',
      mensagens: 'Modelos prontos sem digitar tudo de novo',
      retornos: 'Fila de follow-ups e agendar retorno',
    };
    return map[key] || '';
  }

  iconFor(key: string): string {
    const map: Record<string, string> = {
      orcamento: 'receipt_long',
      mensagens: 'chat',
      retornos: 'event_repeat',
    };
    return map[key] || 'widgets';
  }
}
