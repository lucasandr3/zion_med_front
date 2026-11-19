> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 22. PROMPT OPERACIONAL PARA COLAR NO CURSOR

> Este prompt foi escrito para ser usado com o arquivo **`GESTGO-PLANO-MESTRE-EVOLUCAO.md` anexado ou copiado para o workspace**, junto ao **`raiox.md`**. Iniciar por **discovery**, não por implementação indiscriminada.

```text
Você é o Tech Lead do Gestgo. Leia integralmente:
1. GESTGO-PLANO-MESTRE-EVOLUCAO.md
2. raiox.md
3. Os arquivos relevantes do código atual nos repositórios zion_med_front, zion_med, gestgo_api e gestgo-site.

Contexto de negócio confirmado:
- Gestgo já é um SaaS em produção com 25 clientes pagantes.
- Nichos principais: estética e odontologia, sobretudo profissionais solo.
- Aquisição predominante: Google/SEO/site; maioria usa recorrentemente.
- Core comercial: importar a ficha de papel/PDF da clínica, mapear manualmente os campos, permitir preenchimento e assinatura e gerar o PDF preenchido preservando layout original.
- DECISÃO CONFIRMADA: `gestgo_api` (Spring Boot / Java) é o backend canônico escolhido para evoluções futuras; `zion_med` (Laravel) é referência/paridade/contingência temporária, não alvo para novas features.
- A API ativa em produção ainda deve ser identificada; não presumir que a escolha de Java já corresponde a um cutover realizado.
- Alguns menus e integrações estão intencionalmente ocultos por não estarem prontos para operação comercial.
- Mobile /m está desligado em produção no snapshot; utilitários e push estão habilitados em homologação segundo o proprietário.
- O proprietário NÃO deseja unificar automaticamente site e SPA quanto a CTA/plan keys.

Tarefa NESTA EXECUÇÃO:
A) Auditar o HEAD atual e reconciliar o que o plano pede com o que já existe.
B) Entregar relatório objetivo por epic: existente, parcial, novo, duplicado ou dependente de decisão.
C) Priorizar a primeira implementação pequena com base em risco/impacto, começando preferencialmente pelo PDF-01A (produtividade manual) e DOC-02 (qualidade de PDF), após verificar lacunas reais.
D) Apresentar arquivos impactados, modelo de dados atual, implementação-alvo em Java, compatibilidade Angular `/api/v1`, riscos, testes, feature flags, esforço relativo e rollback.
E) Propor divisão em PRs independentes e uma checklist de aceite para cada PR.

Regras obrigatórias:
- NÃO implemente tudo de uma vez.
- NÃO altere produção, banco real, arquivos de segredos ou contas de terceiros.
- NÃO reescreva recursos existentes nem invente endpoints antes de conferir o contrato real.
- NÃO modifique PDFs assinados, snapshots, hashes ou dossiês históricos.
- NÃO envie dados pessoais de pacientes a provedores de IA, testes ou logs.
- NÃO exponha como disponível uma integração ainda oculta/incompleta.
- A decisão por Java já foi tomada pelo proprietário. NÃO reabra essa escolha nem implemente features novas em Laravel. Audite paridade e identifique o backend que atende cada ambiente antes de propor cutover.
- NÃO faça alterações de código nesta primeira execução. O objetivo agora é discovery e plano técnico para aprovação.

Formato da resposta:
1. Resumo do repositório atual e diferenças versus raiox.md.
2. Tabela de status dos EPICs.
3. Diagnóstico detalhado do editor/mapeador de PDF atual.
4. Proposta dos três primeiros PRs, cada um com escopo fechado.
5. Arquivos/funções/classes impactados com evidência de caminhos.
6. Matriz Laravel × Java dos contratos atuais e compatibilidade com Angular `/api/v1`; lacunas para cutover.
7. Testes, riscos, esforço relativo e rollback.
8. Perguntas objetivas que só o proprietário pode responder.

Aguarde aprovação explícita antes de modificar código.
```

### Modo de execução recomendado após discovery aprovado

Para cada PR: 1) confirmar escopo, 2) criar branch, 3) testes de comportamento atual, 4) implementar mudança mínima, 5) testes e evidências visuais, 6) revisar diff, 7) homologação com PDF sintético, 8) aprovação para deploy, 9) monitorar, 10) expandir rollout. Não fazer “big bang”.

---
