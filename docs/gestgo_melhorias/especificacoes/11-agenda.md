> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 11. EPIC AGD-07 — AGENDA E SERVIÇOS COMO GATILHOS

**Prioridade:** P2; usar o que já existe.

## 11.1. Escopo

- Inspecionar API e UI atuais de `/agenda`, `/a/:slug`, `/servicos` e vínculo `?a=`.
- Permitir associar pacote documental a um serviço agendável.
- Ao criar reserva, preparar pendências sem enviar dados indevidos antes da confirmação de disponibilidade/agendamento.
- Reagendamento/cancelamento precisa ajustar lembretes futuros de forma idempotente.
- Não substituir agenda clínica de terceiros; preferir integração quando disponível.
- Tratar fuso horário da organização e horário de envio de lembrete.

## 11.2. Fora de escopo

Otimização de agenda, repasse financeiro, prontuário, estoque, gestão de convênio e motor completo de calendário.

## 11.3. Critérios de aceite

- Agendamento criado gera vínculo documental quando configurado.
- Sem pacote, agenda continua como funciona hoje.
- Reagendamento não cria segundo pacote inadvertidamente.
- Alterar serviços não altera versões históricas dos fluxos documentais.

---
