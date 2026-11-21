> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 20. CRITÉRIOS TRANSVERSAIS DE QUALIDADE

Todas as implementações devem cumprir:

1. **Não regressão:** criar testes antes de alterar fluxo de documento assinado; cobrir import → mapear → publicar → preencher → assinar → gerar PDF → dossiê.
2. **Multi-tenancy:** negar acesso cross-organization em todas as consultas/escritas.
3. **Auth e RBAC:** respeitar sessão/cookie/CSRF e permissões atuais; não introduzir JWT local sem necessidade explícita.
4. **Versionamento:** alteração de template/documento nunca reescreve histórico já assinado.
5. **Dados sensíveis:** não inserir dados clínicos em logs, analytics, mensagens ou prompts.
6. **Acessibilidade:** editor por teclado, estados anunciados, contraste e feedback de erro.
7. **Performance:** processar PDFs grandes assincronamente quando necessário, com feedback e limites claros.
8. **Resiliência:** falha de IA, WhatsApp ou integração externa não impede workflow manual do core.
9. **Observabilidade:** registrar correlation IDs, duração, falhas e custos externos sem vazar PII.
10. **Deploy seguro:** feature flag, testes em homologação, rollback e migrações compatíveis.
11. **Qualidade documental:** fixtures multiformato e comparação visual.
12. **Eficiência de suporte:** texto de erro acionável, self-service e documentação simples.
13. **Comunicação verdadeira:** não anunciar recurso ao usuário final antes de estar operável no seu ambiente.

### Matriz mínima de testes integrados

| Cenário | Resultado esperado |
|---|---|
| PDF simples 5 campos | Mapeamento, preview e PDF final corretos |
| PDF 50+ campos/10 páginas | Edição estável e sem perda de campo |
| PDF rotacionado | Coordenadas corretas em todos os zooms |
| Texto longo | Overflow visível na prévia e tratamento definido |
| Assinatura OTP reforçada | Eventos/evidências preservados |
| Template v1 assinado e v2 editado | v1 histórica permanece íntegra |
| AI timeout/erro | Fallback manual, sem perda de edição |
| WhatsApp desconectado | Link/e-mail continuam disponíveis |
| Webhook duplicado | Estado idempotente, sem envio duplicado |
| Mesma pessoa em duas organizações | Sem vazamento cross-tenant |
| Inadimplência | Respeita soft-block e fluxos públicos atuais |
| Falha MinIO | Erro rastreável, sem marcar PDF incompleto como concluído |

---
