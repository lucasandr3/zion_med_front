import { Component, OnInit, inject, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UsuariosService, Role, Usuario, UsuarioUpdatePayload } from '../../core/services/usuarios.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonCardComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';

function mensagemErroApi(err: { error?: { message?: string; errors?: Record<string, string[]> } }): string {
  const e = err.error;
  if (!e) return 'Ocorreu um erro. Tente novamente.';
  if (e.message) return e.message;
  if (e.errors) return Object.values(e.errors).flat().join(' ');
  return 'Ocorreu um erro. Tente novamente.';
}

@Component({
  selector: 'app-usuarios-formulario',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent],
  templateUrl: './usuarios-formulario.component.html',
  styleUrl: './usuarios-formulario.component.css',
})
export class UsuariosFormularioComponent implements OnInit {
  editMode = false;
  usuarioId: number | null = null;

  name = '';
  email = '';
  role = '';
  password = '';
  passwordConfirm = '';
  newPassword = '';
  newPasswordConfirm = '';
  active = true;
  canSwitchClinic = false;

  rolesList: Role[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  salvando = false;
  erro = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuariosService = inject(UsuariosService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private auth = inject(AuthService);

  get podeConcederTrocaClinica(): boolean {
    return this.auth.getUser()?.role === 'owner';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.usuarioId = Number(id);
      const obs = forkJoin({
        usuario: this.usuariosService.get(this.usuarioId),
        roles: this.usuariosService.roles(),
      });
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(obs);
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: ({ usuario, roles }) => {
          this.listaPronta = true;
          this.rolesList = roles;
          this.patchFromUser(usuario);
        },
        error: () => {
          this.listaPronta = true;
          this.erro = 'Usuário não encontrado ou sem permissão.';
        },
      });
    } else {
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.usuariosService.roles());
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (roles) => {
          this.listaPronta = true;
          this.rolesList = roles;
          if (roles.length && !this.role) {
            this.role = roles[0].value;
          }
        },
        error: () => {
          this.listaPronta = true;
          this.erro = 'Não foi possível carregar os perfis.';
        },
      });
    }
  }

  private patchFromUser(u: Usuario): void {
    this.name = u.name ?? '';
    this.email = u.email ?? '';
    this.role = u.role ?? '';
    this.active = u.active !== false;
    this.canSwitchClinic = !!u.can_switch_clinic;
  }

  salvar(): void {
    if (!this.name.trim() || !this.email.trim() || !this.role) return;

    if (!this.editMode) {
      if (!this.password.trim()) {
        this.toast.error('Validação', 'Informe a senha.');
        return;
      }
      if (this.password !== this.passwordConfirm) {
        this.toast.error('Validação', 'As senhas não coincidem.');
        return;
      }
    } else if (this.newPassword.trim() || this.newPasswordConfirm.trim()) {
      if (!this.newPassword.trim()) {
        this.toast.error('Validação', 'Informe a nova senha ou deixe os campos em branco.');
        return;
      }
      if (this.newPassword !== this.newPasswordConfirm) {
        this.toast.error('Validação', 'As novas senhas não coincidem.');
        return;
      }
    }

    this.salvando = true;
    this.erro = '';

    if (this.editMode && this.usuarioId != null) {
      const body: UsuarioUpdatePayload = {
        name: this.name.trim(),
        email: this.email.trim(),
        role: this.role,
        active: this.active,
      };
      if (this.newPassword.trim()) {
        body.password = this.newPassword;
        body.password_confirmation = this.newPasswordConfirm;
      }
      if (this.podeConcederTrocaClinica) {
        body.can_switch_clinic = this.canSwitchClinic;
      }
      this.usuariosService.update(this.usuarioId, body).subscribe({
        next: () => {
          this.salvando = false;
          this.toast.success('Usuário atualizado', '');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          this.salvando = false;
          this.erro = mensagemErroApi(err);
          this.toast.error('Erro', this.erro);
        },
      });
    } else {
      this.usuariosService
        .create({
          name: this.name.trim(),
          email: this.email.trim(),
          password: this.password,
          password_confirmation: this.passwordConfirm,
          role: this.role,
          ...(this.podeConcederTrocaClinica ? { can_switch_clinic: this.canSwitchClinic } : {}),
        })
        .subscribe({
          next: () => {
            this.salvando = false;
            this.toast.success('Usuário criado', '');
            this.router.navigate(['/usuarios']);
          },
          error: (err) => {
            this.salvando = false;
            this.erro = mensagemErroApi(err);
            this.toast.error('Erro', this.erro);
          },
        });
    }
  }
}
