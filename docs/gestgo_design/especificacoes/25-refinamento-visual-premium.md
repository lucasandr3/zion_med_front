# 25. EPIC VIS-14 — REFINAMENTO VISUAL PREMIUM DO GESTGO

**Versão:** 1.0 — 19/11/2026  
**Status:** ESPECIFICAÇÃO DE EVOLUÇÃO, não implementação autorizada  
**Responsável pela decisão de produto:** proprietário do Gestgo  
**Frontend principal:** `zion_med_front` (Angular 21 standalone, zoneless, Nord Health + Tailwind 4)  
**Marketing:** `gestgo-site`; avaliar em etapa independente  
**Backend canônico escolhido:** `gestgo_api` (Java 21 / Spring Boot 3.5); **não requer alterações de backend por padrão**  
**Documentos relacionados:** `raiox.md`, `DECISAO-ARQUITETURA-JAVA.md`, `GESTGO-PLANO-MESTRE-EVOLUCAO.md`.

> **DECISÃO DE DESIGN APROVADA:** O Gestgo deve ter a estética mais bonita, sofisticada, consistente e premium possível, **sem que a estética seja justificativa para aumento de preço**. Preservar logotipo, linguagem de marca, identidade verde, fluxo documental e identidade visual das clínicas. **Não fazer rebranding, não propor um novo logo, não trocar a cor principal por outra família.**

> **CONTROLE DE ESCOPO:** Esta especificação trata de **refinamento visual, experiência e acessibilidade**. Não autoriza implementar WhatsApp, PDF com IA, novos modelos de assinatura, novos planos, features comerciais, reestruturação completa de módulos, reescrita de backend ou alteração de contratos de API. Existem especificações independentes para esses temas no Plano Mestre.

---

## 25.1. O que significa “premium” para o Gestgo

Um resultado premium não é “mais gradiente, mais sombra, mais animação”. É:

1. **Consistência:** o mesmo elemento visual tem aparência e comportamento equivalentes em todas as telas.
2. **Precisão:** alinhamentos, espaçamentos, tipografia, bordas, ícones, estados e grids bem resolvidos.
3. **Clareza:** a pessoa sabe exatamente o que fazer, sem explorar vários menus ou interpretar termos técnicos.
4. **Conforto:** formulários acessíveis, áreas de toque adequadas, boa densidade informacional e responsividade real.
5. **Confiabilidade percebida:** estados de sucesso/erro compreensíveis, feedback imediato, datas e protocolos bem apresentados.
6. **Identidade:** claramente Gestgo no produto e no site, mas com a marca da clínica respeitada em experiências públicas.
7. **Sobriedade:** sem efeitos cosméticos que prejudiquem leitura, desempenho ou a operação.

**Público predominante:** 25 clientes pagantes informados pelo proprietário, principalmente profissionais solo de estética e odontologia. Esse contexto orienta hierarquia e clareza, **não a precificação**.

## 25.2. Evidências visuais fornecidas e limites

A revisão anterior utilizou capturas enviadas pelo proprietário nesta conversa. Os nomes abaixo são rótulos de referência, **não garantem que os arquivos estejam no workspace do Cursor**:

| Arquivo original | Superfície observada | Evidência / atenção |
|---|---|---|
| `login.png` | Acesso | Marca verde intensa à esquerda, formulário de login à direita; texto branco no fundo verde deve ter contraste revisado |
| `site.png` | Site institucional | Hierarquia já trabalhada, seções alternadas, CTA e identidade; captura longa e em baixa largura |
| `dash.png` | Dashboard | Mistura de ativação, agenda, indicadores, compliance e gráficos; densidade e ordem merecem revisão |
| `documentos.png` | Hub documental | Cartões claros de acesso; relação com itens do menu pode ser mais evidente |
| `pessoas lista.png`, `pessoas cadastro.png`, `pessoas cadastro02.png` | Pessoas | Listagem curta com muito espaço livre; formulário extenso com muitos campos e autorizações |
| `protocolos.png`, `protocolos 2.png` | Protocolos | Listagem funcional; detalhe exibe hash longo com destaque desproporcional à importância cotidiana |
| `servicos.png`, `servicos cadastro.png` | Serviços | Listagem enxuta e cadastro básico; possível refinamento de hierarquia e agrupamento |
| `agenda.png` | Agenda interna | Calendário em grade mensal, estados e legenda |
| `agendd.png`, `agendad.png` | Agenda pública desktop | Hero à esquerda; cartão de agendamento à direita; cartões de horários altos |
| `aghm.png`, `agenda m.png` | Agenda pública mobile | Boa adaptação, mas fluxo vertical comprido e barra de ação ao fim da seleção |
| `pagina linkbio.png` | Link na Bio público | Composição vertical bem resolvida, marca da clínica e módulos de atendimento/documentação |
| `formpubm1.png`, `formpub2m.png`, `formpub2.png` | Formulário público | Boas ações grandes e leitura; conferir safe areas, campos opcionais e legibilidade nos móveis |

