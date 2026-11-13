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

type ToolCat = 'Financeiro' | 'Organização' | 'Relacionamento';

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

  readonly cats: { key: ToolCat; title: string; desc: string }[] = [
    {
      key: 'Financeiro',
      title: 'Financeiro',
      desc: 'Preço, orçamento e taxas de cartão',
    },
    {
      key: 'Organização',
      title: 'Organização',
      desc: 'Checklist, pacotes e estoque',
    },
    {
      key: 'Relacionamento',
      title: 'Relacionamento',
      desc: 'Mensagens prontas e retornos',
    },
  ];

  readonly category = signal<ToolCat | null>(null);
  readonly loading = signal(true);
  readonly tools = signal<MobileToolCatalogItem[]>([]);

  readonly items = computed(() => {
    const cat = this.category();
    if (!cat) return [];
    return this.tools().filter((t) => t.category === cat);
  });

  readonly categoryMeta = computed(() => {
    const cat = this.category();
    return this.cats.find((c) => c.key === cat) ?? null;
  });

  ngOnInit(): void {
    const remembered = this.shell.lastToolCategory();
    if (remembered === 'Financeiro' || remembered === 'Organização' || remembered === 'Relacionamento') {
      this.category.set(remembered);
    }

    this.toolsApi.catalog().subscribe({
      next: (list) => {
        this.tools.set(list || []);
        this.loading.set(false);
      },
      error: () => {
        this.tools.set([
          { key: 'preco', name: 'Preço e lucro', category: 'Financeiro', ready: true },
          { key: 'orcamento', name: 'Orçamento rápido', category: 'Financeiro', ready: true },
          { key: 'mensagens', name: 'Mensagens prontas', category: 'Relacionamento', ready: true },
          { key: 'checklist', name: 'Checklist da sala', category: 'Organização', ready: true },
          { key: 'pacotes', name: 'Pacotes e sessões', category: 'Organização', ready: true },
          { key: 'estoque', name: 'Estoque e validade', category: 'Organização', ready: true },
          { key: 'parcelamento', name: 'Taxas de cartão', category: 'Financeiro', ready: true },
          { key: 'retornos', name: 'Retornos', category: 'Relacionamento', ready: true },
        ]);
        this.loading.set(false);
      },
    });
  }

  openCategory(cat: ToolCat): void {
    this.category.set(cat);
    this.shell.lastToolCategory.set(cat);
  }

  backToCategories(): void {
    this.category.set(null);
    this.shell.lastToolCategory.set(null);
  }

  abrirNotificacoes(): void {
    this.shell.openNotifications();
  }

  abrirMenu(): void {
    this.shell.openMenu();
  }

  countFor(cat: ToolCat): number {
    return this.tools().filter((t) => t.category === cat).length;
  }

  routeFor(key: string): string {
    const map: Record<string, string> = {
      preco: 'preco',
      orcamento: 'orcamento',
      mensagens: 'mensagens',
      checklist: 'checklist',
      pacotes: 'pacotes',
      estoque: 'estoque',
      parcelamento: 'cartao',
      retornos: 'retornos',
    };
    return map[key] || key;
  }

  descFor(key: string): string {
    const map: Record<string, string> = {
      preco: 'Calcule o valor ideal do serviço',
      orcamento: 'Proposta pronta para compartilhar',
      mensagens: 'WhatsApp sem digitar tudo de novo',
      checklist: 'Preparação antes do atendimento',
      pacotes: 'Controle os atendimentos vendidos',
      estoque: 'Veja o que está perto de vencer',
      parcelamento: 'Simule quanto entra no caixa',
      retornos: 'Lembre quem precisa de contato',
    };
    return map[key] || '';
  }

  iconFor(key: string): string {
    const map: Record<string, string> = {
      preco: 'calculate',
      orcamento: 'receipt_long',
      mensagens: 'chat',
      checklist: 'checklist',
      pacotes: 'stacks',
      estoque: 'inventory_2',
      parcelamento: 'credit_card',
      retornos: 'event_repeat',
    };
    return map[key] || 'handyman';
  }

  catIcon(key: ToolCat): string {
    if (key === 'Financeiro') return 'payments';
    if (key === 'Organização') return 'folder_managed';
    return 'diversity_1';
  }
}
