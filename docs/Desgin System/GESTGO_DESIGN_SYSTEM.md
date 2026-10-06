# Gestgo Design System

**Versão 1.0 --- Fonte de verdade visual para site e aplicação**

## 1. Direção

Gestgo deve parecer um SaaS B2B moderno, confiável, técnico e limpo. A
interface deve privilegiar hierarquia, legibilidade e densidade
intermediária.

**Princípio central:** verde representa marca, ação, seleção e sucesso.
Não é cor decorativa para grandes superfícies.

Não alterar regras de negócio, rotas, APIs, permissões ou fluxos ao
aplicar este Design System.

------------------------------------------------------------------------

## 2. Marca

  Token         HEX         Uso
  ------------- ----------- ----------------------------------
  `brand-900`   `#063D36`   Institucional / fundos especiais
  `brand-700`   `#087D64`   Links e estados ativos
  `brand-500`   `#14B87A`   CTA principal
  `brand-400`   `#20C989`   Hover/destaques
  `brand-100`   `#CFEDE1`   Superfície verde suave
  `brand-50`    `#EAF7F2`   Seleção suave

Gradiente do símbolo: `#063D36 → #14B87A`.

------------------------------------------------------------------------

## 3. Tema claro

  Token                 HEX
  --------------------- -----------
  `background`          `#F8FAF6`
  `surface-primary`     `#FFFFFF`
  `surface-secondary`   `#F3F5F4`
  `surface-tertiary`    `#ECEFED`
  `text-primary`        `#17201F`
  `text-secondary`      `#56635F`
  `text-muted`          `#7B8783`
  `text-disabled`       `#A4ACA9`
  `border-subtle`       `#E9EFEC`
  `border-default`      `#DDE5E1`
  `border-strong`       `#C8D1CD`
  `hover-neutral`       `#F1F4F2`
  `active-neutral`      `#E8EDEB`

------------------------------------------------------------------------

## 4. Tema escuro

O dark mode é **preto/grafite neutro**. Não usar preto esverdeado nas
superfícies estruturais.

  Token                 HEX
  --------------------- -----------
  `background`          `#0D0D0D`
  `sidebar`             `#111111`
  `surface-primary`     `#171717`
  `surface-secondary`   `#1C1C1C`
  `surface-tertiary`    `#222222`
  `surface-elevated`    `#262626`
  `text-primary`        `#F2F2F2`
  `text-secondary`      `#B4B4B4`
  `text-muted`          `#858585`
  `text-disabled`       `#5F5F5F`
  `border-subtle`       `#242424`
  `border-default`      `#303030`
  `border-strong`       `#404040`
  `hover-neutral`       `#222222`
  `active-neutral`      `#292929`

------------------------------------------------------------------------

## 5. Cor da organização

A personalização do cliente não substitui o Design System.

Tokens: - `tenant-primary` - `tenant-hover` - `tenant-soft` -
`tenant-contrast`

Pode afetar CTA, links ativos, focus, pequenos indicadores e o header
quando **Topo com marca** estiver habilitado.

Não deve alterar background geral, cards, modais, tabelas ou transformar
a sidebar numa versão escura da cor escolhida.

------------------------------------------------------------------------

## 6. Navegação

### Neutra

**Light:** sidebar `#FFFFFF`, header `#FFFFFF`.\
**Dark:** sidebar/header `#111111`.

### Topo com marca

Header recebe `tenant-primary` (ou `brand-900` no Gestgo) e texto
branco. Sidebar permanece neutra.

### Menu escuro

Sidebar sempre `#111111`, independentemente da cor da organização. A cor
configurável aparece no item/ícone ativo.

Sidebar desktop: `240–256px`.\
Header: `56–64px`.\
Item de menu: mínimo `40px`, radius `8px`, padding `8px 10px`.

------------------------------------------------------------------------

## 7. Tipografia

