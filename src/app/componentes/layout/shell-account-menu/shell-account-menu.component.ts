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
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ClinicaService } from '../../../core/services/clinica.service';
import { setPreferPainelExperience } from '../../../core/utils/gestgo-experience.util';

type NordPopoutHost = HTMLElement & {
  id: string;
  initializeElements?: () => void;
  updatePosition?: () => Promise<void>;
  align?: string;
  position?: string;
  sideOffset?: number;
  alignOffset?: number;
  alwaysFloating?: boolean;
};

type NordDropdownHost = HTMLElement & {
  open?: boolean;
  expand?: boolean;
  align?: string;
  position?: string;
  sideOffset?: number;
  alignOffset?: number;
  alwaysFloating?: boolean;
  show?: () => void | Promise<void>;
  hide?: (restoreFocus?: boolean) => void | Promise<void>;
};

/**
 * Menu da conta Gestgo.
 * Wrapper em torno de um `nord-dropdown` puro (não hospeda o CE) —
 * evita âncora nula do popout por projeção Angular tardia.
 */
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'gestgo-shell-account-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gestgo-shell-account-menu',
    '[class.gestgo-shell-account-menu--nav-footer]': 'placement === "nav-footer"',
  },
  templateUrl: './shell-account-menu.component.html',
  styleUrl: './shell-account-menu.component.css',
})
export class ShellAccountMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() shellContext: 'app' | 'plataforma' = 'app';
  /** Onde o menu aparece: top bar (legado) ou rodapé da sidebar (Nord). */
  @Input() placement: 'topbar' | 'nav-footer' = 'topbar';
  /** Abre o drawer de tema (delegado ao top-bar-actions). */
  @Output() openTheme = new EventEmitter<void>();

  @ViewChild('dropdown', { read: ElementRef })
  private dropdownRef?: ElementRef<NordDropdownHost>;

  nomeUsuario = 'Usuário';
  emailUsuario = '';
  iniciaisUsuario = 'U';
  /** Empresa/organização do contexto atual (tenant). */
  nomeEmpresa = '';
  exibirTrocarEmpresa = false;
  ehAdminPlataforma = false;
  trialBadgeLabel: string | null = null;

  private clinicaSub?: Subscription;
  private appearanceSub?: Subscription;
  private openListenerCleanup?: () => void;

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly clinicaService = inject(ClinicaService);
  private readonly cdr = inject(ChangeDetectorRef);

  get podeVerBillingNoHeader(): boolean {
    return this.auth.hasPermission('billing.manage');
  }

  ngOnInit(): void {
    this.syncUsuarioInfo();
    this.syncClinicInfo();
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() => {
      this.syncUsuarioInfo();
      this.syncClinicInfo();
    });
    this.clinicaSub = this.clinicaService.clinicBrandingUpdated$.subscribe(() => {
      this.syncClinicInfo();
    });
  }

  ngAfterViewInit(): void {
    this.applyNavFooterAttrs();
    this.rebindNordPopout();
    // Toggle pode chegar um frame depois da projeção Angular.
    queueMicrotask(() => this.rebindNordPopout());
    setTimeout(() => this.rebindNordPopout(), 0);
    setTimeout(() => this.rebindNordPopout(), 100);
    this.bindOpenReposition();
  }

  ngOnDestroy(): void {
    this.clinicaSub?.unsubscribe();
    this.appearanceSub?.unsubscribe();
    this.openListenerCleanup?.();
  }

  /** Dashboard Nord: expand + position inline-end + align end. */
  private applyNavFooterAttrs(): void {
    const el = this.dropdownRef?.nativeElement;
    if (!el || this.placement !== 'nav-footer') return;
    el.expand = true;
    el.align = 'end';
    el.position = 'inline-end';
    el.sideOffset = 8;
    el.alignOffset = 0;
    el.alwaysFloating = true;
  }

  /**
   * O nord-popout resolve a âncora no connectedCallback.
   * Com toggle projetado depois, precisamos re-inicializar (via troca de id → handleIdChange).
   */
  private rebindNordPopout(): void {
    const dropdown = this.dropdownRef?.nativeElement;
    if (!dropdown) return;
    this.applyNavFooterAttrs();

    const toggle = dropdown.querySelector('[slot="toggle"]');
    if (!(toggle instanceof HTMLElement)) return;

    const popout = dropdown.shadowRoot?.querySelector('nord-popout') as NordPopoutHost | null;
    if (!popout) return;

    const id = popout.id || 'popout';
    popout.removeAttribute('id');
    queueMicrotask(() => {
      popout.id = id;
      if (this.placement === 'nav-footer') {
        popout.align = 'end';
        popout.position = 'inline-end';
        popout.sideOffset = 8;
        popout.alignOffset = 0;
        popout.alwaysFloating = true;
      }
      void popout.updatePosition?.();
    });
  }

  private bindOpenReposition(): void {
    this.openListenerCleanup?.();
    const dropdown = this.dropdownRef?.nativeElement;
    if (!dropdown) return;

    const onOpen = () => {
      const popout = dropdown.shadowRoot?.querySelector('nord-popout') as NordPopoutHost | null;
      void popout?.updatePosition?.();
      requestAnimationFrame(() => void popout?.updatePosition?.());
    };
    dropdown.addEventListener('open', onOpen);
    this.openListenerCleanup = () => dropdown.removeEventListener('open', onOpen);
  }

  go(event: Event, path: string): void {
    event.preventDefault();
    if (path === '/m' || path.startsWith('/m/')) {
      setPreferPainelExperience(false);
    }
    void this.router.navigateByUrl(path);
  }

  abrirTema(): void {
    this.openTheme.emit();
  }

  sair(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/autenticacao']));
  }

  private syncUsuarioInfo(): void {
    const u = this.auth.getUser();
    this.ehAdminPlataforma = u?.role === 'platform_admin';
    if (u) {
      const nome = (u.name || 'Usuário').trim() || 'Usuário';
      this.nomeUsuario = nome;
      this.emailUsuario = (u.email || '').trim();
      this.iniciaisUsuario = this.initialsFromName(nome);
    }
    this.syncTrialBadge();
    this.cdr.markForCheck();
  }

  private syncTrialBadge(): void {
    const trial = this.auth.getTrialNotice();
    if (!trial?.visible) {
      this.trialBadgeLabel = null;
      return;
    }
    const dias = trial.days_remaining;
    this.trialBadgeLabel = dias === 1 ? 'Trial · 1 dia' : `Trial · ${dias} dias`;
  }

  private syncClinicInfo(): void {
    this.exibirTrocarEmpresa = this.auth.canSwitchClinic();
    this.nomeEmpresa = this.auth.getCurrentOrganization()?.name?.trim() ?? '';
    this.cdr.markForCheck();
    // Conteúdo do header pode re-projetar o toggle → reancorar.
    queueMicrotask(() => this.rebindNordPopout());
  }

  private initialsFromName(name: string): string {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
}
