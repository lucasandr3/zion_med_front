> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 5. EPIC PDF-01 — MAPEADOR INTELIGENTE DE PDF

**Prioridade:** P0/P1 (manual primeiro, IA depois).  
**Status base:** mapeamento manual existe; importação IA de fichas e geração de PDF a partir de PDF original existem. Posicionamento automático não confirmado.  
**Persona:** profissional que dispõe de ficha em papel/PDF e quer digitalizá-la sem recriar o layout.  
**Resultado de negócio:** reduzir tempo até publicação, erros de posicionamento, abandono do onboarding e tickets de suporte.

## 5.1. Definição do problema

Atualmente, o profissional posiciona manualmente campos no documento. A ficha pode ter poucos ou muitos campos e várias páginas. Quanto mais extensa, maior o esforço e a chance de erro. É necessário elevar produtividade sem retirar controle do usuário.

## 5.2. Princípio de experiência

**Importar → Detectar (opcional) → Revisar → Pré-visualizar → Publicar.** A detecção não poderá impedir o mapeamento manual nem modificar o documento original armazenado.

## 5.3. Recursos — etapa A, produtividade manual

**PDF-01A.1 — Editor responsivo com zoom e pan**
- Zoom controlado (ex.: ajustar à página, largura, 100%, 150%, 200%), preservando coordenadas no PDF e na viewport.
- Navegação por páginas (miniaturas + página atual), indicadores de campos por página.
- Evitar perda de seleção/posição em resize, zoom e mudanças de orientação.

**PDF-01A.2 — Manipulação precisa de campos**
- Arrastar/soltar, redimensionar com alças, movimentar por teclas de seta, snap configurável, guias, alinhamento e distribuição.
- Duplicar campo mantendo tipo/estilo/regras; ao duplicar, gerar ID único e não referenciar indevidamente mesmo valor de negócio.
- Copiar/colar, selecionar múltiplos, mover em lote, exclusão com confirmação apropriada.
- Desfazer/refazer no editor sem depender de múltiplas chamadas HTTP por pixel movimentado.
- Lista lateral acessível com filtro por página, tipo, nome e estado de mapeamento.
- Comandos de teclado documentados e compatíveis com foco/accessibilidade.

**PDF-01A.3 — Validação e simulação**
- Prévia **do PDF final real** utilizando dados fictícios/sintéticos: nome, data, checkbox, assinatura simulada com indicação de prévia.
- Validar campo fora da página, valores sobrepostos, dimensões mínimas, mapeamento duplicado incoerente, font size/overflow e páginas sem mapeamento esperado.
- Indicar claramente warnings versus erros impeditivos; não bloquear publicação por detecções probabilísticas.

**PDF-01A.4 — Salvamento e resilência**
- Autosave de rascunho com debounce, sinalização de estado e recuperação após falha/reload.
- Controle de concorrência otimista para evitar overwrite quando duas abas editam mesmo modelo.
- Publicação atômica com snapshot; edição de modelo publicado cria nova versão conforme contrato atual.

## 5.4. Recursos — etapa B, detecção não-LLM

1. Inspecionar PDF: páginas, tamanho, rotação, caixas de página, texto, anotações e campos AcroForm existentes.
2. Priorizar extração **determinística** quando PDF for digital e possuir widgets ou estrutura aproveitável.
3. Gerar sugestões de caixas de entrada perto de labels, linhas em branco, checkboxes e assinaturas, identificando confidência/ambiguidade.
4. Manter suporte a PDFs escaneados: sem texto pesquisável, informar claramente que o modo automático pode requerer OCR/visão (etapa C).
5. Não inventar campos; manter sugestões distinguíveis de campos aprovados.

## 5.5. Recursos — etapa C, IA para posicionamento

### Input

PDF **em branco** fornecido pela organização; páginas rasterizadas para análise quando necessário; eventual texto extraído; metadados de dimensões/rotação; tipos suportados pelo editor. **Não usar documentos preenchidos com dados de pacientes como treinamento nem como input externo por padrão.**

### Output — contrato lógico proposto, adaptar ao schema existente

```json
{
  "document_id": "example",
  "version": 1,
  "pages": [
    {
      "page": 1,
      "page_width": 595,
      "page_height": 842,
      "rotation": 0,
      "suggestions": [
        {
          "temporary_id": "sug-001",
          "label": "Nome completo",
          "field_type": "text",
          "semantic_key": "person.full_name",
          "bounding_box_normalized": { "x": 0.13, "y": 0.19, "w": 0.70, "h": 0.035 },
          "confidence": 0.92,
          "source": "pdf_text_or_vision",
          "needs_review": true
        }
      ]
    }
  ]
}
```

**AVISO:** contrato acima é ilustrativo. **Não criar endpoints, tabelas ou nomes de campo antes de identificar os contratos usados no editor e na API atual.** Manter versão do schema e adaptadores para compatibilidade.