**O que NÃO foi verificado por screenshot:** comportamento no navegador, tempo de carregamento, DOM, teclado, leitor de tela, modo escuro real, CSS, capacidade de zoom, bugs de layout ou operação em celular físico. Toda conclusão visual deve ser confirmada no código e, quando pertinente, em runtime de homologação.

## 25.3. Regras visuais inegociáveis

- **Preservar a marca:** logo Gestgo, nome, proporções, linguagem verde/esmeralda e convenções reconhecíveis.
- **Preservar as marcas das clínicas:** páginas `/a/:slug`, `/l/:slug`, `/f/:token` devem continuar respeitando configurações de identidade pública de cada organização; não impor verde Gestgo sobre temas escolhidos por clientes.
- **Não quebrar o produto:** nenhum redesenho pode alterar a semântica de formulários, consentimentos, assinaturas, OTP, agenda, envios, permissões, PDFs, snapshots e protocolos.
- **Sem dependência desnecessária:** reutilizar Nord Health, Tailwind e tokens já existentes, evitando instalar nova biblioteca de UI sem justificativa técnica.
- **Sem CSS global agressivo:** preferir tokens e componentes compartilhados; evitar overrides de tag, `!important` indiscriminado e modificações de biblioteca dentro de `node_modules`.
- **Sem troca cosmética de ícones em massa:** usar a biblioteca existente, harmonizando tamanho, alinhamento e stroke; não introduzir uma segunda família de ícones.
- **Sem reduzir acessibilidade para ganhar beleza:** preservar estados de foco, contraste, rótulos e feedback.
- **Sem expor dados reais de pacientes nos testes, screenshots ou relatórios:** usar massa sintética e ocultar credenciais/tokens.

## 25.4. Cor — preservar o verde, refinar papéis semânticos

### 25.4.1. Evidência de cor

**`#14B87A` foi identificado como cor dominante de fundo na imagem `login.png`**, portanto é uma boa referência da marca. Entretanto, **não afirmar que já é o token canônico do código** até inspecionar `styles`, arquivos de tema, Tailwind e tokens Nord do `zion_med_front` e `gestgo-site`.

Cores atuais aparentes de outras telas: fundo de aplicação próximo de `#F8FAF6`, branco `#FFFFFF`, verde suave próximo de `#E2F6EF`, verde profundo em seções de marketing. São **amostras de screenshots**, não auditoria CSS.

### 25.4.2. Paleta candidata (não aplicar globalmente sem auditoria)

| Token semântico sugerido | Cor candidata | Função |
|---|---|---|
| `brand.primary` | `#14B87A` | Logo, identidade, detalhes, superfícies destacadas com texto escuro quando necessário |
| `action.primary.bg` | `#087A55` | Botão primário com texto branco (candidato de maior contraste) |
| `action.primary.hover` | A definir em escala derivada do tema | Hover consistente, sem perder contraste |
| `brand.deep` | `#0A3E35` | Blocos especiais e fundos mais profundos |
| `surface.canvas` | `#F8FAF6` | Fundo geral claro |
| `surface.card` | `#FFFFFF` | Cartões e painéis |
| `surface.brand.soft` | `#E2F6EF` | Seleções e superfícies de apoio |
| `text.primary` | `#17201F` | Títulos e texto principal |
| `text.muted`, `border.subtle`, `state.*`, `focus.ring` | A definir após inventário de tokens | Uso consistente com testes de contraste |

