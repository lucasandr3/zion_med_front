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

/** Tools do box + prioridade operacional (preço/cartão ficam de fora por enquanto). */
const PRIORITY_KEYS = new Set([
  'orcamento',
  'mensagens',
  'retornos',
  'checklist',
  'estoque',
  'pacotes',
]);

const PRIORITY_FALLBACK: MobileToolCatalogItem[] = [
  { key: 'orcamento', name: 'Orçamentos', category: 'Financeiro', ready: true },
  { key: 'mensagens', name: 'Notificações', category: 'Relacionamento', ready: true },
  { key: 'retornos', name: 'Retornos', category: 'Relacionamento', ready: true },
  { key: 'checklist', name: 'Checklist da sala', category: 'Organização', ready: true },
  { key: 'estoque', name: 'Estoque e validade', category: 'Organização', ready: true },
  { key: 'pacotes', name: 'Pacotes e sessões', category: 'Organização', ready: true },
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
      mensagens: 'notificacoes',
      retornos: 'retornos',
      checklist: 'checklist',
      estoque: 'estoque',
      pacotes: 'pacotes',
    };
    return map[key] || key;
  }

  descFor(key: string): string {
    const map: Record<string, string> = {
      orcamento: 'Listagem de propostas e nova proposta',
      mensagens: 'Modelos prontos sem digitar tudo de novo',
      retornos: 'Fila de follow-ups e agendar retorno',
      checklist: 'Conferência rápida da sala',
      estoque: 'Materiais, quantidades e validade',
      pacotes: 'Saldo de sessões e pacotes',
    };
    return map[key] || '';
  }

  iconFor(key: string): string {
    const map: Record<string, string> = {
      orcamento: 'receipt_long',
      mensagens: 'chat',
      retornos: 'event_repeat',
      checklist: 'checklist',
      estoque: 'inventory_2',
      pacotes: 'package_2',
    };
    return map[key] || 'widgets';
  }
}
