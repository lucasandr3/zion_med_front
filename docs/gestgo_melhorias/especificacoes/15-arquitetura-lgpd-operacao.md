> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 15. EPIC OPS-11 — ARQUITETURA, PERFORMANCE, SEGURANÇA E OPERAÇÃO

**Prioridade:** P0 transversal.

## 15.1. Decisão arquitetural: Spring Boot como backend canônico

**Decisão do proprietário (19/11/2026):** o backend canônico do Gestgo será **`gestgo_api` (Java 21 / Spring Boot 3.5)**. Esta é uma decisão de arquitetura e roadmap, **não uma afirmação de que Java já está em produção**. O relatório original não identificou com certeza a stack por trás de `api.gestgo.com.br`.

### Regra para todo novo desenvolvimento

- Implementar novas regras, serviços, endpoints, jobs, webhooks, integrações e controles de plano **somente em `gestgo_api`**, após verificar se já existem. Não abrir desenvolvimento funcional paralelo em `zion_med`.
- Manter `zion_med` (Laravel) **como referência de comportamento, mapeamento de regras e contingência enquanto necessário**. Não desativar o Laravel nem modificar deploy automaticamente.
- Preservar o **contrato `/api/v1` já consumido pelo Angular**: rotas, métodos, payloads, paginação, erros, códigos HTTP, upload/download, cookies/CSRF e `X-Organization-Id`. Mudanças incompatíveis exigem versionamento ou adaptação consciente e testes.
- Não copiar diretamente `SourcePdfFillService`/FPDI, jobs Laravel ou o esquema de banco para Java: identificar sua implementação equivalente e testar a fidelidade do PDF; usar o PHP como *oráculo de comportamento*, não como biblioteca invocada implicitamente.
- Mudanças puramente no editor Angular podem avançar isoladas, desde que persistam o schema/JSON de coordenadas compatível e não alterem PDFs históricos.

### Checklist de migração e paridade antes do cutover de produção

1. **Inventário de ambiente**: confirmar qual backend serve prod/homolog, versionamento, rotas, bancos, storage, workers e schedulers em cada ambiente.
2. **Matriz de contratos**: documentar para cada fluxo crítico endpoint Laravel, equivalente Java, estado, resposta, autorização, side effects e teste correspondente. Classificar como PARIDADE / DIFERENÇA INTENCIONAL / AUSENTE / NÃO VERIFICADO.
3. **Fluxos críticos**: cobrir login/sessão/CSRF, tenant/RBAC, trials e Asaas, templates e versões, `/f/:token`, gate/OTP, assinatura, snapshot, preenchimento de PDF de origem, arquivo MinIO, hash, dossiê, verificação pública, cópia do paciente e reconsentimento.
4. **Jobs e idempotência**: comparar envio de e-mails, lembretes, geração de PDF, webhooks e tarefas LGPD; não deixar workers PHP e Java consumirem o mesmo evento sem coordenação.
5. **Persistência**: conferir compatibilidade PostgreSQL, migrations Flyway, colunas, constraints, relacionamentos, histórico e chaves; proibir migração destrutiva em produção sem plano separado e backup/restauração verificados.
6. **Contrato de documento**: criar conjunto de PDFs sintéticos (múltiplas páginas, acentos, fontes, checkbox, assinatura, campos longos) e comparar saída/posições com tolerâncias explícitas, preservando snapshots e hashes existentes.
7. **Autenticação e escopo**: testar cookies HttpOnly, CSRF, CORS, `X-Organization-Id`, permissões e isolamento entre organizações.
8. **Carga e confiabilidade**: testar com dados equivalentes em homologação; observar p95, erros, fila, RAM/CPU, pool de conexões, MinIO e custos. Performance valida capacidade, **não reabre a decisão de tecnologia**.
9. **Cutover controlado**: checklist de go/no-go, implantação gradual quando suportado, alarmes, rollback de tráfego, versão de dados compatível e responsável de aprovação. Não presumir que alternar o proxy é suficiente para reverter migrations.
10. **Desativação do Laravel**: somente após Java operar com paridade e estabilidade comprovadas, com decisão explícita de retirada e garantia de acesso aos históricos.

**Princípio de execução:** escolher Java como alvo não torna obrigatória uma migração completa antes de melhorar a interface Angular. Evitar implementação duplicada e liberar features gradualmente na API Java quando estiver pronta para o tráfego correspondente.

## 15.2. LGPD e segurança

- Dados de saúde são sensíveis; aplicar minimização, segregação, controles de acesso, retenção e base legal adequada.
- O editor e o detector de campos trabalham preferencialmente com PDF **em branco**, não dados de pacientes.
- Não enviar documentos clínicos reais a provedores de IA sem validação jurídica/contratual, controles adequados e necessidade comprovada.
- Tokens públicos de formulário devem permanecer difíceis de adivinhar, revogáveis quando aplicável e protegidos por fluxos existentes de identidade.
- Reforçar auditoria sobre acesso a PDF, compartilhamentos, credenciais de integração e administração de planos.
- Manter hash/snapshot/evidências sem reescrita histórica.
- Verificar exportação/exclusão e retenção de dados, inclusive backups, eventos e arquivos temporários.
- Preparar documentação contratual/comercial (DPA etc.) com revisão jurídica especializada, já mencionada como backlog.

## 15.3. Observabilidade

- Verificar monitoramento real informado pelo proprietário; não presumir que não exista apenas porque ErrorHub está desabilitado no commit.
- Monitorar falhas do PDF, filas, MinIO, imports IA, envio de mensagens, OTP, Asaas e API ativa.
- Correlation ID por fluxo e organização, sem gravar dados de saúde em logs.
- Alarmes de taxa de erro, fila parada, PDF não gerado, webhook com falhas e custos fora de faixa.
- Dashboard interno operacional para intervenção rápida sem suporte manual extensivo.

## 15.4. CI/CD e rollback

- Testes automáticos para core documental obrigatórios.
- Feature flags por ambiente/organização; migrações compatíveis com versões antiga/nova onde possível.
- Deploy gradual; rollback de frontend/backend e desativação de detecção IA/WhatsApp sem quebrar editor manual.
- Backups e restore testados, com retenção e controle de acesso documentados.

## 15.5. Critérios de aceite

- Nenhuma mudança em edição/mapeamento compromete protocolos existentes.
- Todo incidente crítico pode ser diagnosticado com métricas, logs sanitizados e IDs técnicos.
- Há procedimento testado de rollback de feature e restauração, sem dependência de acesso casual a produção.

---
