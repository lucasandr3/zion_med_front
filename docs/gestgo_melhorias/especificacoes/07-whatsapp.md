> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 7. EPIC MSG-03 — WHATSAPP E COMUNICAÇÃO DOCUMENTAL

**Prioridade:** P1 para envio manual; P2 para integração oficial.  
**Visão:** cada clínica usa preferencialmente **o seu próprio número**, enquanto o Gestgo orquestra o fluxo. O uso de número central do Gestgo não é recomendação padrão.

## 7.1. Separar três problemas

1. **Compartilhar:** profissional abre WhatsApp com mensagem pré-preenchida e envia manualmente.
2. **Automatizar:** Gestgo envia via canal oficial em nome da clínica, com conta/número conectados e permissão.
3. **Cobrar:** determinar quem paga mensagens e o plano SaaS; propriedade do número e faturamento são decisões independentes.

**Não confundir uma UI que diz “WhatsApp” com integração oficial ativa.** O raio-X identifica Evolution e funcionalidades ocultas, mas o proprietário afirma que ainda não possui integração nativa real no produto comercial.

## 7.2. Fase A — envio manual sem API de mensageria

- Ação “Enviar pelo WhatsApp” na pessoa, no template, no protocolo e/ou no envio existente, onde fizer sentido.
- Montar URL de compartilhamento com número do paciente formatado, texto neutro e link seguro, sem dados de saúde sensíveis.
- Abrir aplicativo/web WhatsApp; **não registrar “entregue” ou “lido”**: no máximo `share_intent_opened`/`awaiting_manual_confirmation` se houver confirmação explícita.
- Permitir copiar link como alternativa; não bloquear e-mail.
- Usar templates de texto adaptáveis por clínica com campos permitidos e prévia.
- Gerar link com expiração e revogação conforme políticas atuais do formulário/documento.

## 7.3. Fase B — canal oficial WhatsApp Cloud API

### Modelo de propriedade

- **Padrão proposto:** número/identidade da própria organização, ativado em fluxo oficial com Meta/operador autorizado, quando elegível.
- Suportar conexão/desconexão, estado da integração, número mascarado, template/status, webhook e reautorização.
- **Embedded Signup** e possibilidades de **coexistência com o app WhatsApp Business** devem ser verificados nas regras e elegibilidade atuais antes do desenvolvimento; não prometer que todo número existente pode coexistir.
- O proprietário do número e responsável pelo faturamento da mensageria deve ser explicitado nas telas e termos de contratação. Preferir faturamento da mensageria diretamente à clínica, quando suportado; se centralizado pelo Gestgo, incluir limites, cotas, previsão de custos e margem.

### Arquitetura lógica (nomes exemplificativos, sem criar duplicatas)

`DocumentSend / Event` → `CommunicationOrchestrator` → `ChannelAdapter` (`email`, `manual_whatsapp`, `official_whatsapp`) → `ProviderClient` → webhook → `DeliveryStatus` → timeline/auditoria.

- Um conector por `Organization` (ou a granularidade existente após auditoria).
- Segredos criptografados e rotacionáveis; nunca retornar tokens em payloads de frontend.
- Fila com retries exponenciais e **idempotency key** por envio/tentativa; deduplicação de webhooks.
- Estados distintos: solicitado, enfileirado, aceito pelo provedor, enviado, entregue, lido (se disponibilizado), falhou, cancelado; nenhum estado deve ser inventado sem callback.
- Armazenar erro legível, código do provedor, timestamps e consumo/custo estimado sem dados de saúde.
- Rate limit por organização, limites de segurança para evitar spam e reputação prejudicada.
- Templates aprovados para mensagens iniciadas pela empresa conforme regras oficiais vigentes.
- Registrar e respeitar opt-in, opt-out e permissões por finalidade; criar caminho para retirada de consentimento de comunicação.
- Configurar horário de silêncio e regras de lembrete, evitando spam e mensagens repetidas.

### Eventos candidatos

- Ficha criada para envio.
- Link de ficha disponibilizado.
- Documento ainda pendente após intervalo configurado.
- Documento concluído (notificação **à clínica**, ou mensagem ao paciente quando apropriada e autorizada).
- Reenvio solicitado, expiração, cancelamento.

### Conteúdo de mensagem

Preferir “Você tem um documento para preencher para [nome comercial da clínica]. Acesse o link seguro...” sem informar procedimento, diagnóstico, resultado clínico ou anexar PDF preenchido. Token deve ter proteção adequada; dados sensíveis só são vistos após controles já implementados.

## 7.4. Monetização do canal

- Envio manual incluído quando adequado à oferta vigente.
- Automação oficial como diferencial de plano Business ou adicional **a testar**, nunca tarifar ilimitado sem análise de volume.
- Não fixar preço de template/mensagem em código ou documento: a Meta/provedores alteram regras; registrar uma camada de precificação parametrizada e links de referência atuais.
- Separar “assinatura do Gestgo” e “tarifa de mensageria” em faturas e interface quando aplicável.

## 7.5. Critérios de aceite

- Compartilhamento manual não marca mensagem como entregue.
- Número da clínica A nunca pode ser usado para mensagem da clínica B.
- Falhas, webhook duplicado e retries não geram envios repetidos indevidos.
- Mensagens automáticas respeitam consentimento, templates e limites de envio.
- Disconectar canal impede novos envios automáticos sem afetar os documentos.
- E-mail e link manual continuam funcionando sem WhatsApp conectado.
- O histórico de envio não registra conteúdo clínico desnecessário.

## 7.6. Dependências

Auditoria do `DocumentSendsService`, `DocumentSend`, scheduler de lembretes, Evolution, contracts da API Java/Laravel; estudo da Cloud API e fluxo de autorização atual; regras comerciais de quem paga e atende suporte.

---
