> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 8. EPIC UX-04 — EXPERIÊNCIA SOLO E ONBOARDING

**Prioridade:** P0/P1.  
**Objetivo:** permitir que alguém que nunca utilizou software de documentos digitalize a própria ficha e chegue à primeira assinatura sem depender de atendimento humano.

## 8.1. Entrada simples

- Página inicial contextual para usuário solo: **Minhas fichas → Enviar ficha → Acompanhar → Documentos assinados**.
- Outros módulos (agenda, serviços, link-bio, utilitários) continuam disponíveis, mas com baixa saliência para quem não os utiliza.
- Atalhos baseados no estado: sem fichas → importar; com ficha sem publicação → revisar; ficha publicada sem envio → compartilhar; envio pendente → acompanhar.
- Não refazer shell/rotas; estudar `layout-app`, `navigation-hubs.config.ts` e onboarding atual.

## 8.2. Onboarding por especialidade

- Selecionar Estética, Odontologia ou Outra; **não obrigatório** e reversível.
- Ação principal: **“Usar minha ficha atual”** (PDF do próprio profissional). Alternativa: “Começar com modelo”.
- Guiar primeira criação com checklist discreto: importar → mapear → revisar → publicar → compartilhar.
- Modelos específicos por nicho só podem ser anunciados se existirem e forem revisados adequadamente; conteúdo técnico-clínico exige validação do profissional.
- Permitir sair e retomar; não manter progresso apenas no `localStorage` se a experiência multi-dispositivo exigir persistência — auditar antes.
- Ajuda contextual e links curtos para vídeo/demonstração, evitando onboarding com muitas telas.

## 8.3. Primeiro sucesso

Definir evento de ativação como **primeiro protocolo realmente concluído/assinado** (indicador primário), com milestones: PDF importado, campos confirmados, modelo publicado, primeiro link enviado.

## 8.4. Experimentos

- Comparar CTA “Criar ficha digital” versus “Digitalizar minha ficha atual”, sem assumir vencedor.
- Testar tutorial contextual no editor versus tutorial longo.
- Medir tempo até publicação e proporção de clientes que chegam ao primeiro documento assinado.

## 8.5. Critérios de aceite

- Usuário solo consegue acessar o fluxo principal em até dois passos de navegação após login.
- É possível completar primeiro fluxo sem usar agenda, link-bio, integrações ou ferramentas extras.
- Opções especializadas não escondem funcionalidades para outras especialidades.
- Acessibilidade por teclado, leitores de tela e dispositivos móveis é validada.

---
