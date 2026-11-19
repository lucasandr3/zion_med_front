> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 9. EPIC PAC-05 — PACIENTES RECORRENTES, PREFILL E REVALIDAÇÃO

**Prioridade:** P1/P2.  
**Base existente:** Pessoas, histórico, `Prefill Person`, reconsentimento e versões já existem.

## 9.1. Caso de uso

O paciente retorna para outra sessão ou procedimento. A clínica precisa preencher menos campos, mas confirmar que dados relevantes continuam corretos e colher novo consentimento quando o documento, procedimento ou política da clínica exigir.

## 9.2. Especificação

- Ação “Novo documento para paciente existente” com seleção do modelo e opção de recuperar dados permitidos.
- Mostrar campos com dados pré-existentes, origem e data da última confirmação quando disponíveis.
- Permitir que paciente revise/atualize informações; preservar histórico e autoria da alteração.
- Reusar somente campos compatíveis; campos específicos do procedimento não devem ser presumidos.
- A clínica escolhe política configurável de atualização por modelo/procedimento; não alegar validade jurídica universal (ex.: “todos os consentimentos vencem em 12 meses”).
- Reconsentimento **novo registro e nova versão**; nunca editar o PDF assinado.
- Respeitar revogação e consentimentos específicos de autorização de imagens.

## 9.3. Critérios de aceite

- Novo atendimento não altera protocolo anterior.
- Dados de uma organização nunca aparecem em outra.
- O paciente pode corrigir dados previamente preenchidos, com trilha adequada.
- Preferências de prefill/retenção são configuráveis e revisadas sob LGPD.
- Mudança de template não reusa dado incompatível silenciosamente.

---