### Normalização de coordenadas

- Definir uma convenção canônica, por exemplo caixa normalizada de 0 a 1 no sistema de coordenadas da página visual já considerando rotação. **O Cursor deve verificar o sistema existente antes de escolher.**
- Conversões PDF ↔ viewport devem considerar origem superior/inferior, crop box, media box, rotação de 0/90/180/270°, fator de escala, densidade e margens.
- Persistir coordenadas compatíveis com `SourcePdfFillService`; nunca converter duas vezes.
- Campos precisam permanecer dentro do limite de suas páginas e manter estabilidade entre zooms.
- Testar PDFs A4, Carta, paisagem, rotacionados, páginas com dimensões variadas e documentos escaneados.

### Segurança/privacidade e custo

- Processamento assistido deve ser **opt-in**, configurável por organização/plano e com fallback manual.
- Antes de enviar um PDF a um provedor de IA, validar finalidade, tratamento contratual, retenção, transferências e base legal pertinente; registrar provedor e versão do modelo.
- Evitar conteúdo clínico identificável em prompts e logs; redigir ou bloquear entradas sensíveis que não sejam fichas em branco.
- Processamento assíncrono, limites por arquivo/página, tempo máximo, cancelamento, custo estimado/real por importação e rate limit por organização.
- Não armazenar imagens intermediárias além da retenção definida; não expor URLs MinIO a terceiros sem controle.

### UX de revisão

- Campos sugeridos com cor/estado distintos (`sugerido`, `aprovado`, `editado`, `rejeitado`).
- Aceitar/rejeitar individualmente e por página; oferecer revisão geral antes de publicar.
- Detectar sobreposição e campos duplicados; permitir renomear e mapear para um campo já existente do formulário.
- Preferir **detecção como ferramenta assistiva**, não um fluxo que altera o modelo sozinho.

## 5.6. Reutilização de mapeamento entre versões

- Quando clínica enviar revisão da própria ficha, propor reaproveitar mapeamento da versão anterior **somente** após verificar páginas/dimensões/layout e exibir comparação visual.
- Não mover silenciosamente campos se dimensões ou posições divergem.
- Criar nova versão do template; protocolos assinados continuam apontando ao snapshot histórico.
- Para alterações pequenas, sugerir quais campos permaneceram consistentes e quais precisam de inspeção.

## 5.7. Regras de negócio

- O PDF original não deve sofrer alteração destrutiva.
- A escolha final do campo, tipo, obrigatoriedade e localização é do profissional.
- Cada campo de formulário deve ter ID estável e posição por versão/documento.
- Alterações em documentos publicados não podem reprocessar PDFs/protocolos históricos.
- O motor de assinatura e OTP permanece inalterado; a prévia não cria assinatura válida.
- Quem não quiser IA pode configurar tudo manualmente e receber experiência equivalente.

## 5.8. Critérios de aceite (Gherkin simplificado)

- **CA01:** dado um PDF digital de duas páginas, quando importado, a interface permite navegação por página e mapeamento sem desalinhamento em zoom diferente.
- **CA02:** ao duplicar um campo, o sistema cria uma nova instância selecionável com identidade única.
- **CA03:** usuário consegue desfazer/refazer movimentação, tamanho e criação sem corromper o rascunho.
- **CA04:** prévia mostra o PDF com dados sintéticos e indica quando o valor será cortado.
- **CA05:** uma detecção parcial não bloqueia edição manual.
- **CA06:** sugestões de IA não são publicadas sem revisão explícita.
- **CA07:** PDFs anteriores assinados permanecem byte-a-byte ou semanticamente íntegros conforme a política existente de armazenamento e hash.
- **CA08:** testes cobrem rotação, páginas múltiplas e assinatura em página final.
- **CA09:** falha no job de detecção não causa perda do modelo ou do PDF original.
- **CA10:** um usuário não consegue consultar ou aprovar sugestões de outra organização.

## 5.9. Métricas e metas de experimento

- Tempo de configuração em fichas de 5, 20 e 50+ campos, comparando baseline versus evolução.
- Percentual de sugestões aceitas sem mover/redimensionar; correções por página; custo e latência por PDF.
- Incidentes de desalinhamento após publicação; tickets sobre importação; taxa de primeira ficha publicada.
- **Meta experimental (não garantia):** buscar queda de 50% no tempo mediano das fichas complexas, sem aumento da taxa de erro documental.

## 5.10. Sequência de entrega sugerida

`PDF-01A` melhorias manuais → testes de regressão → `PDF-01B` extração determinística → teste com PDFs sintéticos e consentidos → `PDF-01C` IA + revisão → rollout gradual → `PDF-01D` reaproveitamento de mapeamento.

---
