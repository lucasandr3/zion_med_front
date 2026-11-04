# 01 — PRD — Requisitos do produto

**Produto:** Gestgo  
**Repos:** `zion_med` (API Laravel) · `zion_med_front` (SPA Angular)  
**Data de referência:** outubro/2026 (estado atual do código)  
**Nome comercial:** Gestgo · nomes legados de pasta: `zion_med` / `zion_med_front`

---

## 1. Visão geral

Gestgo é um SaaS B2B de **fichas, consentimentos e documentação clínica digital** para clínicas e negócios de saúde/bem-estar. O paciente recebe um link, preenche e assina digitalmente; a clínica recebe protocolo, PDF, trilha de evidências e fluxo de revisão.

> Posicionamento: *"Organize e proteja os processos da sua clínica sem substituir seu sistema atual."*  
> Não é prontuário completo, ERP médico nem form builder genérico.

---

## 2. Problema

Clínicas enfrentam:

- Papel e documentos dispersos (planilhas, WhatsApp, PDFs soltos)
- Falta de histórico, protocolo e evidência formal
- Risco operacional/jurídico por ausência de registro rastreável
- Processos internos desorganizados entre recepção e atendimento

Sistemas clínicos tradicionais focam em prontuário e faturamento e deixam lacunas na **documentação operacional** (anamneses, termos, checklists, pesquisas).

---

## 3. Solução (estado atual)

| Capacidade | Status |
|------------|--------|
| Modelos de fichas (templates) com campos dinâmicos | Produção |
| Link público / envio por e-mail ou WhatsApp | Produção |
| Identificação do paciente (CPF/código + nascimento + confirmação de nome) | Produção |
| Assinatura em canvas + aceite + OTP (nível reforçado) | Produção |
| Protocolo automático + PDF + cópia para paciente | Produção |
| Dossiê ZIP (PDF + JSON de evidências) + timeline | Produção |
| Cadastro de pessoas, revisão/aprovação, revogação, reconsentimento | Produção |
| Multi-empresa (organização), papéis e permissões | Produção |
| Billing (trial / Asaas), Link na bio, Feegow, WhatsApp Evolution | Produção |
| Área de plataforma (admin Gestgo) | Produção |
| Go Assistant (ajuda contextual no SPA) | Produção |

---

## 4. Público-alvo

### Primário

- Clínicas de estética e harmonização
- Odontologia
- Fisioterapia / clínicas médicas PME
- Veterinária (nicho suportado com templates padrão)

### Perfis de uso

| Perfil | Quem | Uso típico |
|--------|------|------------|
| Decisor | Dono / gestor | Configuração, assinatura, usuários, integrações |
| Operacional | Recepção / staff | Envios, pessoas, protocolos (leitura) |
| Gestor clínico | Manager | Templates, aprovação, dossiê |
| Paciente / cliente | Externo | Formulário público (`/f/{token}`), link-bio (`/l/{slug}`) |
| Platform admin | Equipe Gestgo | Clientes, planos, leads, configs de infra |

---

## 5. Personas e jornadas principais

1. **Dono da clínica** — cria conta / trial → configura empresa → publica modelo → envia link → acompanha assinaturas e billing.
2. **Recepção** — cadastra pessoa → envia documento → acompanha caixa de envios → baixa PDF/protocolo.
3. **Paciente** — abre link → identifica-se → confirma entendimento → assina → baixa cópia (72h).
4. **Admin da plataforma** — monitora tenants, assinaturas, leads da landing e status dos serviços.

---

## 6. Requisitos funcionais (RF)

### 6.1 Autenticação e conta

- Login, logout, esqueci/redefinir senha
- Verificação de e-mail (middleware `verified` nas rotas de clínica)
- Preferências de aparência (tema, dark mode, shell preset)
- Assinatura eletrônica do usuário (staff cosign)
- Exportação de dados / exclusão de conta (LGPD básico)

### 6.2 Organização (empresa)

- Dados cadastrais, logo, nicho, tema público
- Nível de segurança de assinatura: `basic` | `reinforced` (default `reinforced` em orgs novas)
- Retenção de protocolos / preview de anonimização
- Troca de empresa (usuários com `can_switch_clinic`)

### 6.3 Usuários e permissões

- CRUD de usuários no tenant
- Papéis da organização (`organization_roles`) + catálogo de permissões
- Perfis legados ainda referenciados: Owner / Manager / Staff (mapeados para permissões granulares)

### 6.4 Modelos de fichas (templates)

- Criar (biblioteca, em branco, duplicar), editar, campos, ordenação
- Tipos de campo: texto, textarea, número, data, select, radio, checkbox, arquivo, assinatura, etc.
- Regras de visibilidade, etapas clínicas (TCLE), quiz de compreensão, validade de consentimento
- Versionamento (`form_template_versions`) no publish / geração de link
- Link público com token e expiração; modo `person_link` para consentimentos

