> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 24. REFERÊNCIAS E TERMINOLOGIA

## 24.1. Fonte interna

- `raiox.md`: “GESTGO — RAIO-X TÉCNICO E FUNCIONAL”, auditoria de leitura de 19/11/2026. Repositórios e commits auditados conforme seção de metadados do documento.
- Informações comerciais e operacionais fornecidas pelo proprietário nesta conversa: 25 clientes pagantes; estética/odontologia solo; origem Google/SEO/site; uso recorrente; mapeamento manual atual; todas as clínicas usam o core da ficha própria; homologação de utilitários/push; plano de reativar planos superiores; ausência de integração nativa WhatsApp concluída; preferência por não unificar site/SPA; **escolha explícita de Java/Spring Boot como backend canônico para a evolução**.

## 24.2. Fontes externas para revisão pontual antes de implementação

- Meta — Embedded Signup (coleção oficial): https://www.postman.com/meta/whatsapp-business-platform/documentation/du6gzjv/embedded-signup
- Meta — coleção WhatsApp Business Platform: https://www.postman.com/meta/whatsapp-business-platform/overview
- Google Search Central — SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

**Nota:** disponibilidade de coexistência, requisitos de aprovação, política de mensagens e tarifação da Meta são dinâmicos. Confirmar documentação oficial na data de implementação; não confiar em preços ou elegibilidade históricos.

## 24.3. Terminologia

- **Ficha original:** PDF ou representação do documento que a clínica já utiliza.
- **Mapeamento:** ligação entre campo lógico do formulário e região do PDF original.
- **Campo sugerido:** proposta automatizada ainda não aprovada pelo profissional.
- **Template publicado:** versão aprovada e disponibilizada para preenchimento.
- **Protocolo:** submissão documental acompanhada de evidências, conforme domínio atual.
- **Pacote documental:** conjunto versionado de documentos associados a uma rotina/procedimento (proposto).
- **Cliente pagante:** conta com pagamento, conforme informado pelo proprietário; não confundir com pessoa/paciente registrada.
- **Feature flag:** mecanismo para habilitar/desabilitar mudança sem prejudicar a operação existente.

---

**FIM DO PLANO MESTRE.**

> **Orientação final:** antes de começar a implementação, o Cursor deve confrontar cada item com o código atual. Preservar tudo que já funciona, evitar duplicidade e produzir a melhoria incremental de maior valor primeiro.