**Evitar** usar o mesmo verde para logo, fundo de botão, texto em superfície branca, borda de seleção, sucesso e gráfico. A **família verde se mantém**, mas funções diferentes exigem tons diferentes e identificadores semânticos.

### 25.4.3. Contraste verificado matematicamente (amostras)

- `#14B87A` + branco `#FFFFFF`: **2,57:1**. Não usar como combinação de texto branco normal/grande em nível AA.
- `#087A55` + branco `#FFFFFF`: **5,35:1**. Candidato para botões de texto branco.
- `#14B87A` + grafite `#17201F`: **6,47:1**. Exemplo viável de texto escuro sobre o verde de marca.
- `#0A3E35` + branco `#FFFFFF`: **11,98:1**.

Verificar novamente sobre componentes reais, incluindo transparência/estados `disabled`, `hover`, `focus`, mensagens e links. Contraste AA: **texto normal 4,5:1**, texto grande 3:1, elementos não textuais essenciais 3:1. A regra de foco visível também se aplica. Não chamar o sistema de “WCAG compliant” sem testes completos.

### 25.4.4. Tema escuro

Se já existe alternância de tema, **não basta inverter o tema claro**. Auditar contraste de texto, campos, bordas, superfícies de destaque, sombra, estados de erro/sucesso e gráficos. Preservar `prefers-color-scheme` e a preferência salva conforme funcionamento real. A identidade pública de cada clínica pode ter regras próprias.

## 25.5. Tipografia, escala, espaçamento e composição

**Ação preliminar:** inventariar fontes e tamanhos efetivamente usados. Não trocar família tipográfica apenas por tendência. Se houver múltiplas fontes sem propósito, escolher uma família base compatível com a existente e reduzir variações.

**Escala candidata**, a ser compatibilizada com o design system atual:

| Elemento | Referência | Regra |
|---|---|---|
| Título de página interna | 24–28 px | Peso 650–750, espaçamento previsível |
| Título de seção | 18–20 px | Separar conteúdo, sem competir com título principal |
| Título de cartão | 15–17 px | Clareza e consistência |
| Texto principal | 14–16 px | Evitar textos pequenos demais para compensar densidade |
| Texto auxiliar | 12–14 px | Contraste suficiente; não ocultar informações críticas |
| Labels de formulário | 13–14 px | Visíveis, persistentes, associadas ao campo |
| Números e KPIs | 24–32 px | Preferir números tabulares; formatação consistente |

- Base de espaçamento recomendada: múltiplos de **4 px**; favorecer intervalos consistentes de 8/12/16/24/32 px.
- Estabelecer largura máxima de conteúdo por tipo de página; não deixar campos e textos esticarem indefinidamente em 1440+ px.
- Uma convenção consistente de raio: elementos pequenos 6–8 px, campos/cartões 10–14 px, blocos amplos 16–20 px **conforme tokens existentes**. Evitar a mistura aleatória de vários raios.
- Bordas mais importantes que sombras. Usar sombras discretas apenas onde comunicarem elevação; não aplicar sombras pesadas em todos os cards.
- Separar hierarquia de conteúdo de decoração; área vazia pode ser correta, desde que a tela não pareça interrompida ou sem próximo passo.
- Estados de `loading`, vazio, sucesso, erro e `disabled` devem ter tratamento visual consistente e mensagens claras.

## 25.6. Navegação, ícones, botões e padrões de interação

### Menu lateral

A presença de `Documentos` e itens de produto como `Modelos de fichas` e `Formulários públicos` em áreas distintas pode gerar dúvida de organização.

**Antes de mexer:** auditar uso real, permissões e `navigation-hubs.config.ts`, rotas e favoritos. **Não remover acessos nem mudar URLs existentes** sem plano de redirecionamento/compatibilidade. Como primeiro PR, alinhar hierarquia, estado ativo, ícones, espaçamento, títulos e agrupamentos sem alterar navegação funcional. Eventual reorganização de IA fica em proposta separada.

### Componentes compartilhados

Normalizar por tokens/variantes existentes:

