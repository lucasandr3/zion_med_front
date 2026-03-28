import { Component, OnInit, inject, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import {
  OrganizationRolesService,
  PermissionCatalogItem,
  OrganizationRoleDetail,
} from '../../core/services/organization-roles.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-organizacao-papel-formulario',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent],
  templateUrl: './organizacao-papel-formulario.component.html',
  styleUrl: './organizacao-papel-formulario.component.css',
})
export class OrganizacaoPapelFormularioComponent implements OnInit {
  novo = false;
  slugParam = '';
  label = '';
  slugNovo = '';
  catalog: PermissionCatalogItem[] = [];
  selecionadas = new Set<string>();
  detalhe: OrganizationRoleDetail | null = null;

  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  salvando = false;
  erro = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(OrganizationRolesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  get grupos(): { label: string; items: PermissionCatalogItem[] }[] {
    const map = new Map<string, PermissionCatalogItem[]>();
    for (const item of this.catalog) {
      const g = item.group_label || item.group;
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(item);
    }
    return [...map.entries()].map(([label, items]) => ({ label, items }));
  }

  get permissoesBloqueadas(): boolean {
    return !!this.detalhe?.is_system && this.detalhe.slug === 'owner';
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.slugParam = slug;
    this.novo = slug === 'novo';

    if (this.novo) {
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.service.catalog());
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (c) => {
          this.catalog = c;
          this.listaPronta = true;
        },
        error: () => {
          this.listaPronta = true;
          this.erro = 'Não foi possível carregar o catálogo de permissões.';
        },
      });
      return;
    }

    const obs = forkJoin({
      catalog: this.service.catalog(),
      perfil: this.service.get(slug),
    });
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(obs);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: ({ catalog, perfil }) => {
        this.catalog = catalog;
        this.detalhe = perfil;
        this.label = perfil.label;
        this.selecionadas = new Set(perfil.permissions ?? []);
        this.listaPronta = true;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Perfil de permissões não encontrado ou sem autorização.';
      },
    });
  }

  toggle(key: string): void {
    if (this.permissoesBloqueadas) return;
    if (this.selecionadas.has(key)) this.selecionadas.delete(key);
    else this.selecionadas.add(key);
  }

  isOn(key: string): boolean {
    return this.selecionadas.has(key);
  }

  salvar(): void {
    if (this.permissoesBloqueadas) {
      this.salvarSoLabel();
      return;
    }
    const perms = [...this.selecionadas];
    if (perms.length === 0) {
      this.toast.error('Validação', 'Selecione ao menos uma permissão.');
      return;
    }
    if (this.novo) {
      const s = this.slugNovo.trim().toLowerCase();
      if (!/^[a-z][a-z0-9_]{1,62}$/.test(s)) {
        this.toast.error('Validação', 'Identificador: letras minúsculas, números e underscore; 2–63 caracteres.');
        return;
      }
      if (!this.label.trim()) {
        this.toast.error('Validação', 'Informe o nome do perfil de permissões.');
        return;
      }
      this.salvando = true;
      this.service.create({ slug: s, label: this.label.trim(), permissions: perms }).subscribe({
        next: () => {
          this.salvando = false;
          this.toast.success('Permissões criadas', '');
          void this.router.navigate(['/organizacao/permissoes']);
        },
        error: (err) => {
          this.salvando = false;
          this.toast.error('Erro', err.error?.message ?? 'Não foi possível salvar.');
        },
      });
      return;
    }

    this.salvando = true;
    this.service.update(this.slugParam, { label: this.label.trim(), permissions: perms }).subscribe({
      next: () => {
        this.salvando = false;
        this.toast.success('Permissões atualizadas', '');
        void this.router.navigate(['/organizacao/permissoes']);
      },
      error: (err) => {
        this.salvando = false;
        this.toast.error('Erro', err.error?.message ?? 'Não foi possível salvar.');
      },
    });
  }

  private salvarSoLabel(): void {
    if (!this.detalhe) return;
    this.salvando = true;
    this.service.update(this.slugParam, { label: this.label.trim() }).subscribe({
      next: () => {
        this.salvando = false;
        this.toast.success('Nome atualizado', '');
        void this.router.navigate(['/organizacao/permissoes']);
      },
      error: (err) => {
        this.salvando = false;
        this.toast.error('Erro', err.error?.message ?? 'Não foi possível salvar.');
      },
    });
  }
}
