> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 6. EPIC DOC-02 — CONFIABILIDADE DO DOCUMENTO FINAL

**Prioridade:** P0; pré-requisito para prometer automação inteligente.

## 6.1. Objetivo

Garantir que o PDF produzido mantenha o documento de origem e apresente dados, seleções, imagens e assinaturas sem cortes, deslocamento ou perda de evidências.

## 6.2. Escopo funcional

- Catálogo de PDFs de regressão **sintéticos**, cobrindo A4/Carta, 1–10+ páginas, digital/escaneado, rotação, texto longo, caixa de seleção, assinatura, caracteres brasileiros e PDFs com fontes incomuns.
- Comparação visual automatizada do PDF preenchido em homologação; tolerâncias documentadas para variações de rasterização.
- Diagnóstico de overflow de texto, tamanho mínimo, linhas quebradas, assinatura cortada e campos extrapolados.
- Tratamento de erros assíncronos: `pending`, `completed`, `failed` existentes (usar estados reais), retry controlado e identificação do job.
- Comprovação de que metadados, snapshots, SHA-256, protocolo e dossiê seguem o contrato atual.
- Testes para garantir que publicação de nova versão NÃO altera protocolos históricos.

## 6.3. Critérios de aceite

- Mesma entrada e mesma versão geram saída visualmente estável (desconsideradas evidências variáveis esperadas, como timestamps), com tolerâncias definidas.
- PDF original permanece recuperável conforme política existente.
- Qualquer falha de geração é observável e não exibe documento incompleto como “finalizado”.
- Nenhum teste usa dados de pacientes reais.

---
