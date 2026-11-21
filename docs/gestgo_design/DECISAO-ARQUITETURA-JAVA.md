# DECISÃO DE ARQUITETURA — JAVA COMO BACKEND CANÔNICO DO GESTGO

**Data:** 19/11/2026  
**Status:** DECIDIDO PELO PROPRIETÁRIO  
**Escopo:** novas funcionalidades de backend e preparação da migração de produção.

## Decisão

A API canônica escolhida para a evolução do Gestgo é `gestgo_api`, baseada em **Java 21 e Spring Boot 3.5**. O frontend permanece `zion_med_front` (Angular). A API antiga `zion_med` (Laravel 12) serve como **referência funcional para comparação e contingência temporária**, até que a paridade e o cutover sejam validados.

**Não inferir:** a decisão não significa que `api.gestgo.com.br` já esteja apontando para Java. Essa informação ainda deve ser verificada no ambiente operacional.

## Orientação ao Cursor

1. Ao implementar novas features de backend, trabalhar em `gestgo_api` e não criar código duplicado no Laravel.
2. Não assumir paridade funcional porque existe um endpoint com o mesmo nome nos dois backends.
3. Inspecionar endpoints, DTOs, mensagens de erro, autenticação sessão/CSRF, permissões/escopo da organização e comportamentos observáveis consumidos pelo Angular (`/api/v1`).
4. Conferir em especial o fluxo de PDF original: mapeamento de coordenadas, versão do template, renderização do PDF, assinatura, hash, snapshot, dossiê e download. Não portar FPDI automaticamente nem modificar PDFs históricos.
5. Auditar jobs/schedulers e webhooks dos dois stacks; garantir idempotência e evitar disparos em duplicidade durante a transição.
6. Migrar banco/infra/tráfego apenas em plano separado com dados sintéticos em homologação, testes E2E, backup, rollback e aprovação explícita.
7. Melhorias puramente do editor Angular podem evoluir antes do cutover, desde que compatíveis com a API que estiver recebendo o tráfego e com o formato de documentos armazenado.

## Critérios de conclusão do cutover

- Contratos `/api/v1` e fluxos críticos testados em Java.
- Isolamento multi-tenant/RBAC verificado.
- PDFs de origem e evidências reproduzidos com correção.
- Billing, OTP, webhooks, filas e notificações executados sem duplicidade.
- Métricas/alertas em produção e roteiro de rollback documentados.
- Aprovação expressa do proprietário antes de alterar roteamento ou desativar Laravel.

## Fontes internas

- `raiox.md`: retrato dos repositórios em 19/11/2026, sem acesso ao runtime produtivo.
- `GESTGO-PLANO-MESTRE-EVOLUCAO.md`, especialmente seções 2, 15, 21–23.
