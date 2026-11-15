# Prompt para colar no Cursor — Gestgo Mobile + subdomínios

**Versão:** 1.1 — 13/11/2026

Abra o **Cursor Agent** no repositório real do Gestgo e forneça estes arquivos como contexto:

- `GESTGO_MOBILE_ESPECIFICACAO_CURSOR.md` — requisitos funcionais e critérios de aceite;
- `ARQUITETURA_SUBDOMINIOS_GESTGO.md` — arquitetura, autenticação, rollout e checklist;
- `gestgo_mobile_prototipo_v2.html` — **referência visual e de comportamento apenas**, com dados fictícios.

---

## PROMPT

Quero implementar no Gestgo **dois pontos de entrada para o mesmo SaaS**, com uma experiência mobile realmente diferente da interface administrativa, respeitando integralmente os dois documentos Markdown anexos.

### Endereços desejados

- `https://gestgo.com.br`: site institucional existente (marketing, planos e entrada).
- `https://painel.gestgo.com.br`: **sistema completo**, preservando funcionalidades e fluxos atuais.
- `https://app.gestgo.com.br`: **Gestgo Mobile**, interface dedicada com quatro abas: Início, Pacientes, Fichas e Ferramentas.

**Não crie** um produto independente, novo banco ou usuários duplicados. Os dois hosts precisam reutilizar o **backend, autenticação, planos, tenant, regras de negócio, modelos, pacientes, documentos e assinaturas** atuais. Compartilhe módulos, serviços e componentes conforme a stack permitir.

### Comportamento de entrada

1. No botão **Entrar** do site, sugerir `app` para telas pequenas e `painel` para telas grandes, sempre disponibilizando escolha manual.
2. Acesso direto a `app` deve manter a experiência mobile mesmo no computador; acesso direto a `painel` deve manter a experiência completa mesmo no celular. **Não forçar redirect por user-agent, viewport ou escolha anterior.**
3. No menu do app, incluir **Abrir painel completo**; permitir acesso à versão mobile a partir do painel quando apropriado.
4. Manter o destino solicitado após login (somente hosts/rotas confiáveis) e testar expiração, troca de host e logout. Evitar open redirects e loops.
5. Preservar os **links públicos existentes** de fichas, convites, formulários, assinatura e evidências. Não migrar ou redirecionar esses links sem mapear os URLs atuais.

### Regras inegociáveis do Gestgo Mobile

1. **Início contém apenas funcionalidades do Gestgo**: enviar ficha, resumo/documentos, pacientes, modelos, pendências e assinaturas. Não mostrar calculadora, orçamento, mensagens, estoque, pacotes ou outros utilitários nessa tela.
2. **Ferramentas extras aparecem somente no menu Ferramentas**, separado do fluxo documental. Priorizar **Preço e lucro**, **Orçamento rápido** e **Mensagens prontas**; outras ferramentas podem permanecer planejadas ou com estado explícito “Em breve”, de acordo com a especificação.
3. As abas do mobile são: **Início, Pacientes, Fichas, Ferramentas**, com navegação inferior segura e responsiva.
4. Envio de fichas, consulta de pacientes, assinaturas e indicadores precisam usar **dados e APIs reais**; não copiar os pacientes ou números fictícios do HTML.
5. Preservar completamente o sistema do desktop, as evidências das assinaturas, as permissões, o isolamento multi-tenant e as políticas de segurança existentes.

### Segurança entre subdomínios

Antes de implementar login compartilhado, **identifique o mecanismo de autenticação já utilizado**. Avalie sessão/SSO, callbacks, cookies host-only versus cookie compartilhado, CORS, CSRF, CSP, logout e permissões. Não presuma que `localStorage` é compartilhado, não amplie cookies para `.gestgo.com.br` por conveniência, não habilite CORS amplo com credenciais e não invente endpoints.

### Sequência obrigatória de trabalho

**Etapa 0 — Diagnóstico sem mudanças destrutivas:**

- Inspecione a stack, organização de frontends, arquivos de rotas, domínio atual do painel, processo de login/logout, sessões, endpoints, tenants, deploy e URLs públicas.
- Mostre um plano curto de implementação com arquivos prováveis, estratégia para os dois hosts, riscos de auth/links e rollback.
- Se a implantação exigir DNS, certificados ou segredos não disponíveis no repositório, **documente as ações manuais necessárias sem fingir que estão configuradas**.

**Etapa 1 — Arquitetura e navegação:**

- Implemente a divisão por hostname com a **menor alteração compatível com o repositório**, sem duplicação de regras ou migração desnecessária de banco.
- Faça o site recomendar a experiência adequada ao clicar em Entrar, com opção explícita de alternar.
- Implemente no host `app` o layout mobile com navegação inferior e no host `painel` o sistema completo preservado.
- Integre home, pacientes, fichas, envios, pendências e assinaturas a serviços reais; trate estados de loading, vazio, erro e falta de permissão.

**Etapa 2 — Ferramentas:**

- Mantenha exclusivamente a aba Ferramentas como local de acesso aos utilitários novos.
- Implemente de forma enxuta as ferramentas Fase A especificadas, com validação, feedback, cópia/compartilhamento por ação explícita e sem alegar persistência inexistente.
- Registre quais ferramentas estão “Em breve” e mantenha recursos não implementados sem falsa funcionalidade.

**Etapa 3 — Homologação e entrega:**

- Teste acessos diretos nos dois hosts, fluxo Entrar do site, troca manual, login, logout, expiração, callback inválido, links antigos de fichas/assinaturas, multi-tenant e desktop.
- Teste em 320/360/390/430 px e capture telas a 390 × 844.
- Verifique DNS, TLS, callbacks, cabeçalhos, CORS, CSRF, monitoramento e rollback. **Não altere DNS ou segredos de produção sem autorização/configuração apropriada.**
- Entregue lista de arquivos modificados, links/rotas efetivamente encontrados, testes executados, riscos restantes e o que falta de infraestrutura.

### Critérios de aceite essenciais

- `gestgo.com.br` continua o site; `painel.gestgo.com.br` é o sistema completo; `app.gestgo.com.br` é a experiência mobile.
- Mesma conta, assinatura, backend e dados; controles de autorização continuam no servidor.
- Acesso direto a qualquer host não é forçado para o outro, e há troca manual entre versões.
- A home do app exibe **somente recursos nativos do Gestgo**; extras somente em **Ferramentas**.
- Envio de ficha e consulta de assinaturas reais funcionam; links públicos existentes permanecem íntegros.
- Desktop sem regressões, sem vazamento de dados de outros tenants, sem mock em produção.
- Plano de deploy gradual e rollback definido e testado antes de migração de endereços.

**Importante:** adapte o protótipo aos padrões do projeto atual. **Não** copie sua arquitetura/fixtures para produção, não faça refatorações amplas sem necessidade e não considere DNS ou SSL implantados apenas porque o código contempla os hosts.

---

**Resultado esperado:** o Gestgo continua um único SaaS, com dois frontends por subdomínio e uma experiência mobile dedicada, segura e fácil de usar.
