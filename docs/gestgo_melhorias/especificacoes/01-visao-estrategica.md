> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 1. RESUMO EXECUTIVO E PRINCÍPIOS

## 1.1. O que é o Gestgo

O Gestgo é um **SaaS B2B em operação comercial**, com **25 clientes pagantes**, sobretudo **profissionais solo de estética e odontologia**, adquiridos principalmente por **Google/SEO/site** e com **uso recorrente pela maioria** (informação do proprietário; métricas quantitativas ainda não extraídas).

Seu **core comercial real**, confirmado pelo proprietário, é:

> Uma clínica ou profissional pode usar a ficha que já possui em papel, disponibilizar o documento para mapeamento de campos e permitir que o paciente preencha e assine digitalmente; o Gestgo aplica os dados ao documento original, preservando seu layout.

É importante não reposicionar o produto como “criador genérico de formulários” ou “ERP de clínica”. O editor de formulários e outras ferramentas são **meios**; o benefício principal é **digitalizar, assinar e organizar o documento que a clínica já usa**, sem reinventar seu processo.

## 1.2. Objetivos da evolução

1. Tornar mais rápida e confiável a digitalização de PDFs já utilizados pelas clínicas.
2. Simplificar a jornada: importar → mapear → publicar → enviar → acompanhar → recuperar o documento assinado.
3. Reduzir trabalho manual de comunicação com pacientes, inicialmente com compartilhamento simples e depois com automações controladas.
4. Melhorar retorno de pacientes recorrentes, sem alterar documentos assinados.
5. Elevar aquisição e conversão orgânica, sobretudo em estética e odontologia solo.
6. Evoluir monetização com funcionalidades que entreguem ganho operacional verificável.
7. Proteger a confiabilidade, a privacidade e a continuidade de operação dos 25 clientes existentes.
8. Manter a complexidade de suporte compatível com uma operação solopreneur.

## 1.3. O que NÃO é objetivo

- Reescrever o Gestgo do zero.
- Criar uma nova plataforma de formulários desconectada do código existente.
- Substituir prontuário eletrônico ou criar ERP, financeiro completo, TISS ou telemedicina.
- Disponibilizar automações WhatsApp sem infraestrutura, opt-in e políticas oficiais verificadas.
- Fazer o corte de produção para Java sem verificar a paridade funcional, a consistência documental, a integridade dos dados e um rollback testado.
- Reprecificar automaticamente clientes existentes.
- Introduzir IA que publique ou assine documentos sem validação humana.
- Alterar snapshots, hashes ou provas de documentos históricos.

## 1.4. Regras de produto

- **Preservar o papel transformado em PDF:** layout original e posicionamento correto são prioridades.
- **Correção humana soberana:** toda sugestão automática é editável; nenhuma sugestão da IA deve ser considerada juridicamente ou clinicamente correta sem revisão.
- **Reutilizar o existente:** `form-imports`, `SourcePdfFillService` e demais recursos identificados no Laravel são **referências funcionais**; verificar se equivalentes já existem no `gestgo_api` antes de implementar no Java. Reutilizar templates, assinaturas, documentos, envios, pessoas, agenda, billing, webhooks e analytics quando compatíveis.
- **Backend canônico:** novas regras, endpoints, jobs e integrações de backend devem ser planejados para `gestgo_api` (Java/Spring Boot). `zion_med` (Laravel) permanece referência e possível contingência temporária, não destino de novas funcionalidades.
- **Produção ainda não certificada:** verificar qual serviço atende `api.gestgo.com.br` e só migrar tráfego com matriz de paridade, homologação e rollback comprovados.
- **Projetar por organização:** todo recurso persistente deve respeitar `Tenant → Organization`, RBAC e escopo de dados.
- **Progressive disclosure:** profissional solo vê primeiro apenas ações fundamentais.
- **Feature flags e rollout:** liberar por conta/grupo, com rollback e observabilidade.
- **Não expor dados clínicos em marketing, analytics ou mensagens genéricas.**
- **Negócio antes de expansão:** medir conversão, ativação, uso e custo de suporte.

---
