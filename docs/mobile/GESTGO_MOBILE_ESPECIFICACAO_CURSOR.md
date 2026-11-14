# Gestgo Mobile — especificação funcional e técnica para implementação

**Versão:** 1.1 · 13/11/2026  
**Referência visual e comportamental:** `gestgo_mobile_prototipo_v2.html`  
**Arquitetura de domínios, autenticação e implantação:** `ARQUITETURA_SUBDOMINIOS_GESTGO.md`  
**Escopo:** duas experiências em subdomínios (`painel.gestgo.com.br` e `app.gestgo.com.br`), reutilizando autenticação, dados, regras de negócio e APIs do Gestgo; site institucional em `gestgo.com.br`.

> **IMPORTANTE:** O HTML é um protótipo navegável com dados fictícios. Não está conectado ao ambiente real. Use-o como referência de UX, e **não** como arquitetura ou código de produção. Inspecione o repositório antes de propor ou alterar endpoints, tabelas, permissões e rotas.

## 1. Objetivo do produto

Profissionais solo devem conseguir, pelo celular, **enviar uma ficha, localizar paciente e acompanhar assinaturas/pendências rapidamente**, sem navegar pela interface administrativa completa do desktop.

Princípio principal: **Início = funcionalidades centrais do Gestgo. Ferramentas extras = somente aba “Ferramentas”.**

Não transformar a experiência mobile em um ERP completo nem criar novos módulos clínicos neste ciclo.

### Público

Profissionais solo, com predominância inicial de estética, harmonização e biomedicina estética, **sem limitar o Gestgo a essas categorias**. Rótulos devem ser amplos o suficiente para outras especialidades.

## 2. Separação por subdomínios (decisão de produto)

| URL proposta | Destino |
|---|---|
| `https://gestgo.com.br` | Site institucional, marketing e entrada |
| `https://painel.gestgo.com.br` | Sistema completo (desktop e acesso avançado) |
| `https://app.gestgo.com.br` | Experiência Gestgo Mobile, com aba Ferramentas |

Os endereços são **destinos desejados**, não evidência de DNS/hosting já configurado. A mesma conta, assinatura, tenant, API e banco continuam válidos. Escolher arquitetura de frontend (uma aplicação orientada por hostname ou duas entradas compartilhando serviços) **depois de inspecionar a stack atual**. Não criar aplicativos independentes com código de domínio duplicado.

**Acesso:** o botão Entrar no site pode sugerir `app` no celular e `painel` no computador, com opção manual visível para abrir qualquer um. Não forçar redirecionamentos ao acessar diretamente um dos subdomínios. O menu do app deve ter **Abrir painel completo**; o painel pode oferecer **Abrir Gestgo Mobile**. Manter links públicos existentes de ficha e assinatura funcionando, independentemente da mudança dos endereços administrativos.

**Autenticação:** preservar mecanismo existente e validar login, logout, autorização, troca entre hosts, cookies/sessões, callbacks, CSRF, CORS e isolamento por organização. Subdomínios **não** compartilham automaticamente `localStorage` ou cookies host-only. Não alargar o domínio de cookies sem análise de segurança. A implantação deve usar staging, HTTPS, testes de links existentes e plano de rollback. Detalhes e checklist em `ARQUITETURA_SUBDOMINIOS_GESTGO.md`.

## 3. Estrutura de navegação mobile

Barra inferior fixa, com quatro abas:

| Aba | Finalidade | Conteúdo |
|---|---|---|
| **Início** | Resumo operacional do Gestgo | CTA de enviar ficha, indicadores de documentos, atalhos para pacientes, modelos, pendências e assinaturas; lista de pendências |
| **Pacientes** | Localizar e consultar | Busca, listagem, resumo da documentação e ação “Enviar ficha” |
| **Fichas** | Usar modelos existentes | Busca de formulários/termos, abertura de fluxo de envio existente |
| **Ferramentas** | Utilitários independentes do núcleo do Gestgo | Calculadora, orçamento, mensagens e outros utilitários, com filtros por categoria |

Nas telas internas, manter navegação de retorno previsível e a barra inferior disponível quando apropriado. Ao clicar em uma aba, fechar a tela interna e abrir a aba selecionada.

**Não colocar cards, atalhos, recomendações ou banners de ferramentas extras na aba Início**, nem nas telas de pacientes/fichas. O menu Ferramentas pode conter utilitários novos que ainda não fazem parte do Gestgo, mas nenhum deles deve ser ativado fora dessa área.

## 4. Especificação da página Início (prioridade P0)

Ordem dos componentes:

