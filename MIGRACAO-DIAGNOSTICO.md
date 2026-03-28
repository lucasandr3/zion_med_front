# Diagnóstico — Migração Blade → Angular (Gestgo)

## 1. Aviso sobre contexto.md
O arquivo `contexto.md` não foi encontrado na raiz do workspace. A migração foi realizada com base na análise direta dos projetos Blade e Angular.

---

## 2. Páginas existentes no Blade

### Públicas (sem autenticação)
| Rota/View | Descrição |
|-----------|-----------|
| `landing.blade.php` | Página inicial (home) — Gestgo governança documental, hero, seções, planos, FAQ, CTA, formulário demonstração |
| `auth/login.blade.php` | Login — card com email, senha, lembrar, link "Começar trial" |
| `comece.blade.php` | Cadastro trial — stepper 1/2/3, seleção de plano, empresa, responsável, email, senha, termos |
| `legal/termos.blade.php` | Termos de uso |
| `legal/privacidade.blade.php` | Política de privacidade |
| `formulario-publico/show.blade.php` | Formulário público por token |
| `formulario-publico/sucesso.blade.php` | Sucesso após envio |
| `link-bio/public.blade.php` | Página pública do link bio |
| `errors/404.blade.php`, `403.blade.php`, `500.blade.php` | Páginas de erro |

### App autenticado (layout `layouts/app.blade.php`)
| Rota/View | Descrição |
|-----------|-----------|
| `dashboard.blade.php` | Dashboard — cards (pendentes hoje, templates, últimos dias, links), gráfico por status, acesso rápido, últimos templates |
| `templates/index.blade.php` | Listagem de templates |
| `templates/create.blade.php`, `create-blank.blade.php`, `edit.blade.php` | CRUD templates |
| `templates/campos.blade.php` | Campos do template |
| `links-publicos/index.blade.php` | Links para enviar |
| `protocolos/index.blade.php`, `show.blade.php` | Protocolos / submissões |
| `submissoes/*` | Submissões (show, index) |
| `notificacoes/index.blade.php` | Notificações |
| `clinica/configuracoes.blade.php` | Configurações da empresa |
| `clinica/escolher.blade.php` | Escolher empresa |
| `clinica/integracoes.blade.php` | Integrações |
| `clinica/logs/index.blade.php` | Logs da clínica |
| `link-bio/index.blade.php` | Link Bio (gestão) |
| `usuarios/index.blade.php`, `create.blade.php`, `edit.blade.php` | CRUD usuários |
| `billing/index.blade.php` | Faturamento |

### Plataforma admin (layout `layouts/platform.blade.php`)
| Rota/View | Descrição |
|-----------|-----------|
| `platform/dashboard.blade.php` | Dashboard plataforma |
| `platform/tenants/index.blade.php`, `show.blade.php` | Clientes (tenants) |
| `platform/leads/index.blade.php` | Leads |
| `platform/billing/subscriptions.blade.php`, `payments.blade.php` | Assinaturas e faturas |
| `platform/plans/index.blade.php`, `edit.blade.php` | Planos |
| `platform/settings/index.blade.php` | Configurações |
| `platform/logs/index.blade.php` | Logs |

### Outros
| View | Descrição |
|------|-----------|
| `pdf/submission.blade.php` | Geração de PDF de submissão |
| `welcome.blade.php` | Welcome Laravel (pode ser ignorado na migração) |

---

## 3. Componentes reutilizáveis extraídos do Blade

### Layout
- **Sidebar** — logo, empresa atual, navegação (menu + administração), rodapé com usuário e dropdown (trocar empresa, admin plataforma, configurações, sair).
- **Cabeçalho (top-header)** — botão voltar (opcional), toggle sidebar, título da página, theme picker, dark mode, notificações, sair.
- **Overlay mobile** — overlay para fechar sidebar no mobile.

### UI (components/ui)
- **Alert** — tipos: info, success, warning, error (ícone Material + texto).
- **Card** — padding sm/md/lg/none, shadow, border, slot header/footer.
- **Button** — (button.blade.php).
- **Badge** — (badge.blade.php).

### Parciais lógicos
- Bloco “sem clínica” (dashboard) → componente ou mensagem condicional.
- Linhas de protocolos (`_rows.blade.php`) → componente de lista/linha.

---

## 4. Rotas necessárias no Angular

Espelho das rotas Blade, em português e organizadas:

### Públicas
- `/` → Landing (início)
- `/login` → Login
- `/comece` → Começar trial
- `/termos-de-uso` → Termos
- `/privacidade` → Privacidade
- `/f/sucesso` → Sucesso formulário público
- `/f/:token` → Formulário público
- `/l/:slug` → Link bio público
- `/erro/404`, `/erro/403`, `/erro/500` → Erros

