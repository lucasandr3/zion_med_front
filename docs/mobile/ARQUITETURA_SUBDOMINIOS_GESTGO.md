# Gestgo — arquitetura de subdomínios e checklist de implantação

**Versão:** 1.0 — 13/11/2026  
**Status:** proposta para implementação; **não representa infraestrutura já configurada**.  
**Documentos relacionados:** `GESTGO_MOBILE_ESPECIFICACAO_CURSOR.md` e `PROMPT_PRONTO_PARA_CURSOR.md`.

## 1. Decisão aprovada de produto

| Endereço | Experiência | Escopo |
|---|---|---|
| `https://gestgo.com.br` | Site público | Marketing, planos, cadastro e entrada para o sistema |
| `https://painel.gestgo.com.br` | Gestgo completo | Administração, criação/edição de fichas, configurações e demais funções existentes |
| `https://app.gestgo.com.br` | Gestgo Mobile | Interface própria com Início, Pacientes, Fichas e Ferramentas |

**Premissa:** mesmos usuários, assinaturas, tenants, regras de negócio, documentos e banco de dados. Duas experiências de front-end, **não dois produtos com persistência e lógica duplicadas**. O endereço `app` não obriga a criação de aplicativo nativo.

## 2. Comportamento de entrada e navegação

1. O CTA **Entrar** no site público pode recomendar o destino pela largura da janela: mobile → `app`; desktop → `painel`. A escolha é uma **preferência de UX**, não uma regra de segurança.
2. Oferecer sempre links visíveis de **Abrir app** e **Abrir painel completo**, independente do dispositivo. Se houver escolha explícita, respeitá-la (por exemplo, por preferência local, quando apropriado).
3. Quem abrir diretamente `app.gestgo.com.br` deve poder utilizar a experiência mobile mesmo em um computador. Quem abrir `painel.gestgo.com.br` no celular deve poder acessar o painel, dentro de suas limitações responsivas; **não forçar redirecionamento pelo user-agent**.
4. Após autenticar, voltar à experiência e à rota originalmente solicitadas, se autorizadas. Usar retorno somente para hosts/rotas permitidos; **não aceitar `returnUrl` arbitrária**.
5. Disponibilizar **Abrir painel completo** no menu do app e, se útil, **Abrir Gestgo Mobile** no painel. Não criar loops de redirecionamento.
6. Permanência de sessão não deve depender da aba aberta, e trocas entre hosts devem ser testadas. Em caso de sessão expirada, solicitar autenticação sem expor dados.
7. **Nunca mover por redirecionamento automático** links públicos de anamnese, formulários, consentimentos, convites, evidências e assinatura sem levantamento e compatibilidade dos fluxos existentes.

Fluxo conceitual:

```text
https://gestgo.com.br  (site público)
        │
        ├── Entrar no painel → https://painel.gestgo.com.br
        └── Abrir app       → https://app.gestgo.com.br
                                   │
                   Autenticação/SSO + autorização do Gestgo
                                   │
                      Backend/API e banco de dados atuais
```

## 3. Organização do código: decisão após inspeção do repositório

O Cursor deve comparar estas opções, escolher a de **menor mudança compatível com a stack atual** e justificar:

- **Mesmo frontend com duas entradas por hostname**: útil quando framework, servidor e build atuais permitirem composição clara de layouts/rotas sem duplicar código.
- **Dois frontends no mesmo monorepo**: considerar apenas se a separação de builds/deploys melhorar manutenção e se componentes, contratos e serviços puderem ser realmente compartilhados.

**Evitar:** duplicar regras de negócio, autenticação, APIs, models, estado de domínio ou lógica de assinatura; migrar banco só para habilitar subdomínios; copiar HTML do protótipo como base de produção.

Antes de implementar, levantar os domínios atuais, hosts legados, localização do login, URLs de callback, rotas públicas e internas, infraestrutura de deploy e mecanismo de gerenciamento de sessões.

## 4. Autenticação e segurança entre subdomínios

A solução exata depende do stack atual. Não pressupor que login em um host autentique automaticamente outro.

- **Preferência:** reutilizar provedor de autenticação/SSO existente, com redirecionamentos e callbacks estritamente permitidos; avaliar sessão compartilhada somente se a arquitetura atual a suportar com segurança.
- **Cookies:** usar `Secure`, `HttpOnly`, `SameSite` e `Path` apropriados; optar pelo menor `Domain` possível. **Não** ampliar automaticamente cookies para `.gestgo.com.br` sem análise de ameaças/necessidade. Cookies host-only podem exigir um fluxo de login compartilhado/SSO.
- **Cross-origin:** `painel.gestgo.com.br`, `app.gestgo.com.br` e qualquer domínio de API são origens diferentes. Se houver CORS, permitir apenas origens exatas necessárias; nunca `Access-Control-Allow-Origin: *` combinado com credenciais. Revisar CSRF, headers, CSP, cache e preflight.
- **Isolamento por tenant:** autorização sempre no backend; tela mobile jamais pode acessar dados de outra clínica/organização. Respeitar permissões e plano ativo para ambas as experiências.
- **Logout e expiração:** definir o comportamento consistente entre ambos os hosts e testar logout/login cruzados; não depender de `localStorage` compartilhado (é isolado por origem).
- **Dados sensíveis:** não colocar dados clínicos ou identificadores sensíveis em analytics, querystrings, notificações, erros e logs; documentos e assinaturas mantêm requisitos de rastreabilidade existentes.