- Botões: `primary`, `secondary`, `tertiary`, `danger`, `text`, `icon-only`, `loading`, `disabled`.
- Inputs: rótulo, dica, erro, contador quando útil, foco, preenchimento automático, tamanho e altura consistentes.
- Tabelas e listas: densidade compacta/confortável baseada no contexto, títulos visíveis, coluna principal com maior peso.
- Badges de status: `Pendente`, `Aprovado`, `Reprovado`, `Concluído`, `Cancelado` com cores padronizadas + texto, nunca só cor.
- Modais, drawers e toasts: espaçamento, foco, botões destrutivos e posição previsíveis.
- Ícones de ações: área clicável adequada, `aria-label`, tooltip quando o significado não for óbvio.
- Carregamento: skeletons apenas quando úteis, sem jumps importantes de layout.
- Foco visível: teclado, contraste, ordem de tabulação e feedback.

## 25.7. Refinamento por superfície (com evidências das telas)

### P0 — Login (`login.png`)

**Hoje:** tela dividida com verde vibrante e boa proposta comercial; existe risco confirmado de contraste insuficiente entre **branco sobre `#14B87A`** na área esquerda.

**Proposta:** manter layout 2 colunas, logo e mensagens; ajustar tom de fundo/texto ou zonas tipográficas para tornar leitura acessível sem abandonar o verde; harmonizar campos, botão, helper text, foco, espaçamento e estado de erro. Conferir adaptação mobile e `autofill` sem quebrar login.

**Aceite:** sem contraste insuficiente em textos críticos, sem corte do logo, ordem do teclado correta, login/password recovery preservados, visual consistente em desktop/mobile/tema escuro quando existente.

### P0 — Formulário público (`formpubm1.png`, `formpub2m.png`, `formpub2.png`)

**Hoje:** boa estrutura mobile e botões visíveis. Há potencial para melhorar leitura, labels, campo `opcional`, rodapé de segurança e distância da moldura/topo em simuladores, mas **não há prova de bug real de safe area**.

**Proposta:** otimizar ritmo vertical, agrupar mensagens auxiliares, padronizar botão principal, não competir com o conteúdo de saúde e assegurar `safe-area-inset-*` onde aplicável. Preservar a possibilidade de assinatura desenhada e digitada, termos e aceites.

**Aceite:** nenhum campo escondido sob teclado/notch/rodapé; sem rolagem horizontal em 320–430 CSS px; labels legíveis; não altera validações, consentimento, OTP, assinatura ou submit.

### P0 — Agenda pública (`agendd.png`, `agendad.png`, `aghm.png`, `agenda m.png`)

**Hoje:** composição elegante em desktop, experiência mobile organizada; cards de horário e calendário prolongam a página, especialmente no celular.

**Proposta:** compactar cartões de horário sem reduzir área de toque, diminuir repetição de textos auxiliares, melhorar densidade entre calendário e horários, criar estados de seleção óbvios, tratar CTA para ficar encontrável sem cobrir informações. Manter identidade da clínica (ex.: azul-marinho da clínica demonstrativa) e **evitar títulos universais como “bem-estar”** quando o nicho não combina — tornar personalização configurável apenas se o recurso já existir ou for aprovado separadamente.

**Aceite:** datas e horários operam exatamente como antes, seleção perceptível por cor e forma, CTA não parece habilitado quando não está, sem tap targets minúsculos, legível no mobile, sem alterar cálculo de disponibilidade ou vínculo documental.

### P1 — Dashboard (`dash.png`)

**Hoje:** muitos cartões simultâneos: onboarding 1/6, agenda, modelos, links, compliance, gráficos e últimos registros. A captura possui protocolos existentes e checklist inicial, combinação que exige **verificação da regra de progresso**, não suposição de bug.

**Proposta:** privilegiar hierarquia de ações urgentes, fichas a compartilhar/revisar, resultados recentes, depois métricas analíticas. Aplicar sistema de cards com altura/tipografia/estados consistentes. Preservar dados, filtros e gráficos atuais; não remover indicadores úteis. Se mudar prioridade dos componentes, especificar cenários de onboarding e de usuário recorrente.

**Aceite:** ação principal identificável em menos de uma leitura, métricas existentes acessíveis, dashboard responsivo, estado de ativação coerente após inspeção do código, sem mudança na fonte de dados.

### P1 — Documentos e navegação (`documentos.png`)

