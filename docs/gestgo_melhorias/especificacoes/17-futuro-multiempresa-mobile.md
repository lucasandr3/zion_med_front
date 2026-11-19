> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 17. EPIC FUT-13 — EXPANSÕES CONDICIONAIS

Essas frentes foram mencionadas nas conversas, mas **não devem ultrapassar o core sem evidência de adoção e receita**.

## 17.1. Multiempresa e redes

- Estrutura de tenant/organization já existe, mas habilitação comercial está parcial.
- Finalizar limites, isolamento, faturamento, seleção de organização e papéis antes de lançar.
- Testar cobrança de ticket maior com clientes que efetivamente gerenciem mais de uma unidade.

## 17.2. Mobile `/m`

- Shell/rotas existem; feature flag produção está desligada no snapshot.
- Só lançar após verificar experiência do público solo e custos de manutenção; priorizar responsividade das telas centrais antes de um novo conjunto de interfaces.

## 17.3. Utilitários

- Orçamentos, mensagens, retornos, preços, cartões, checklists, pacotes e estoque possuem UI e módulo Java, com homolog habilitada segundo proprietário.
- Não chamar de “novos módulos”; primeiro medir utilização, identificar lacunas de backend produtivo e evitar confundir o posicionamento principal.

## 17.4. Go Assistant com LLM

- Assistente sem LLM existe; adapter LLM está desligado.
- Testar casos com valor claro: ajuda contextual em mapeamento, explicação de erro e navegação. Não usar IA para dar orientação clínica ou validar suficiência jurídica de documentos.

## 17.5. Planos e white-label

- Multiempresa, permissões e templates podem apoiar oferta para redes e parceiros, mas isso exigirá ativação, suporte, segurança e preço diferentes do público solo.
- White-label não deve ser prioridade sem contrato piloto e cálculo de custo operacional.

---
