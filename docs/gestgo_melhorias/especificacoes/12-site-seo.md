> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 12. EPIC MKT-08 — SITE, SEO E FUNIL COMERCIAL

**Prioridade:** P0/P1, em paralelo ao produto.  
**Dado comercial:** os 25 clientes foram adquiridos predominantemente por Google/SEO/site.  
**Princípio:** vender o que já existe e é comprovado; não anunciar mapeamento automático até estar implantado.

## 12.1. Posicionamento central

Mensagem-mãe candidata:

> **“Sua ficha atual, agora digital. Preserve o documento da clínica e receba as informações preenchidas e assinadas.”**

Submensagem: “Importe seu PDF, mapeie os campos, compartilhe com o paciente e organize os documentos assinados.”

Evitar claims do tipo “100% seguro juridicamente”, “validade jurídica garantida”, “documentação obrigatória resolvida automaticamente” ou “não precisa de consentimento”, pois dependem do contexto jurídico e operacional.

## 12.2. Páginas e conteúdos prioritários

- Landing principal centrada em **ficha própria** e demonstração de antes/depois.
- Página específica para **Estética**.
- Página específica para **Odontologia**.
- Páginas de problemas específicos com intenção comercial, definidas por consultas reais do Search Console (ex.: digitalizar ficha de anamnese, consentimento digital, converter PDF em ficha preenchível).
- Casos de uso com informações sintéticas ou depoimentos **autorizados**; sem expor dados de pacientes.
- FAQ real sobre assinatura, mapeamento manual, PDF final, reutilização de fichas e necessidade de integração.
- Conteúdo informativo revisado quando envolver deveres profissionais, legislação ou clínica.

## 12.3. SEO técnico e conversão

- Analisar Search Console: marca versus não-marca, consultas, páginas de entrada, impressões, CTR e posição média.
- Conferir indexação, canonical, sitemap, robots, titles, descrições e performance em mobile.
- Garantir que preços/CTA relevantes sejam utilizáveis mesmo quando API `/landing` falha, **sem forçar unificação do site com SPA** (decisão explícita do proprietário).
- Garantir que demonstração em página não dependa de ter acesso a documentos reais.
- Medir cliques em teste grátis, início de cadastro, criação de conta e conversão, com atribuição UTM/gclid quando disponível e política de retenção adequada.
- Não criar páginas duplicadas em massa ou conteúdo SEO automatizado sem valor original.

## 12.4. Testes de posicionamento

A/B ou testes sequenciais de mensagens, quando o volume de tráfego permitir:

1. “Digitalize a ficha que já usa” versus “Formulários e assinaturas digitais”.
2. Demonstração interativa curta versus screenshot estático.
3. Landing nichada versus genérica.

**Cuidado estatístico:** com base pequena, evitar concluir que uma variação vence por poucas conversões. Registrar intervalo, amostra, origem e coortes.

## 12.5. Critérios de aceite

- Páginas explicam claramente uso do PDF original.
- Alegações de produto correspondem à versão em produção.
- Principais conversões são rastreáveis sem vazamento de dados clínicos.
- Site e SPA podem manter jornadas/CTAs distintos conforme decisão do proprietário.
- SEO não compromete velocidade de carregamento nem acessibilidade.

---
