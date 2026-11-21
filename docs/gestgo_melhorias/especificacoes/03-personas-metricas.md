> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 3. PERSONAS, JORNADAS E MÉTRICAS

## 3.1. ICP primário

**Profissional solo de estética ou odontologia** que já possui fichas próprias em papel ou PDF, precisa coletar preenchimento e assinatura, deseja manter o layout e prefere operação sem equipe administrativa.

## 3.2. ICP secundário (expansão)

Clínicas pequenas com recepção, vários profissionais e eventualmente unidades. Só abordar funcionalidades mais complexas conforme evidências de demanda e maior disposição de pagamento.

## 3.3. Jornada central desejada

1. Visitante entende em segundos que pode **usar sua ficha atual**.
2. Cria conta e seleciona especialidade (opcional, sem bloquear).
3. Importa um PDF original, ou escolhe modelo pronto.
4. O sistema detecta campos existentes e/ou oferece edição manual; o profissional confirma os mapeamentos.
5. Testa o PDF com dados fictícios.
6. Publica uma versão de template, gera link ou seleciona pessoa.
7. Envia pelo canal disponível (link/manual e-mail; WhatsApp oficial quando conectado).
8. Paciente preenche e assina, com o nível de segurança vigente.
9. PDF original preenchido e trilha documental são produzidos.
10. Profissional encontra, confere e reutiliza o fluxo em atendimentos futuros.

## 3.4. Métricas estratégicas

- **North Star sugerida:** organizações pagantes com pelo menos um protocolo concluído no período de 30 dias, acompanhada do volume de protocolos por organização (não é métrica existente confirmada).
- Tempo da importação até a **primeira ficha publicável**.
- Tempo e taxa de correção do mapeamento por tamanho/complexidade da ficha.
- Taxa de primeira ficha enviada e primeira ficha assinada no trial.
- Conversão visita → cadastro → primeira assinatura → pagante.
- Uso recorrente, churn por coorte, receita recorrente real, custo de suporte por cliente.
- WhatsApp: entregas confirmadas, erros, custo por envio, desativação/opt-out e impacto sobre conclusão.

**Guardrail:** nenhuma métrica analítica deve expor CPF, nome, respostas de saúde, imagens clínicas ou PDF em serviços externos de analytics.

---
