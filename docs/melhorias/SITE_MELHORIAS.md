# SITE_MELHORIAS — Gestgo

**Versão:** 1.0 · **Data:** 14/10/2026 · **Escopo:** marketing/site público e aquisição por nicho; complementar, não substitui `MELHORIAS.md`.

## 1. Diagnóstico do site existente (observado)

Site: https://gestgo.com.br/ (avaliado em 14/10/2026), além de `/mnt/data/site.png`. A identidade atual é consistente: verde Gestgo `#14B87A`, fundo claro, Inter, demonstração ilustrativa paciente/clínica, Modo Totem, evidências documentais e CTA de 14 dias sem cartão. O hero atual apresenta “Documentação clínica. Assinada e verificável.” O site já menciona modelos, link público, integrações e fichas customizáveis.

**Gaps comerciais observados:**

- O preço pós-trial aparece como **“Sob consulta”**, incoerente com estratégia self-service; só publicar preços após cobrança real/limites testados.
- A sessão “Para diferentes especialidades” lista categorias, mas não conduz a páginas detalhadas com linguagem e demonstração de cada nicho.
- O Link na Bio é mencionado pontualmente, mas **não aparece com galeria de modelos e uma demonstração navegável**.
- Não há explicação visual forte do processo de personalizar sua própria ficha (recurso existente) nem do resultado em histórico por pessoa.
- A landing é competente para explicar o que é documentação verificável, mas abstrata para profissionais que chegam pesquisando “ficha de anamnese para X”.

## 2. Decisão sobre Link na Bio

**GO para destacar, NÃO para reposicionar o produto como Linktree clínico.** Uma seção dedicada deve aparecer depois do fluxo de fichas/modelos e antes de evidências e preços, com 4 presets clicáveis e botão “Ver todos os modelos”. Os modelos são demonstrativos, não depoimentos reais.

Mensagem proposta: **“Sua clínica também pode ter uma página digital.”** Subtítulo: “Reúna contato, localização, formulários públicos e o seu link de agendamento em uma página com a sua identidade.”

As páginas do Link na Bio devem permitir: CTA principal configurável; contatos; documentos realmente publicados e apropriados; link externo de agenda (sem se passar por agenda nativa); controles por seção; responsividade; cuidado com links públicos para dados sensíveis. **Não mostrar TCLE ou ficha clínica individualizada livremente a qualquer visitante.**

## 3. Nova arquitetura de páginas (URLs propostas)

```
/                              # landing geral (manter)
/planos                        # preços após implementação real
/para/profissional-autonomo
/para/clinicas
/para/estetica-facial
/para/odontologia
/para/nutricao
/para/pediatria
/para/multiprofissional
/para/fisioterapia-dermatofuncional
/link-na-bio                   # vitrine + presets + demonstrações
/modelos/ficha-anamnese-facial # páginas específicas se houver material pronto/revisado
```

Recomendo liberar **primeiro estética facial e fisioterapia dermatofuncional**; segundo ciclo, profissional autônomo. Os demais são protótipos: só lançar SEO após entrevistas, adequação real de fichas e revisão do conteúdo. Ao publicar, remover `noindex,nofollow` somente nas páginas verificadas.

## 4. Ordem de implementação no site principal

| Prioridade | Entrega | Critério de aceite |
|---|---|---|
| P0 | Testar site → cadastro → trial → pagamento em produção | Sem erro, dados do funil registrados e confirmação de pagamento confiável |
| P0 | Exibir plano/preço ou condição comercial verdadeira | Não anunciar hipótese como preço vigente |
| P1 | Inserir cards clicáveis por especialidade no site geral | Cada card leva à landing específica |
| P1 | Seção Link na Bio com quatro prévias e galeria dedicada | Modelo visual abre demonstração real, sem simular agenda existente |
| P1 | Publicar página Estética Facial e Fisioterapia Dermatofuncional | CTA, nicho, exemplo e FAQs específicos, testados mobile |
| P1 | Demo “Paciente / Clínica” por nicho | Sem coleta de dados reais; acesso com clique e texto explicativo |
| P2 | Página exclusiva `/link-na-bio` | Galeria 8 modelos e diferenças por público |
| P2 | Landing Profissional Solo e mais 2 páginas de nicho | Somente após prova de conversão e demanda |
| P3 | IA em marketing | Apenas depois de funcionar em produção e ter qualidade revisável |

## 5. Padrão visual das landings