1. Cabeçalho Gestgo e acesso à central de notificações documentais.
2. Saudação e instrução curta: acesso a pacientes, fichas e assinaturas.
3. **CTA primário “Enviar ficha agora”**, destacado e visível sem rolagem excessiva.
4. Indicadores: documentos enviados, pendentes e assinados. Números devem vir de dados reais do usuário/organização; definir a janela temporal com base na semântica existente do produto, rotulando-a se aplicável. **Não inventar valores ou usar contagens fixas.**
5. Grade de atalhos **exclusivamente Gestgo**: Pacientes, Modelos de fichas, Pendências, Assinaturas.
6. Lista curta de fichas pendentes, com paciente, modelo e status; link “Ver todas”.

### Comportamentos

- “Enviar ficha agora” abre o fluxo **real e existente** de seleção de modelo, paciente e compartilhamento.
- “Pacientes” abre a aba Pacientes.
- “Modelos de fichas” abre a aba Fichas.
- “Pendências” abre a listagem de documentos filtrada por pendentes.
- “Assinaturas” abre a listagem de documentos filtrada por assinados/concluídos.
- A central de notificações deve refletir **somente ocorrências do Gestgo** nesta etapa.
- Exibir estados de loading, vazio e erro, e CTA de tentar novamente quando necessário.

### Estados vazios sugeridos

- Sem pendências: “Tudo em dia! Nenhuma ficha aguardando assinatura.”
- Sem modelos: “Você ainda não tem modelos disponíveis. Crie-os no painel completo.”
- Sem pacientes: “Nenhum paciente encontrado.”

## 5. Pacientes (P0)

- Buscar por nome respeitando o comportamento e a autorização já existentes.
- Listar pacientes acessíveis ao profissional/organização autenticada.
- Ao abrir paciente, visualizar identificação mínima e status das fichas disponíveis.
- Ação “Enviar ficha” usa os fluxos reais. Não duplicar backend.
- Não mostrar ferramentas extras ou usar o menu de mensagens como atalho na ficha do paciente neste ciclo.

## 6. Fichas e assinaturas (P0)

- Reutilizar modelos, status, documentos e permissões existentes.
- Permitir busca de modelos e envio com poucos toques.
- Implementar visualização de documentos com filtros `Pendentes`, `Assinadas`, `Todas`, apenas se esses estados correspondem à modelagem real; adaptar os nomes à semântica atual do Gestgo.
- Quando o documento já foi assinado, manter a referência à versão/evidência correta e não gerar um novo documento por engano.
- Evitar mostrar conteúdo sensível em notificações do dispositivo, analytics ou URLs.

**Fluxo-alvo:** entrar no Gestgo → tocar “Enviar ficha agora” → escolher modelo e paciente → compartilhar link autorizado. Meta de UX: tornar a ação principal rápida e óbvia, sem sacrificar confirmações de segurança.

## 7. Ferramentas — separadas do núcleo do produto

A aba **Ferramentas** é uma coleção independente de utilitários com filtro por categoria. Na interface do protótipo há oito itens:

| Ferramenta | Categoria | Comportamento esperado | Fase sugerida |
|---|---|---|---|
| Preço e lucro | Financeiro | Simular preço com custo de materiais, tempo, valor/hora, taxa e margem | Fase A |
| Orçamento rápido | Financeiro | Gerar texto com procedimento, sessões, preço e desconto; copiar/compartilhar | Fase A |
| Mensagens prontas | Relacionamento | Templates editáveis para confirmação, pendência documental e retorno | Fase A |
| Checklist da sala | Organização | Lista de conferência pessoal, com reinício e, se desejado, persistência local | Fase B |
| Pacotes e sessões | Organização | Registrar e consultar saldo, **somente quando houver regras reais e consistência de dados** | Fase B |
| Estoque e validade | Organização | Listar materiais, quantidades e validade; atenção a alertas e permissões | Fase B |
| Taxas de cartão | Financeiro | Simular recebimento líquido, com taxa informada manualmente | Fase B |
| Retornos | Relacionamento | Lista de contatos e acompanhamento, sem prometer agenda automática | Fase B |

**Regra para produção:** recursos ainda não implementados devem estar ocultos ou marcados claramente como “Em breve”, sem controles que aparentem persistir dados quando não persistem. Não copiar os dados fictícios do protótipo.

### Regras mínimas das três ferramentas da Fase A

**Preço e lucro**

- Entradas não negativas; taxa e margem entre 0 e 100%, exigindo `taxa + margem < 100%`.
- Definição explícita da fórmula: `custo_base = materiais + (minutos / 60) * valor_hora`; `preco_sugerido = custo_base / (1 - taxa - margem)` onde taxa e margem estão em fração.
- Explicar que não inclui impostos, aluguel e custos não informados; **não apresentar como aconselhamento financeiro**.
- Limitar entradas, tratar `NaN`, números excessivos e divisões inválidas.