**Hoje:** hub com cartões limpos de protocolos, modelos, importação IA, formulários públicos. Bom ponto de partida.

**Proposta:** card com título, descrição, ícone e ação consistentes; hierarquia de “Importar minha ficha” e “Consultar protocolos” ajustada ao uso; reduzir ambiguidades entre hub e navegação lateral. **Não expor menus de envios/integrações que foram intencionalmente ocultos por ainda não estarem operacionalmente prontos.**

**Aceite:** links existentes preservados; acesso à função principal rápido; comportamento coerente em vazio, carregamento e usuário sem permissão.

### P1 — Pessoas (`pessoas lista.png`, `pessoas cadastro.png`, `pessoas cadastro02.png`)

**Hoje:** lista limpa; cadastro longo contendo identificação, contato, origem, plano, LGPD e observações.

**Proposta:** dividir formulário visualmente em seções fáceis de localizar, sem introduzir novas etapas obrigatórias; ações de salvar/cancelar consistentes, erros próximos aos respectivos campos. Na lista, valorizar nome, contato, situação e histórico útil sem preencher o vazio com decoração. Preservar checkboxes de consentimento separados por finalidade; não alterar conteúdo ou defaults.

**Aceite:** nenhuma perda de campos, mesma lógica de persistência e permissões, textos com contraste suficiente, navegação por teclado, telas estreitas sem overflow.

### P1 — Protocolos (`protocolos.png`, `protocolos 2.png`)

**Hoje:** lista clara com status; detalhe inclui código, pessoa, datas, hash longo, ações de baixar PDF/dossiê/aprovar/reprovar e abas.

**Proposta:** hierarquia focada em tipo, pessoa, situação e ação; hash e evidências técnicas podem ocupar bloco secundário/expansível, **desde que permaneçam disponíveis integralmente e copiáveis**. Badges com cores semânticas constantes, confirmação para ações irreversíveis, botões organizados por importância.

**Aceite:** nenhum valor de evidência ou status alterado; hash íntegro; acesso a PDF, dossiê, revisão e histórico preservado; ações destrutivas com proteção adequada.

### P1 — Serviços (`servicos.png`, `servicos cadastro.png`)

**Hoje:** listagem simples e cadastro em painel amplo; bom ponto de partida, mas cabeçalho, densidade e agrupamentos podem ganhar acabamento.

**Proposta:** títulos/ações padronizados, divisão visual entre identificação do serviço, duração, valor, imagem e opções de agenda. Empty state útil só se realmente vazio. Não criar campos de negócio novos.

**Aceite:** editar/criar/excluir mantém comportamento, previews de imagem e validações preservados, controles com tamanhos e alinhamentos consistentes.

### P2 — Agenda interna (`agenda.png`)

**Hoje:** grade mensal e legenda de estados; tela limpa.

**Proposta:** testar escala de dias, navegação de meses, densidade dos compromissos e interpretação por cor; reforçar estado `hoje`, dia selecionado e informações sobre agendamentos em foco. Evitar excesso de cards no calendário.

**Aceite:** sem alterações de horários, disponibilidade, estados ou lógica de calendário; legendas compreensíveis sem depender só da cor.

### P2 — Link na Bio (`pagina linkbio.png`)

**Hoje:** uma das composições mais fortes: identidade da clínica, serviços, documentos e FAQ integrados.

**Proposta:** refinar tipografia, consistência dos cartões, separadores e densidade; preservar personalizações por organização, CTAs e identidade própria da clínica. Tratar mobile-first.

**Aceite:** cada tema/layout em uso permanece utilizável; não impor paleta Gestgo; URLs públicas e analytics mantidos.

### P2 — Site institucional (`site.png`)

**Hoje:** landing com storytelling e CTAs; captura de 231 px de largura reduz precisão da avaliação de detalhes.

**Proposta:** preservar identidade e narrativa; melhorar consistência de tipografia, respiro, demonstração do antes/depois da ficha original e contraste; não alterar estratégia de preços, rotas `/comece`, SEO, estrutura de conteúdo ou CTA sem análise separada. Refinar visual em PR isolado do Angular.

**Aceite:** mobile/desktop aprovados, performance e CWV não pioram perceptivelmente, sem alteração de SEO/indexação/cadastro, CTA funcionais.

