import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./paginas/inicio/inicio.component').then(m => m.InicioComponent) },
  { path: 'autenticacao', loadComponent: () => import('./paginas/login/login.component').then(m => m.LoginComponent) },
  { path: 'comece', loadComponent: () => import('./paginas/comece/comece.component').then(m => m.ComeceComponent) },
  { path: 'termos-de-uso', loadComponent: () => import('./paginas/termos/termos.component').then(m => m.TermosComponent) },
  { path: 'privacidade', loadComponent: () => import('./paginas/privacidade/privacidade.component').then(m => m.PrivacidadeComponent) },
  { path: 'f/sucesso', loadComponent: () => import('./paginas/formulario-publico/formulario-publico-sucesso.component').then(m => m.FormularioPublicoSucessoComponent) },
  { path: 'f/:token', loadComponent: () => import('./paginas/formulario-publico/formulario-publico-show.component').then(m => m.FormularioPublicoShowComponent) },
  {
    path: '',
    loadComponent: () => import('./componentes/layout/layout-app/layout-app.component').then(m => m.LayoutAppComponent),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./paginas/dashboard/dashboard.component').then(m => m.DashboardComponent), data: { titulo: 'Dashboard' } },
      { path: 'billing', loadComponent: () => import('./paginas/billing/billing.component').then(m => m.BillingComponent), data: { titulo: 'Assinatura' } },
      { path: 'links-publicos', loadComponent: () => import('./paginas/links-publicos/links-publicos.component').then(m => m.LinksPublicosComponent), data: { titulo: 'Links para enviar' } },
      { path: 'protocolos', loadComponent: () => import('./paginas/protocolos/protocolos-listagem.component').then(m => m.ProtocolosListagemComponent), data: { titulo: 'Protocolos' } },
      { path: 'notificacoes', loadComponent: () => import('./paginas/notificacoes/notificacoes.component').then(m => m.NotificacoesComponent), data: { titulo: 'Notificações' } },
      { path: 'templates', loadComponent: () => import('./paginas/templates/templates-listagem.component').then(m => m.TemplatesListagemComponent), data: { titulo: 'Templates' } },
      { path: 'templates/criar', loadComponent: () => import('./paginas/templates/templates-criar.component').then(m => m.TemplatesCriarComponent), data: { titulo: 'Novo template', urlVoltar: '/templates', labelVoltar: 'Voltar para Templates' } },
      { path: 'templates/criar-em-branco', loadComponent: () => import('./paginas/templates/templates-criar-em-branco.component').then(m => m.TemplatesCriarEmBrancoComponent), data: { titulo: 'Novo template (em branco)', urlVoltar: '/templates/criar', labelVoltar: 'Voltar à escolha de modelo' } },
      { path: 'templates/:id/editar', loadComponent: () => import('./paginas/templates/templates-editar.component').then(m => m.TemplatesEditarComponent), data: { titulo: 'Editar template', urlVoltar: '/templates', labelVoltar: 'Voltar para Templates' } },
      { path: 'templates/:id/campos', loadComponent: () => import('./paginas/templates/templates-campos.component').then(m => m.TemplatesCamposComponent), data: { titulo: 'Campos', urlVoltar: '/templates', labelVoltar: 'Voltar para Templates' } },
      { path: 'clinica/configuracoes', loadComponent: () => import('./paginas/clinica/clinica-configuracoes.component').then(m => m.ClinicaConfiguracoesComponent), data: { titulo: 'Configurações' } },
      { path: 'clinica/escolher', loadComponent: () => import('./paginas/clinica/clinica-escolher.component').then(m => m.ClinicaEscolherComponent), data: { titulo: 'Escolher empresa' } },
      { path: 'clinica/integracoes', loadComponent: () => import('./paginas/clinica/clinica-integracoes.component').then(m => m.ClinicaIntegracoesComponent), data: { titulo: 'Integrações' } },
      { path: 'link-bio', loadComponent: () => import('./paginas/link-bio/link-bio.component').then(m => m.LinkBioComponent), data: { titulo: 'Link Bio' } },
      { path: 'usuarios', loadComponent: () => import('./paginas/usuarios/usuarios-listagem.component').then(m => m.UsuariosListagemComponent), data: { titulo: 'Usuários' } },
      { path: 'usuarios/criar', loadComponent: () => import('./paginas/usuarios/usuarios-criar.component').then(m => m.UsuariosCriarComponent), data: { titulo: 'Novo usuário' } },
    ],
  },
  { path: '404', loadComponent: () => import('./paginas/erro/erro-404.component').then(m => m.Erro404Component) },
  { path: '**', redirectTo: '404' },
];