**Orçamento rápido**

- Campos: nome, procedimento/serviço, número de sessões, preço por sessão, desconto opcional.
- Validações: `sessões >= 1`, valores não negativos, desconto não maior que o total bruto.
- Exibir total, cópia e botão de compartilhamento via APIs disponíveis no dispositivo, com fallback adequado.
- Não inserir dados clínicos/sensíveis em mensagem compartilhada sem o usuário revisar.

**Mensagens prontas**

- Templates editáveis e pré-visualização antes do envio.
- WhatsApp deve abrir apenas mediante toque explícito do profissional.
- Não automatizar envio em nome do profissional nesta fase.
- Não inserir link de ficha fictício ou inventado; usar apenas o link retornado pelo backend autorizado.

## 8. Requisitos técnicos e integração

### 8.1 Descoberta do projeto (antes de codificar)

O agente Cursor deve inspecionar e documentar:

- stack do front-end e arquitetura do roteamento;
- componentes visuais reutilizáveis / design system;
- mecanismos de autenticação, autorização e seleção de organização/tenant;
- modelos e endpoints **já existentes** de pacientes, fichas, envios e documentos assinados;
- indicadores/status já computados no backend;
- testes existentes e convenções do projeto;
- comportamento atual em mobile e desktop.

**Não presumir** que o projeto usa React, Next.js, Vue, Laravel ou qualquer outra tecnologia. Não criar endpoints novos se os existentes já resolvem o problema.

### 8.2 Arquitetura desejada

- **Layout mobile dedicado**, não apenas esconder elementos do desktop com CSS.
- **Mesmo backend e autenticação** do Gestgo.
- **Mesmo modelo de permissões**. Nunca buscar ou renderizar dados de outra organização.
- Preferencialmente compartilhar serviços, hooks/composables, tipos e regras; separar somente composição e navegação da UI. A divisão por hostname não deve duplicar a lógica de domínio.
- Usar breakpoints para responsividade dentro de cada experiência. A escolha do destino por tamanho de tela pode acontecer no CTA Entrar do site, com opção manual; **não** redirecionar obrigatoriamente acessos diretos com base em user-agent ou largura.
- Evitar renderização duplicada do conteúdo sensível em árvores invisíveis.
- Não criar PWA ou aplicativo nativo neste escopo. Instalação no celular é evolução opcional, restrita ao host `app` se ativada no futuro.

### 8.3 Contratos lógicos (pseudocódigo, **não são URLs existentes**)

O Cursor deve mapear essas operações para serviços reais do projeto:

```ts
interface MobileHomeSummary {
  totalDocuments: number;      // escopo e período explícitos
  pendingDocuments: number;
  signedDocuments: number;
  pendingItems: Array<{
    id: string;
    patientId: string;
    patientDisplayName: string;
    formDisplayName: string;
    status: string;
    updatedAt: string;
  }>;
}

// Operações que precisam ser mapeadas para os serviços existentes:
// getMobileSummary() | listPatients(query) | listFormTemplates(query)
// listDocuments(status) | startFormSend(templateId, patientId)
// openDocument(documentId)
```

Esses nomes são apenas um contrato conceitual. **Não** representam endpoints oficiais do Gestgo nem autorização para refatorar persistência.

### 8.4 Segurança e privacidade

- Dados de saúde podem ser sensíveis: não transmitir dados desnecessários, não inserir dados reais em mocks ou logs.
- Preservar isolamento por tenant, RBAC, regras de expiração de links, trilha de auditoria e integridade de documentos/assinaturas.
- Não incluir identificadores sensíveis em URLs de WhatsApp, analytics ou notificações.
- Tratar permissões de câmera/armazenamento somente quando uma funcionalidade as exigir; não solicitá-las na home.
- Não assumir que screenshot/compartilhamento ou foto clínica pode ser usado promocionalmente sem base legal/autorização apropriada.

### 8.5 UX e acessibilidade

- Larguras de teste: 320, 360, 390, 430 e 768 px; zero scroll horizontal.
- Bottom nav com padding de safe area e sem cobrir conteúdo rolável.
- Alvos de toque preferencialmente de ao menos 44 × 44 px.
- Contraste suficiente, foco visível, rótulos acessíveis, navegação por teclado quando aplicável.
- Estado da aba selecionada anunciado via `aria-current`/equivalente apropriado.
- Evitar skeletons intermináveis; oferecer recuperação de erro e mensagens claras.
- Não abrir telas de ferramentas ao navegar pelos cards da home.

