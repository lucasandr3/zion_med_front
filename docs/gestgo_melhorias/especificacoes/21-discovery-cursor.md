> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 21. CHECKLIST DE DISCOVERY TÉCNICO NO CURSOR

Antes de qualquer PR, o Cursor deve produzir `DISCOVERY-<EPIC>.md` (se o proprietário autorizar criar documentação) contendo:

1. Branches/commits atuais e quais repositórios serão alterados; o backend-alvo para features é `gestgo_api` (Java).
2. Paths **reais** do editor PDF, services, entidades, endpoints, jobs e testes.
3. O que já existe no repositório hoje versus o que falta para a especificação.
4. Arquitetura de dados e coordenadas atual, sem adivinhar campos nem nomes de tabela.
5. Regras de template version/snapshot/assinatura e dependências do PDF generator.
6. Confirmar qual backend atende o ambiente alvo; desenhar nova lógica no `gestgo_api` (Java) e usar `zion_med` apenas para paridade e contingência enquanto necessário.
7. Riscos de regressão, migrações, segurança e custo de provedores.
8. Proposta de menor PR possível que entregue valor e critérios de aceite verificáveis.
9. Plano de teste unitário, integração, visual e E2E.
10. Checklist de deploy/rollback; o que necessita de aprovação humana.

O Cursor pode produzir documentação antes de modificar código; não deve executar migrações de produção, modificar segredos, ativar features globalmente ou publicar dados reais sem autorização.

---