- Preservar logotipo e sistema Gestgo, cores primárias `#14B87A` / `#063D36`, Inter e superfícies claras. Cor temática de cada segmento apenas como **detalhe**, não uma marca nova para cada nicho.
- Hero: problema do nicho + demonstração ilustrativa de painel e Link na Bio correspondente.
- Conteúdo obrigatório: dor real → fluxo documental → prova por exemplo interativo → modelos editáveis → Link na Bio → Modo Totem e registros → condições comerciais verificadas → FAQ contextual → CTA.
- Nunca exibir números de desempenho, pacientes ou empresas como métricas reais sem fonte. Os números dos mocks são **fictícios** e marcados.
- Não gerar depoimentos fictícios ou badges de segurança/validade universal.
- Links externos e ações de CTA devem ser testados. URL atual de teste no site: `https://gestgo.com.br/comece` (verificar fluxo real).
- Não afirmar que agenda nativa, importação por IA ou cota comercial já estão ativas.

## 6. Preço e apresentação

Hipóteses do `MELHORIAS.md`: **Essencial R$39/mês ou R$390/ano; Profissional R$79/mês ou R$790/ano; Clínica R$149/mês ou R$1.490/ano**. São **propostas**, não estado de produção. As prévias HTML exibem marcador explícito de proposta e notas sobre limite/cobrança anual pendentes. Nunca retirar a nota sem parametrizar planos pelo backend, configurar Asaas e confirmar limites reais.

Plano essencial precisa manter custo de suporte e IA controlado. Anual exige contrato, política de cancelamento e processamento correto de renovação/troca de plano. **Não cobrar recorrência anual fictícia por link simples de PIX.**

## 7. Métricas obrigatórias do site

Eventos propostos: `landing_viewed`, `niche_selected`, `demo_patient_opened`, `demo_clinic_opened`, `linkbio_gallery_opened`, `linkbio_model_opened`, `template_preview_opened`, `trial_cta_clicked`, `signup_completed`, `first_protocol_completed`, `payment_confirmed`.

Dimensões: `niche`, `source_page`, `utm_source`, `utm_campaign`, `experiment_id` e `session_id` não sensível. Não transmitir CPF, conteúdo de formulário ou dado de saúde a analytics. A conversão útil é **visita → cadastro → primeira ficha/primeiro documento → pagamento**, não só clique.

## 8. SEO por especialidade

Páginas devem ter H1 e FAQs contextualizados com conteúdo realmente relevante. Adicionar `canonical` real ao publicar, sitemap, Search Console e links internos; SEO técnico e mobile adequados. Não publicar simultaneamente oito páginas quase iguais com texto trocado só para volume. Cada uma precisa de modelo, exemplo, linguagem e FAQ próprios e demonstráveis. Evitar páginas médicas com aconselhamento clínico não revisado.

## 9. Link na Bio: integração com produto

O site comercial mostra os **presets**; o painel autenticado mantém lógica e dados em Angular/Laravel. Usar `organizations.link_bio_model`, `link_bio_extra`, `accent_hex`, `clinic_links`, métricas de visualização e clique documentadas. Os templates HTML anexados são referências visuais para transformar em componentes reutilizáveis, **não** páginas de produção copiadas oito vezes.

Agenda: CTA para URL externa validada; Feegow quando a integração atual permitir; agenda nativa só após pesquisa. Separar configuração de disponibilidade do layout do Link na Bio.

## 10. Checklist de publicação (por landing)

- [ ] Páginas publicadas apontam somente para funcionalidades disponíveis.
- [ ] Preço, plano, cotas e ciclo de pagamento correspondem ao billing real.
- [ ] Conteúdo profissional e termos específicos foram revisados.
- [ ] Links públicos não expõem documentos individualizados ou dados pessoais.
- [ ] Link Bio apresenta atendimento agendável só quando o link funciona de fato.
- [ ] Hero e demonstração correspondem ao nicho em questão.
- [ ] Versão mobile testada em 360px/390px, tablet e desktop.
- [ ] Imagens comprimidas, fontes com fallback e acessibilidade básica.
- [ ] Metadata única, canonical e robots liberados somente após aprovação.
- [ ] Captura de conversão e erros não inclui dados sensíveis.
- [ ] Acompanhamento de novos trials e falhas de checkout configurado.

**Veredito do site:** **GO** para seção de Link na Bio e duas landings aprofundadas; **NO-GO** para publicar os oito nichos/valores comerciais sem validação e habilitação real.
