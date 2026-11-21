> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 14. EPIC INT-10 — INTEGRAÇÕES E API DE PARCEIROS

**Prioridade:** P2/P3.  
**Estado:** Feegow com implementação encontrada; outros PMS parciais e ocultos; outbound webhooks e tokens de API existentes.

## 14.1. Estratégia

O Gestgo não deve exigir que a clínica troque seu software atual. Sua função é orquestrar documentação e devolver status e documentos de forma segura para a ferramenta já usada.

## 14.2. Integração incremental

- Selecionar **um** parceiro a partir dos sistemas efetivamente usados pelos clientes pagantes.
- Definir caso de uso mínimo: criar/vincular pessoa, vincular agendamento, disparar/recuperar link documental, receber status concluído.
- Definir fonte de verdade por campo: paciente, agendamento, serviço, situação documental.
- Segurança: OAuth/API key conforme provedor, criptografia, RBAC, escopo e consentimento; sem expor campos clínicos indiscriminadamente.
- Deduplicação de pessoas/agendamentos, tratamento de conflito, reconciliação e retries.
- Webhooks assinados/verificáveis, idempotentes, versionados e com logs mínimos.
- Uma “integração real” precisa ter fluxo E2E validado em homologação e piloto antes de ficar visível a todos.

## 14.3. Webhooks e API pública do Gestgo

- Auditar contratos já existentes de webhooks/tokens/conector antes de mexer.
- Definir eventos de domínio estáveis (`document.requested`, `document.completed`, `document.expired`, `document.revoked`) apenas se compatíveis com contratos reais e necessários.
- Payload mínimo: IDs, timestamps, status, versão de schema e URL segura para consultar detalhes autorizados; evitar incluir respostas sensíveis por default.
- Rotação de secrets, replay protection, assinatura, tentativas e dead-letter.
- OpenAPI, exemplos e sandbox de testes para parceiros — após validação do primeiro caso real.

## 14.4. Critérios de aceite

- Indisponibilidade do parceiro não impede a clínica de usar o fluxo documental manual.
- Sincronização é observável e pode ser reprocessada sem duplicar eventos.
- Respeita organização, autorização e LGPD.
- Habilitação comercial acontece por parceiro validado, não por existência de endpoints.

---
