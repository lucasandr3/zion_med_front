# Gestgo — como aplicar o refinamento visual com Cursor

## 1. Coloque os arquivos na mesma raiz dos projetos

```text
Gestgo/
├── zion_med_front/           # Angular 21 (interface)
├── gestgo_api/               # Java/Spring Boot — não alterar nesta etapa visual
├── zion_med/                 # Laravel — referência da transição, não alterar
├── gestgo-site/              # Site institucional
└── gestgo_docs/
    ├── LEIA-ME.md
    ├── GESTGO-PLANO-MESTRE-EVOLUCAO.md
    ├── PROMPT-CURSOR-REFINAMENTO-VISUAL.txt
    ├── especificacoes/
    │   └── 25-refinamento-visual-premium.md
    └── referencias-visuais/
        └── ... imagens fornecidas como referência
```

## 2. Abra um workspace com acesso às pastas

No Cursor, abra o workspace raiz `Gestgo/` (ou adicione os projetos e `gestgo_docs` a um mesmo workspace). Certifique-se de que consegue navegar até `zion_med_front`, `gestgo-site` e `gestgo_docs`.

## 3. Primeiro prompt: análise sem alteração

Abra `gestgo_docs/PROMPT-CURSOR-REFINAMENTO-VISUAL.txt`, copie e cole no Cursor em modo Agent. **Não autorize alterações de código na primeira execução.**

A resposta esperada é um diagnóstico verificável do código atual: cores CSS existentes, problemas por tela, ajustes propostos, PRs pequenos, testes e riscos. Se uma tela não puder ser validada em runtime, isso deve constar do relatório.

## 4. Só depois autorize PRs individuais

Comece por `PR-1 — Fundação visual e contraste`, depois os PRs de componentes/telas. Antes de cada PR, revise o escopo e os arquivos propostos. Não peça “implemente tudo” num único lote.

## 5. Homologação antes de produção

Use dados sintéticos e imagens sem dados pessoais. Compare screenshots antes/depois em desktop e mobile e teste fluxos críticos: login, abrir/assinar ficha, agendar, baixar PDF, revisar protocolo, cadastrar pessoa e serviço.

## O que a decisão visual NÃO autoriza

- Alterar preços ou planos para “justificar premium”.
- Trocar logo ou abandonar o verde Gestgo.
- Recolorir páginas públicas com o tema Gestgo por cima das personalizações das clínicas.
- Alterar API Java/Laravel sem necessidade funcional.
- Reescrever o editor PDF, assinatura, agenda, autenticação ou a lógica comercial.
