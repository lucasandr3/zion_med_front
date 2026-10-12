import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ClinicaService } from '../../../core/services/clinica.service';

type NordDropdownHost = HTMLElement & {
  open?: boolean;
  show?: () => void | Promise<void>;
  hide?: (restoreFocus?: boolean) => void | Promise<void>;
};

/**
 * Host = `nord-dropdown` com `slot="end"` no top-bar — igual ao pesquisa_app,
 * para receber os tokens `::slotted(nord-dropdown)` do Nord TopBar.
 */
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'nord-dropdown[gestgoAccountMenu]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'account-menu',
  },
  templateUrl: './shell-account-menu.component.html',
  styleUrl: './shell-account-menu.component.css',
})
export class ShellAccountMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() shellContext: 'app' | 'plataforma' = 'app';
  /** Abre o drawer de tema (delegado ao top-bar-actions). */
  @Output() openTheme = new EventEmitter<void>();

  nomeUsuario = 'Usuário';
  iniciaisUsuario = 'U';
  /** Empresa/organização do contexto atual (tenant). */
  nomeEmpresa = '';
  exibirTrocarEmpresa = false;
  ehAdminPlataforma = false;

  private clinicaSub?: Subscription;
  private toggleClickCleanup?: () => void;
  private openOnPointerDown = false;
  private readonly host = inject(ElementRef<NordDropdownHost>);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly clinicaService = inject(ClinicaService);
  private readonly cdr = inject(ChangeDetectorRef);

  get podeVerBillingNoHeader(): boolean {
    return this.auth.hasPermission('billing.manage');
  }

  ngOnInit(): void {
    this.syncMenuPermissoes();
    this.syncClinicInfo();
    this.clinicaSub = this.clinicaService.clinicBrandingUpdated$.subscribe(() => {
      this.syncClinicInfo();
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    // O nord-popout liga o clique no toggle no connectedCallback; se o Angular
    // ainda não tiver projetado o botão, o listener fica órfão e o menu não abre.
    this.scheduleToggleBind();
  }

  ngOnDestroy(): void {
    this.clinicaSub?.unsubscribe();
    this.toggleClickCleanup?.();
  }

  private scheduleToggleBind(): void {
    queueMicrotask(() => this.ensureToggleOpens());
    setTimeout(() => this.ensureToggleOpens(), 0);
    setTimeout(() => this.ensureToggleOpens(), 100);
    setTimeout(() => this.ensureToggleOpens(), 300);
  }

  go(event: Event, path: string): void {
    event.preventDefault();
    void this.router.navigateByUrl(path);
  }

  abrirTema(): void {
    this.openTheme.emit();
  }

  sair(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }

  private ensureToggleOpens(): void {
    const dropdown = this.host.nativeElement;
    const toggle = dropdown.querySelector('[slot="toggle"]');
    if (!(toggle instanceof HTMLElement)) return;

    this.toggleClickCleanup?.();

    const onPointerDown = () => {
      this.openOnPointerDown = !!dropdown.open;
    };
    const onClick = () => {
      const wasOpen = this.openOnPointerDown;
      // Depois do handler do Nord: se o estado não mudou, forçamos.
      // (O popout pode ter ligado o clique antes do Angular projetar o toggle.)
      requestAnimationFrame(() => {
        if (wasOpen) {
          if (dropdown.open) void dropdown.hide?.(false);
        } else if (!dropdown.open) {
          void dropdown.show?.();
        }
      });
    };

    toggle.addEventListener('pointerdown', onPointerDown, true);
    toggle.addEventListener('click', onClick);
    this.toggleClickCleanup = () => {
      toggle.removeEventListener('pointerdown', onPointerDown, true);
      toggle.removeEventListener('click', onClick);
    };
  }

  private syncMenuPermissoes(): void {
    const u = this.auth.getUser();
    this.ehAdminPlataforma = u?.role === 'platform_admin';
    if (u) {
      const nome = (u.name || 'Usuário').trim() || 'Usuário';
      this.nomeUsuario = nome;
      this.iniciaisUsuario = this.initialsFromName(nome);
    }
    this.cdr.markForCheck();
  }

  private syncClinicInfo(): void {
    this.exibirTrocarEmpresa = this.auth.canSwitchClinic();
    this.nomeEmpresa = this.auth.getCurrentOrganization()?.name?.trim() ?? '';
    this.cdr.markForCheck();
    // Reprojetar header (empresa) pode orphanar o listener do Nord no toggle.
    this.scheduleToggleBind();
  }

  /** Mesma regra do pesquisa_app (Admin Acme → AA). */
  private initialsFromName(name: string): string {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
}
