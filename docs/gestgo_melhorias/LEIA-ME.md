# Pacote de evolução Gestgo — Cursor (versão 1.1)

**Decisão técnica tomada:** `gestgo_api` (Spring Boot / Java) é o backend canônico para novas funcionalidades. O Laravel (`zion_med`) é referência para paridade e contingência durante a transição. **A stack ativa em produção permanece não verificada.**

**Comece por:** `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (documento consolidado).

**Decisão arquitetural:** `DECISAO-ARQUITETURA-JAVA.md`.

**Contexto técnico:** `raiox.md` (auditoria de 19/11/2026, snapshot; revalidar no HEAD).

**Para colar no Cursor:** `PROMPT-INICIAL-CURSOR.txt`.

**Leitura segmentada:** diretório `especificacoes/`, com as 24 seções do documento mestre, sincronizadas com a versão 1.1.

**Regras:** não implementar tudo de uma vez, não alterar produção sem autorização, não duplicar recursos existentes, preservar versões/assinaturas/arquivos históricos. Primeiro fazer discovery, matriz de paridade Java × Laravel e proposta de PRs. Toda feature nova de backend deve ter Java como alvo; mudanças no frontend podem avançar de forma independente sem romper o contrato `/api/v1`.