Fonte: **Inter**, com fallback
`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

  Papel             Tamanho   Peso   Line-height
  --------------- --------- ------ -------------
  Page title           24px    600          32px
  Section title        16px    600          24px
  Card title           14px    600          20px
  Body                 14px    400          20px
  Label                13px    500          18px
  Caption              12px    400          16px

Page title usa `letter-spacing: -0.02em`.

------------------------------------------------------------------------

## 8. Espaçamento

Escala oficial: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64px`.

-   Conteúdo desktop: `24–32px`
-   Gap entre seções: `32px`
-   Gap entre cards: `16px`
-   Padding de cards: `20–24px`

Evitar valores arbitrários sem necessidade.

------------------------------------------------------------------------

## 9. Radius

-   `radius-sm`: `6px`
-   `radius-md`: `8px`
-   `radius-lg`: `12px`
-   `radius-xl`: `16px`
-   `radius-pill`: `999px`

Botões/inputs: `8px`; cards: `12px`; modais: `16px`; badges: pill.

------------------------------------------------------------------------

## 10. Sombras e bordas

Bordas devem ser discretas. Não delimitar cada elemento se
espaço/background já resolvem a hierarquia.

Light: - `shadow-sm: 0 1px 2px rgba(0,0,0,.04)` -
`shadow-md: 0 4px 12px rgba(0,0,0,.06)`

Dark: preferir **sem sombra**, usando superfície e borda.

------------------------------------------------------------------------

## 11. Botões

### Primary

`background: brand-500`, texto branco, radius `8px`, peso `600`, altura
`36–40px`. Hover `#0E9D68`.

### Secondary

Light: branco + `border-default`.\
Dark: `surface-primary` + `border-default`.

### Ghost

Sem fundo; hover usa `hover-neutral`.

### Danger

Light `#C64A4A`; dark `#F08A8A`.

------------------------------------------------------------------------

## 12. Inputs

Altura padrão `40px`, radius `8px`.

Light: branco + `#DDE5E1`.\
Dark: `#141414` + `#303030`.

Focus:
`border-color: #14B87A; box-shadow: 0 0 0 3px rgba(20,184,122,.12)`.

------------------------------------------------------------------------

## 13. Cards

Base: `surface-primary`, border default, radius `12px`, padding `20px`.
Sem sombra por padrão.

Card clicável ganha apenas alteração discreta de border/background no
hover.

### Metric Card

Estrutura: label → número → descrição. - label: 12px/600 - valor:
28--32px/700 - descrição: 12--13px Cor semântica somente quando houver
significado.

------------------------------------------------------------------------

## 14. Tabelas

Não usar bordas por célula.

-   Header: `surface-secondary`
-   Header text: 11px/600/muted
-   Row: mínimo 48px
-   Separador: `border-subtle`
-   Hover: `hover-neutral`

Em mobile, considerar transformar tabelas complexas em listas/cards.

------------------------------------------------------------------------

## 15. Badges e status

  Status    Light BG    Light Text   Dark BG     Dark Text
  --------- ----------- ------------ ----------- -----------
  Success   `#EAF7F2`   `#087D64`    `#10251E`   `#55D7A6`
  Warning   `#FFF3D6`   `#8A6414`    `#292315`   `#EAC66D`
  Error     `#FCE8E8`   `#A33A3A`    `#2A1717`   `#F08A8A`
  Info      `#E5F0F7`   `#315E78`    `#17212B`   `#7CC4F8`

Nunca usar a cor da organização para todos os estados.

------------------------------------------------------------------------

## 16. Ícones

Preferência: **Lucide Icons**. Tamanhos usuais `16 / 18 / 20px`. Não
misturar famílias, glyphs preenchidos e outlines sem motivo.

------------------------------------------------------------------------

## 17. Componentes oficiais

Centralizar e reutilizar: `Button`, `IconButton`, `Input`, `Textarea`,
`Select`, `Checkbox`, `Radio`, `Switch`, `Badge`, `Card`, `MetricCard`,
`Table`, `Dropdown`, `Modal`, `Drawer`, `Tooltip`, `Tabs`, `Breadcrumb`,
`Pagination`, `EmptyState`, `Skeleton`, `Toast`, `Sidebar`, `Header`,
`PageHeader`.

