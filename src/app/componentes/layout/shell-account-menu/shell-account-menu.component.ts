import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
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
export class ShellAccountMenuComponent implements OnInit, OnDestroy {
  @Input() shellContext: 'app' | 'plataforma' = 'app';
  /** Abre o drawer de tema (delegado ao top-bar-actions). */
  @Output() openTheme = new EventEmitter<void>();

  nomeUsuario = 'Usuário';
  iniciaisUsuario = 'U';
  exibirTrocarEmpresa = false;
  ehAdminPlataforma = false;
  podeGerenciarClinica = false;

  private clinicaSub?: Subscription;
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

  ngOnDestroy(): void {
    this.clinicaSub?.unsubscribe();
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

  private syncMenuPermissoes(): void {
    const u = this.auth.getUser();
    this.ehAdminPlataforma = u?.role === 'platform_admin';
    this.podeGerenciarClinica = u ? this.auth.hasPermission('organization.manage') : false;
    if (u) {
      const nome = (u.name || 'Usuário').trim() || 'Usuário';
      this.nomeUsuario = nome;
      this.iniciaisUsuario = this.initialsFromName(nome);
    }
    this.cdr.markForCheck();
  }

  private syncClinicInfo(): void {
    this.exibirTrocarEmpresa = this.auth.canSwitchClinic();
  }

  /** Mesma regra do pesquisa_app (Admin Acme → AA). */
  private initialsFromName(name: string): string {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
}