## 25.8. Responsividade e acessibilidade (obrigatório)

Testar larguras CSS aproximadas **320, 360, 390, 430, 768, 1024, 1280, 1440**, com zoom de 200% e 400% onde aplicável, incluindo estados com validação e teclado virtual. Adaptar breakpoints existentes, sem criar breakpoint novo apenas por preferência estética.

Checklist mínimo:

- [ ] Texto normal com contraste >= 4,5:1; grande >= 3:1; componente visual essencial >= 3:1, respeitando exceções aplicáveis.
- [ ] Contraste e foco verificáveis em tema claro e escuro.
- [ ] Labels visíveis e ligados aos campos; placeholders não são o único rótulo.
- [ ] Estados significados por texto/ícone, não só cor.
- [ ] Navegação por teclado sem aprisionamento; foco visível e não obscurecido.
- [ ] Componentes de toque confortáveis (preferir cerca de 44 × 44 CSS px; verificar WCAG 2.2 mínimo de 24 × 24 CSS px ou exceções aplicáveis).
- [ ] Sem barras horizontais indevidas em mobile; menus e modais utilizáveis em zoom.
- [ ] Indicadores de carregamento e erros com anúncio acessível quando apropriado.
- [ ] Respeito a `prefers-reduced-motion` quando houver transições.
- [ ] Sem mensagens relacionadas a dados de saúde sendo enviadas para analytics ou logs de frontend.

**Padrão-alvo:** WCAG 2.2 AA, como critério de projeto e verificação, não alegação automática de certificação.

## 25.9. Plano de execução incremental e fronteiras dos PRs

**PR-0 — Auditoria, SEM mudanças:** localizar fonte real de CSS/tokens, componentes, estilos no Angular/Nord/Tailwind, temas público/tenant e captura em homologação (dados sintéticos). Entregar inventário de problemas com severidade, rota, screenshots, token atual, recomendação e arquivo impactado. Checar pendências contra a versão atual do código.

**PR-1 — Fundação visual e contraste:** tokens semânticos, contraste de botões/login, tipografia e foco, usando o que já existe. Sem mudança de HTML além do necessário; testes de componentes e visual regression. Foco em segurança visual e coerência.

**PR-2 — Componentes compartilhados:** variantes de botão, input, cards, badges, listas, estados; migrar poucas telas-piloto (ex.: Documentos + Serviços). Não realizar migração ampla em um único PR.

**PR-3 — Painel interno principal:** dashboard, navegação lateral e hub Documentos, após validar regras de exibição. Não reativar módulos ocultos por WIP.

**PR-4 — Pessoas e Protocolos:** listas, cadastros e detalhe; manter todas as ações operacionais, evidências e informações.

**PR-5 — Experiência pública:** agenda (desktop/mobile), formulários públicos e Link na Bio, com tema por clínica preservado. Separar em sub-PRs se necessário.

**PR-6 — Marketing:** refinamento do `gestgo-site` em PR próprio, com checagem SEO, conversão, performance e rotas.

**A ordem é adaptável a criticidade do inventário, mas nenhum PR presume aprovação antecipada.** Implementações são feitas **somente após revisão/aceite do PR-0 e autorização para o PR correspondente**.

## 25.10. Regras de engenharia

- Verificar versão HEAD, branches e repositórios, não confiar cegamente em capturas/raio-X do dia 19/11.
- Não alterar `gestgo_api` nem Laravel por motivo puramente visual. Qualquer contrato adicional precisa de escopo próprio e justificativa.
- Preservar autenticação, tenancy, navegação, `guards`, RBAC e data binding; teste de regressão em fluxos principais.
- Preferir tokens semânticos CSS/Tailwind/Nord (usados consistentemente) a valores diretos espalhados por componentes.
- Não copiar código de concorrente ou instalar design system externo para forçar estética.
- Se precisar substituir componente, provar paridade de eventos, validação, teclado e estados.
- Usar feature flag para mudanças de impacto elevado e quando viável; permitir rollback CSS/rotas sem afetar dados.
- Evitar alterações no modelo de dados; se descobertas necessidades reais, propor RFC separada.
- Não gerar/modificar PDF assinado ou template publicado como parte desta iniciativa.