## 9. Etapas de implementação

### Entrega 1 — Navegação e experiência mobile (P0)

1. Revisar repositório, hosts atuais, autenticação, rotas públicas e serviços existentes; definir como servir `app` e `painel` sem interromper links antigos.
2. Criar layout mobile dedicado em `app.gestgo.com.br` com abas: Início, Pacientes, Fichas, Ferramentas.
3. Entregar a home **somente Gestgo**, sem tiles de calculadora, orçamento, mensagens, pacotes etc.
4. Reaproveitar telas/serviços de pacientes, fichas, assinaturas/pendências.
5. Garantir que a experiência desktop completa esteja acessível em `painel.gestgo.com.br`, sem regressões e com plano de migração reversível do endereço anterior.
6. Implementar estados de carregamento, erro e vazio.
7. Validar login/logout e transição entre subdomínios, com troca manual de versão e sem redirecionamento forçado.

### Entrega 2 — Ferramentas Fase A (P1)

1. Criar listagem/filtros da aba Ferramentas.
2. Implementar calculadora de preço, orçamento rápido e mensagens prontas como ferramentas simples.
3. Testar validações, copiar, compartilhamento explícito, teclado mobile e estados de erro.
4. Deixar demais ferramentas para Fase B ou identificadas como futuras.

### Entrega 3 — Ferramentas Fase B (P2, após validação)

Checklist; pacotes/sessões; estoque; simulação de taxas; retornos. Priorizar com base no uso e na disposição a pagar, não apenas na facilidade de programar.

## 10. Critérios de aceite verificáveis

- [ ] Acessar `app.gestgo.com.br` abre a interface mobile própria, com navegação inferior funcional, independentemente do dispositivo.
- [ ] Acessar `painel.gestgo.com.br` abre o sistema completo sem redirecionamento obrigatório para `app`.
- [ ] `gestgo.com.br` oferece entrada recomendada por tela e escolha manual; app e painel permitem alternar versões.
- [ ] Mesma autenticação, assinatura, backend e tenants; login/logout/CSRF/CORS testados entre as origens.
- [ ] Links públicos existentes e assinaturas continuam funcionais; HTTPS, implantação gradual e rollback preparados.
- [ ] A aba Início **não contém qualquer ferramenta extra** nem links diretos a elas.
- [ ] A aba Início contém enviar ficha, indicadores, pacientes, modelos, pendências e assinaturas.
- [ ] Indicadores e listas correspondem aos dados e permissões reais (sem números hardcoded).
- [ ] “Enviar ficha” usa o fluxo real de envio e retorna feedback de sucesso/erro.
- [ ] Pacientes e fichas têm busca e estados vazio/loading/erro.
- [ ] Filtros de pendente/assinado/todos funcionam, respeitando a semântica existente.
- [ ] Todas as ferramentas extras estão acessíveis **somente** pela aba Ferramentas.
- [ ] Sem vazamento de dados entre tenants ou exposição de dados sensíveis em URL/log.
- [ ] Sem scroll horizontal em 320/360/390/430 px; bottom nav não cobre CTAs.
- [ ] Sem regressões no layout desktop, nos formulários ou nas assinaturas existentes.
- [ ] Testes automatizados cobrindo navegação, fluxo principal, filtros e validações.

## 11. Evidências solicitadas ao Cursor

Ao concluir, fornecer:

1. Resumo dos arquivos alterados e mapeamento dos hosts/rotas antigas e novas.
2. Lista de rotas/serviços **efetivamente existentes** reutilizados.
3. Prints da home e da aba Ferramentas em viewport 390 × 844.
4. Resultados dos testes (incluindo auth, troca de host, links públicos e regressão desktop) e pendências conhecidas.
5. Confirmação de que dados reais não foram substituídos por fixtures.
6. Identificação explícita do que foi entregue e do que continua mock/“Em breve”.

## 12. Fora de escopo imediato

- ERP completo, estoque robusto, agenda própria complexa, prontuário clínico completo.
- Integração automática com WhatsApp Business API.
- IA para diagnóstico/orientação clínica.
- Aplicativo nativo iOS/Android.
- Reestruturação do backend, migração de dados ou mudança de planos/preços.
- Substituição de fluxos de assinatura e evidência já implementados.
- Duplicação de backend/contas; criação de apps nativos; ativação de novos hosts sem homologação.

---

**Prioridade absoluta:** preservar o Gestgo existente, separar `painel` e `app` sem duplicação, melhorar o uso no celular e manter **Gestgo** e **Ferramentas** separados na navegação mobile.