### App (autenticado, layout com sidebar)
- `/dashboard` → Dashboard
- `/templates` → Listagem templates
- `/templates/criar`, `/templates/criar/em-branco`, `/templates/:id/editar`, `/templates/:id/campos`
- `/links-publicos` → Links para enviar
- `/protocolos`, `/protocolos/:id`
- `/notificacoes`
- `/clinica/configuracoes`, `/clinica/escolher`, `/clinica/integracoes`, `/clinica/logs`
- `/link-bio`
- `/usuarios`, `/usuarios/criar`, `/usuarios/:id/editar`
- `/billing`

### Plataforma (admin)
- `/plataforma` → Dashboard plataforma
- `/plataforma/clientes`, `/plataforma/clientes/:id`
- `/plataforma/leads`
- `/plataforma/assinaturas`, `/plataforma/faturas`
- `/plataforma/planos`, `/plataforma/planos/:id/editar`
- `/plataforma/configuracoes`, `/plataforma/logs`

---

## 5. Formulários e payloads identificados

### Login
- **POST** (ação do form Blade): `email`, `password`, `remember`, `_token` (CSRF).
- No Angular: enviar para API de login (a definir); manter campos equivalentes.

### Começar trial (comece)
- **POST** `comece.store`: `plan_key`, `company_name`, `responsible_name`, `email`, `password`, `password_confirmation`, `accepted_terms`, `_token`.
- Interfaces sugeridas: `PayloadComece`, `RespostaComece`.

### Demonstração (landing)
- **POST** `demonstracao.store`: `name`, `clinic`, `email`, `phone`, `message`, `_token`.

### Configurações clínica (tema / dark mode)
- **PUT** (via fetch no Blade): `theme_only`, `theme` ou `dark_mode_only`, `dark_mode`, `_method`, `_token`.

### Outros
- CRUD templates, protocolos, usuários, etc.: precisarão ser mapeados quando existir API REST (ex.: `routes/api.php` já tem `auth:sanctum` e rotas para protocols, templates). Payloads devem ser conferidos nos controllers Laravel antes de implementar no Angular.

---

## 6. Dependências e ajustes necessários

### Angular atual
- Angular 20, Tailwind 4, sem HttpClient no `app.config` (será necessário para integração).
- Estrutura mínima: apenas `AppComponent` e `routes` vazias.

### Ajustes
1. **Estilos globais** — Copiar variáveis CSS do Blade (`--c-primary`, `--c-bg`, temas, `.dark`) para `styles.css` ou ficheiro global no Angular.
2. **Fontes** — Inter + Material Symbols Outlined (links no `index.html`).
3. **Guards** — `AuthGuard` para rotas autenticadas; eventual `PlatformGuard` para área plataforma.
4. **Interceptors** — Envio de token (Bearer ou cookie) e tratamento de 401/403.
5. **Serviços** — `ServicoAutenticacao`, `ServicoTema`, `ServicoNotificacoes`, serviços por domínio (templates, protocolos, usuários, etc.).
6. **Ambiente** — `environment` com `apiUrl` para chamadas HTTP.

---

## 7. Estrutura de pastas proposta (Angular)

```
src/app/
  paginas/
    inicio/           # landing
    login/
    comece/
    termos/
    privacidade/
    dashboard/
    templates/
    links-publicos/
    protocolos/
    notificacoes/
    clinica/
    link-bio/
    usuarios/
    billing/
    plataforma/       # admin
    formulario-publico/
    erro/             # 404, 403, 500
  componentes/
    layout/
      barra-lateral/
      cabecalho/
      overlay-sidebar/
      layout-app/     # wrapper com sidebar + header + main
      layout-plataforma/
    ui/
      alerta/
      card/
      botao/
      badge/
  servicos/
  interfaces/
  modelos/
  guards/
  interceptors/
  compartilhado/
  constantes/
```

Cada página/componente: `.html`, `.ts`, `.css` separados; nomenclatura em português.

---

## 8. Resumo

- **Blade:** 2 layouts (app, platform), dezenas de views, componentes UI (alert, card, button, badge), temas CSS e dark mode.
- **Angular:** estrutura inicial vazia; será preenchida com layout fiel (sidebar, header), estilos globais, páginas públicas (landing, login, comece) e dashboard, depois demais telas e integração com API.
- **Payloads:** login, comece e demonstração identificados; demais devem seguir contratos dos controllers/API Laravel.
- **Load states:** todas as páginas que dependem de dados remotos terão `estadoCarregando`, `estadoErro`, `mensagemErro` e exibição de conteúdo quando `dadosCarregados`.

Este documento serve como referência para a Etapa 2 (planejamento da estrutura) e para as etapas seguintes de implementação e integração.