## 25.11. Critérios de aceite globais

| ID | Critério verificável |
|---|---|
| VIS-01 | Marca Gestgo permanece identificável: logo, nome e verde de referência preservados |
| VIS-02 | Tokens auditados e semânticos documentados no código, sem cores hardcoded novas em massa |
| VIS-03 | Combinações de texto/superfície críticas aprovadas em contraste WCAG 2.2 AA |
| VIS-04 | Componentes compartilhados visualmente consistentes entre telas piloto |
| VIS-05 | Login, dashboard, Documentos, Pessoas, Serviços e Protocolos aprovados em desktop + mobile |
| VIS-06 | Agenda pública, Link na Bio e formulários preservam identidade configurada da clínica |
| VIS-07 | Nenhuma rota/ação/permissão existente foi removida ou alterada inadvertidamente |
| VIS-08 | Fluxos de agendamento, formulários, assinatura, PDF, revisão e cadastro passam nos testes de regressão |
| VIS-09 | Teclado, foco, zoom e leitores de tela passam verificações aplicáveis |
| VIS-10 | Telas com 0, 1, muitos registros e erros de rede possuem layout e feedback adequados |
| VIS-11 | Visual regressions de tema claro/escuro e breakpoints revisadas com screenshots antes/depois |
| VIS-12 | Nenhum screenshot, log ou fixture contém dado pessoal real nem segredo |
| VIS-13 | Mudanças não reativam intencionalmente funções ocultas ou experimentais |
| VIS-14 | Bundle, tempo de renderização e interações não apresentam regressões materiais |
| VIS-15 | PR inclui arquivos tocados, decisões de token, evidência visual, testes e rollback |
| VIS-16 | Proprietário aprova cada lote antes do merge/deploy |

## 25.12. Checklist de evidência visual exigida no Cursor

Para cada tela alterada: registrar **antes/depois**, largura de viewport, tema, dados sintéticos usados e critérios objetivos. Casos prioritários:

1. Login: desktop e mobile, com erro e foco.
2. Dashboard: recém-cadastrado + cliente com protocolos existentes.
3. Documentos: estados com modelos e sem modelos.
4. Pessoas: lista vazia/uma/muitas pessoas; cadastro com validações.
5. Protocolos: lista, detalhe pendente/aprovado e seção de evidências.
6. Agenda: serviço, escolha de data/horário, revisão e CTA ativo/inativo; mobile e desktop.
7. Formulário público: boas-vindas, campos longos, assinatura, consentimento, teclado móvel.
8. Link na Bio: ao menos dois temas de clínicas diferentes.
9. Tema escuro, zoom, idioma e largura atípica quando aplicável.

**Se o Cursor não tiver navegador/testes visuais automáticos:** não inventar aprovação. Entregar matriz de testes manuais e imagens geradas em homologação quando possível.

## 25.13. Métricas de sucesso (produto, não preço)

- Proporção de telas críticas aprovadas sem problemas P0 de contraste/interação.
- Redução de inconsistências de componentes no inventário.
- Tempo para localizar funções-chave em testes com profissionais solo.
- Satisfação visual e percepção de facilidade em teste curto com clientes existentes.
- Ausência de regressões funcionais e queda relevante de performance.
- Diminuição de chamados associados a dificuldade de navegação/formulários, caso exista baseline.

**Não usar estética como pretexto para aumento de preço, bloqueio de recursos ou criação de plano premium.**

## 25.14. Prompt e instrução operacional

Ler `PROMPT-CURSOR-REFINAMENTO-VISUAL.txt`. Na primeira execução, o Cursor faz **apenas discovery + especificação final no contexto real do HEAD**, sem alterar código. Depois, solicitar autorização expressa para iniciar PR-1. O Cursor deve tratar sugestões deste documento como **candidatas que precisam ser verificadas** no sistema atual.

## 25.15. Referências técnicas externas

- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- W3C — Contraste mínimo (1.4.3): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
- W3C — Contraste não textual (1.4.11): https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast
- Nord Design System — tokens: https://nordhealth.design/core/tokens/
- Nord Design System — cores e papéis semânticos: https://nordhealth.design/design/foundations/colors/

---

**FIM DO EPIC VIS-14.**