## 5. Infraestrutura e configuração

**Não mudar DNS ou produção antes de confirmar ambiente e fazer homologação.**

- Provisionar registros DNS apenas após decidir topologia real (CNAME/A/AAAA conforme provedor) para `painel` e `app`.
- Certificados TLS válidos para ambos os hosts, HTTPS obrigatório, renovação automática, HSTS quando adequado.
- Configurar proxy/hosting para entregar a experiência correta por hostname, com fallback de rotas SPA/SSR conforme framework.
- Revisar variáveis de ambiente, URL pública, API base URL, domínio de cookie se aplicável, CORS, CSP, CSRF, CSP `connect-src`, callback/login/logout, WebSocket e uploads.
- Revisar integrações que guardam URLs absolutas (e-mail, WhatsApp, links de assinatura, webhooks, deep links, pagamentos, serviços de autenticação, QR Codes).
- Manter as URLs públicas existentes estáveis; se for necessário migrar URLs do painel antigo, usar redirecionamentos mapeados e testados, **sem presumir quais são as URLs antigas**.
- Adicionar monitoramento/health check para os dois hosts. Área autenticada não deve ser indexada (`noindex`, comportamento de robots aplicável).
- PWA é fase futura; se ativado, manifest, ícone, service worker e escopo devem ser restritos a `app.gestgo.com.br`, sem cachear documentos sensíveis de forma insegura.

## 6. Plano de entrega gradual (sem interrupção)

**Fase 0 — Descoberta:** listar arquitetura atual, domínios/rotas/callbacks, login, tenants, APIs e plano de rollback. Entregar proposta de roteamento por host e riscos antes de editar infraestrutura.

**Fase 1 — Homologação:** publicar as duas experiências em hosts de staging equivalentes (nomes reais conforme infraestrutura, não inventados), com dados de teste e usuário autorizado. Validar auth, troca de host, links públicos, uploads, formulários, assinaturas e regressão desktop.

**Fase 2 — Produção controlada:** ativar `app` gradualmente para equipe/pequeno grupo; **manter o endereço atual do painel acessível** até validar migração de URLs/integrações. A migração de `painel` deve ser planejada e reversível.

**Fase 3 — Entrada inteligente:** alterar CTA Entrar do site para sugerir app/painel conforme viewport, sempre permitindo troca manual. Monitorar erros de sessão, entrega de formulários e assinatura.

**Rollback:** restaurar roteamento/DNS/configuração anterior, desabilitar redirecionamento de entrada e preservar o acesso ao sistema atual sem perda de dados; verificar TTLs e propagação antes do rollout.

## 7. Matriz obrigatória de testes

| Cenário | Resultado esperado |
|---|---|
| Site em tela pequena → Entrar | Recomenda `app`, mas oferece escolha manual |
| Site em tela grande → Entrar | Recomenda `painel`, mas oferece escolha manual |
| Abrir `app` no desktop | Não redireciona obrigatoriamente para `painel` |
| Abrir `painel` no celular | Não redireciona obrigatoriamente para `app` |
| Sair do app e entrar no painel | Sessão/autorização coerentes com auth existente |
| Sair da conta | Logout/expiração válidos conforme estratégia aprovada |
| Enviar ficha no app | Usa dados, link e evidências reais do backend |
| Abrir convite/termo assinado antigo | Link existente continua válido ou tem migração compatível |
| Tenant A tenta acessar documento do tenant B | Acesso negado pelo servidor |
| Sessão expirada/callback inválido | Falha segura, sem redirecionamento aberto ou loop |
| Trocar versão manualmente | Navegação previsível, sem perder organização autorizada |
| App em 320/360/390/430 px | Sem rolagem horizontal e com navegação por toque |
| Deploy ou rollback | O painel atual e as rotas públicas críticas continuam acessíveis |

## 8. Critérios de aceite arquiteturais

- [ ] `gestgo.com.br` permanece site público.
- [ ] `painel.gestgo.com.br` disponibiliza o sistema completo, sem regressão funcional.
- [ ] `app.gestgo.com.br` entrega a interface mobile própria.
- [ ] Mesmos usuários, assinaturas, permissões, tenants e dados; backend compartilhado.
- [ ] Entrada recomenda versão por tamanho de tela, **sem imposição de redirecionamento**.
- [ ] É possível trocar manualmente de versão.
- [ ] Login, logout, expiração, CSRF/CORS e callbacks aprovados para ambas as origens.
- [ ] Links públicos antigos, documentos e assinaturas não quebram.
- [ ] Deploy possui staging, smoke tests, monitoramento e rollback.
- [ ] Não existem contas duplicadas, migrações desnecessárias ou dados fictícios em produção.

**Regra de ouro:** separar a **experiência** por subdomínio, não duplicar o **produto**.