Não recriar versões específicas por tela quando o componente base
resolver.

------------------------------------------------------------------------

## 18. Dashboard

Deve responder primeiro: **"Existe algo que precisa da minha atenção?"**

Hierarquia: 1. Visão geral 2. Métricas principais 3. Pendências/ações 4.
Documentos recentes 5. Compliance 6. Atividade

Não transformar toda informação em card.

------------------------------------------------------------------------

## 19. Modelos de fichas

Manter **Coleções → Fichas**, reduzindo ruído e cores aleatórias.

Card recomendado: **Anamnese Geral**\
Anamnese · 0 respostas\
`Abrir` + menu `•••`

Ações secundárias devem ficar no menu contextual.

------------------------------------------------------------------------

## 20. Formulários públicos

Não devem parecer o painel administrativo. São uma experiência do
paciente/cliente e podem refletir a identidade da organização.

Estrutura: logo da organização → título → descrição → progresso →
perguntas → ação.

Conteúdo central `max-width: 640–720px`, mobile-first. Quando aplicável
ao plano, Gestgo aparece discretamente como **"Protegido por Gestgo"**.

------------------------------------------------------------------------

## 21. Responsividade

Breakpoints: `640 / 768 / 1024 / 1280 / 1536px`.

-   Sidebar vira drawer em mobile.
-   Cards empilham.
-   Ações secundárias migram para menus.
-   Touch targets: `40–44px` no mínimo.
-   Não apenas "encolher" desktop.

------------------------------------------------------------------------

## 22. Acessibilidade

Contraste WCAG adequado, focus visível, labels reais, navegação por
teclado, `aria-label` quando necessário e nenhum estado comunicado
somente por cor.

------------------------------------------------------------------------

## 23. Tokens CSS de referência

``` css
:root {
  --brand-900:#063D36;
  --brand-700:#087D64;
  --brand-500:#14B87A;
  --brand-400:#20C989;
  --brand-100:#CFEDE1;
  --brand-50:#EAF7F2;

  --background:#F8FAF6;
  --surface-primary:#FFFFFF;
  --surface-secondary:#F3F5F4;
  --surface-tertiary:#ECEFED;
  --text-primary:#17201F;
  --text-secondary:#56635F;
  --text-muted:#7B8783;
  --border-subtle:#E9EFEC;
  --border-default:#DDE5E1;
  --border-strong:#C8D1CD;
  --hover-neutral:#F1F4F2;
  --active-neutral:#E8EDEB;

  --radius-sm:6px;
  --radius-md:8px;
  --radius-lg:12px;
  --radius-xl:16px;
}

[data-theme="dark"] {
  --background:#0D0D0D;
  --surface-primary:#171717;
  --surface-secondary:#1C1C1C;
  --surface-tertiary:#222222;
  --text-primary:#F2F2F2;
  --text-secondary:#B4B4B4;
  --text-muted:#858585;
  --border-subtle:#242424;
  --border-default:#303030;
  --border-strong:#404040;
  --hover-neutral:#222222;
  --active-neutral:#292929;
}
```

------------------------------------------------------------------------

## 24. Regras para agentes/Cursor

Antes de alterar UI: 1. Ler este documento. 2. Reutilizar componentes
existentes. 3. Aplicar tokens globais antes de CSS local. 4. Preservar
comportamento, regras de negócio e configurações. 5. Não adicionar
biblioteca visual sem autorização. 6. Não inventar novas cores/padrões.
7. Não hardcodar cores estruturais dentro das telas. 8. Validar Light,
Dark, navegação neutra, topo com marca e menu escuro. 9. Validar cor
customizada da organização. 10. Validar desktop e mobile.

### Ordem recomendada de migração

`tokens → componentes base → shell/sidebar/header → dashboard → modelos → demais telas → formulários públicos`.

**Não refatorar o sistema inteiro de uma vez.**
