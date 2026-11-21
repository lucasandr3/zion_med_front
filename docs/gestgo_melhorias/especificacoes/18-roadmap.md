> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 18. ROADMAP EXECUTIVO

## 18.1. Primeiro ciclo: diagnóstico e proteção do core (semanas 1–2)

- Auditar mapeamento atual e import IA; decidir estado-alvo de API para as mudanças.
- Reproduzir 8–12 PDFs sintéticos de complexidades distintas e medir tempo/error rate.
- Implementar/validar telemetria segura do fluxo documental.
- Identificar bugs/falhas de PDF e corrigir regressões críticas.
- Entrevistar alguns clientes pagantes de estética/odontologia sobre configuração de fichas, envio e recorrência.

**Gate:** baseline documentado; testes do pipeline PDF; lista de ajustes priorizada.

## 18.2. Dias 15–30: produtividade do mapeador e onboarding

- Zoom, navegação multipágina, duplicação/alinhamento/atalhos e preview sintético, conforme gaps verificados.
- Melhorar entrada “Usar minha ficha atual” no onboarding.
- Instrumentar conversão até primeiro documento assinado.
- Ajustes no site para explicar “sua ficha original, agora digital”, sem prometer detecção automática ainda.

**Gate:** melhora mensurável no tempo de configuração, sem piorar qualidade de PDF.

## 18.3. Dias 31–60: mapeamento assistido e compartilhamento

- Detectar campos estruturados e propor coordenadas em PDFs digitais.
- Avaliar IA/visão para casos restantes em piloto com PDFs sintéticos/em branco e consentimento.
- Melhorar compartilhamento manual pelo WhatsApp e estados verdadeiros de envio.
- Lançar/otimizar páginas comerciais de estética e odontologia com atribuição de tráfego.

**Gate:** detecção confiável ou fallback manual; uso do editor comprovadamente melhor; tráfego mensurado.

## 18.4. Dias 61–90: rollout de IA e monetização validada

- Testar sugestões IA com subconjunto de clientes, revisão obrigatória e limites de custo.
- Implementar reaproveitamento de mapeamentos de versões semelhantes quando seguro.
- Realizar entrevistas/pré-venda para automação WhatsApp oficial e protocolos documentais.
- Definir, sem ativar cegamente, entitlements de planos futuros.

**Gate:** decisão de expandir ou não WhatsApp oficial/protocolos com base em compromisso comercial e custo unitário.

## 18.5. Horizonte 3–6 meses (condicional)

- WhatsApp oficial por clínica, após aprovação técnica/comercial, política de mensagens e elegibilidade.
- Pacientes recorrentes melhorados e pacotes documentais por procedimento.
- Integração real com um PMS demandado pelos clientes.
- Plano Business com automações efetivamente disponíveis.

## 18.6. Horizonte 6–12 meses (somente se sustentado por dados)

- Ampliação multiempresa/integrações; auditoria avançada e relatórios; mobile e utilitários conforme adoção.
- Estratégias de parceiros e expansão de ticket para clínicas com equipe.
- Não executar várias grandes migrações ao mesmo tempo.

---