### 6.5 Formulário público

- Gate de identidade (Opção B: CPF|código + nascimento → confirmação do nome)
- Prefill a partir de `people`
- Ack / scroll / quiz conforme tipo de documento
- Assinatura + termos; OTP no nível reforçado
- Submit → protocolo + snapshot + PDF + e-mails clínica/paciente
- Tela de sucesso com download de cópia do paciente

### 6.6 Envios de documento

- Canais: e-mail | WhatsApp
- Caixas: pendentes, assinados, expirados, cancelados
- Reenvio, cancelamento, lembretes agendados

### 6.7 Protocolos (submissões)

- Listagem filtrável, detalhe, timeline, PDF, dossiê ZIP
- Aprovar / reprovar, comentários, valores staff
- Revogar, solicitar reconsentimento
- Exportação CSV

### 6.8 Pessoas

- CRUD + ficha; vínculo com submissões e envios
- PII com hash (CPF/e-mail) e criptografia de legado via comando
- Reconsentimento a partir da pessoa

### 6.9 Link na bio e presença pública

- Página `/l/{slug}` com layouts (incl. vet), analytics de views/cliques/CTA
- Formulários públicos listados; Google Reviews opcional
- Integração Feegow (agendamento / disponibilidade no fluxo público)

### 6.10 Billing

- Trial configurável (Asaas)
- Checkout, troca de plano, cancelamento
- Soft/hard block por status de assinatura / grace period
- Rotas liberadas sob bloqueio: billing, logout, formulário público, webhooks

### 6.11 Integrações

- Webhooks da clínica + tokens de API
- Feegow (token, catálogos, disponibilidade, agendamentos)
- WhatsApp via Evolution API (instância, QR, pair, teste)
- Conector Business Hub (`/api/v1/conector/*`)
- Go Assistant (histórico / eventos)

### 6.12 Plataforma (Gestgo)

- Dashboard, clientes/tenants, leads, tráfego landing
- Assinaturas, faturas, planos
- Configurações / integrações de infra (Asaas, MinIO, Resend, Business Hub)
- Release notes, e-mails manuais, organizações online, logs

### 6.13 Compliance e conteúdo

- Termos de uso e privacidade no SPA
- Verificação pública de documento (`/verificar/{code}`)
- Relatório de compliance da organização
- Páginas legais / retenção — evolução contínua (DPA formal ainda em backlog)

---

## 7. Requisitos não funcionais (RNF)

| Área | Requisito |
|------|-----------|
| Stack front | Angular 21, zoneless, Tailwind 4, design system próprio inspirado no Nord |
| Stack back | Laravel 12, PHP 8.4+, Sanctum, PostgreSQL em produção |
| Multi-tenant | Escopo por `organization_id` (global scopes + header `X-Clinic-Id`) |
| Segurança | Throttle em auth e links públicos; OTP; hashes SHA-256; segregação tenant |
| Storage | MinIO/S3 (submissões, anexos, assets, faturas) ou local em dev |
| E-mail | Resend (transacional + fila) |
| Filas | `database`/`sync`; workers Supervisor em VPS |
| Observabilidade | ErrorHub opcional no front; audit logs; presence |
| Acessibilidade / i18n | UI em pt-BR; contraste AA nos temas claros |

---

## 8. Fora de escopo (não objetivos atuais)

- Prontuário eletrônico completo / PEP hospitalar
- Faturamento de convênios / TISS
- Telemedicina avançada
- BI analítico avançado
- OpenAPI/Swagger completo para parceiros (ainda backlog)

---

## 9. Métricas de sucesso (produto)

- Clínicas pagantes e retenção (trial → active)
- Uso de ≥ 3 modelos por cliente ativo
- Taxa de conclusão de assinatura (envio → assinado)
- Tempo médio até primeiro protocolo publicado
- Churn e ticket (faixa documentada na SPEC: ~R$ 147–397/mês conforme maturidade)

---

## 10. Glossário de UI (rótulos canônicos)

| Conceito técnico | Rótulo na UI |
|------------------|--------------|
| Organization | Empresa |
| FormTemplate | Modelo / Modelos de fichas |
| FormSubmission | Protocolo |
| Person | Pessoa |
| DocumentSend | Envio de documento |
| Links públicos | Formulários públicos |

---

## 11. Referências internas

- Backend README e `produto/PRD.md` (visão histórica MVP)
- `zion_med/docs/SPEC_CONCORRENCIA_ASSINATURA_DIGITAL.md`
- `zion_med/docs/PLANO_EPICS.md`
- Front: `docs/GAP_FLUXO_PACIENTE_CONSENTIMENTO.md`
- Este pacote: `02_TRD.md`, `03_FLUXOS.md`, `04_DESIGN_SYSTEM.md`, `05_BANCO_POSTGRES.md`, `06_PLANO.md`
