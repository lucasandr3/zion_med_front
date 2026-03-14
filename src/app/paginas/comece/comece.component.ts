import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingService, PlanoLanding } from '../../core/services/landing.service';
import { ComeceService } from '../../core/services/comece.service';
import { AuthService } from '../../core/services/auth.service';

const BENEFICIOS = [
  { icon: 'description', color: 'text-indigo-500', bg: 'bg-indigo-50', title: 'Fichas e consentimentos sem papel', desc: 'Pacientes recebem um link, preenchem e assinam digitalmente antes da consulta.' },
  { icon: 'bolt', color: 'text-amber-500', bg: 'bg-amber-50', title: 'Acesso imediato, sem burocracia', desc: 'Sua conta é criada na hora. Comece a usar em minutos, sem instalação.' },
  { icon: 'assignment', color: 'text-sky-500', bg: 'bg-sky-50', title: 'Templates prontos para clínicas', desc: 'Fichas de cadastro, anamneses e consentimentos prontos para uso desde o primeiro dia.' },
  { icon: 'picture_as_pdf', color: 'text-rose-500', bg: 'bg-rose-50', title: 'PDF e protocolo automáticos', desc: 'Cada envio gera PDF com protocolo único, data/hora e evidência de assinatura.' },
  { icon: 'corporate_fare', color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'Multi-unidade e multi-equipe', desc: 'Gerencie várias unidades e equipes com permissões granulares por perfil.' },
];

@Component({
  selector: 'app-pagina-comece',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './comece.component.html',
  styleUrl: './comece.component.css',
})
export class ComeceComponent implements OnInit {
  planos: PlanoLanding[] = [];
  diasTrial = 14;
  carregandoPlanos = true;
  planKey = '';
  companyName = '';
  responsibleName = '';
  email = '';
  phone = '';
  password = '';
  passwordConfirmation = '';
  acceptedTerms = false;
  estadoCarregando = false;
  estadoErro = false;
  mensagemErro = '';
  mostrarSenha = false;
  mostrarSenhaConf = false;
  forcaSenha = 0;
  labelForcaSenha = 'Use no mínimo 8 caracteres';
  beneficios = BENEFICIOS;

  private router = inject(Router);
  private landingService = inject(LandingService);
  private comeceService = inject(ComeceService);
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.landingService.getLanding().subscribe({
      next: (d) => {
        this.diasTrial = d.trial_days ?? 14;
        this.planos = d.plans ?? [];
        this.carregandoPlanos = false;
        if (this.planos.length && !this.planKey) this.planKey = this.planos[0].key;
      },
      error: () => {
        this.diasTrial = 14;
        this.planos = [];
        this.carregandoPlanos = false;
      },
    });
  }

  atualizarForcaSenha(): void {
    const p = this.password || '';
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    this.forcaSenha = Math.min(4, score);
    const labels = ['', 'Senha muito fraca', 'Senha fraca', 'Senha razoável', 'Senha forte'];
    this.labelForcaSenha = labels[this.forcaSenha] || 'Use no mínimo 8 caracteres';
  }

  enviar(): void {
    this.estadoErro = false;
    this.mensagemErro = '';
    if (!this.planKey || !this.companyName?.trim() || !this.responsibleName?.trim() || !this.email?.trim() || !this.password || this.password !== this.passwordConfirmation || !this.acceptedTerms) {
      this.estadoErro = true;
      this.mensagemErro = 'Preencha todos os campos obrigatórios, confirme a senha e aceite os termos.';
      return;
    }
    if (this.password.length < 8) {
      this.estadoErro = true;
      this.mensagemErro = 'A senha deve ter no mínimo 8 caracteres.';
      return;
    }
    this.estadoCarregando = true;
    this.comeceService.store({
      company_name: this.companyName.trim(),
      responsible_name: this.responsibleName.trim(),
      email: this.email.trim(),
      phone: this.phone.trim() || undefined,
      password: this.password,
      password_confirmation: this.passwordConfirmation,
      plan_key: this.planKey,
      accepted_terms: this.acceptedTerms,
    }).subscribe({
      next: (data) => {
        this.auth.setSessionFromLoginData(data);
        this.estadoCarregando = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.estadoCarregando = false;
        this.estadoErro = true;
        const msg = err.error?.message ?? err.error?.errors
          ? Object.values(err.error.errors).flat().join(' ')
          : 'Não foi possível criar a conta. Tente novamente.';
        this.mensagemErro = typeof msg === 'string' ? msg : 'Não foi possível criar a conta.';
      },
    });
  }
}
