import { PlatformManualEmailCategory } from '../../../core/services/plataforma.service';

export interface PlatformEmailTemplate {
  id: string;
  category: PlatformManualEmailCategory;
  label: string;
  subject: string;
  body: string;
}

export const PLATFORM_EMAIL_TEMPLATES: PlatformEmailTemplate[] = [
  {
    id: 'contact-welcome',
    category: 'contact',
    label: 'Boas-vindas ao cliente',
    subject: '[{{produto}}] Bem-vindo(a)!',
    body: `Olá, {{nome}}!

Obrigado por escolher o {{produto}}. Sua conta em {{empresa}} já está ativa e pronta para uso.

Se precisar de ajuda para começar, responda este e-mail ou fale com nosso suporte.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'contact-demo-followup',
    category: 'contact',
    label: 'Retorno após demonstração',
    subject: '[{{produto}}] Obrigado pela demonstração',
    body: `Olá, {{nome}}!

Foi um prazer apresentar o {{produto}} para você.

Estou à disposição para tirar dúvidas, enviar proposta ou ajudar no próximo passo. Podemos agendar uma conversa rápida?

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'contact-info-request',
    category: 'contact',
    label: 'Solicitação de informações',
    subject: '[{{produto}}] Precisamos de algumas informações',
    body: `Olá, {{nome}}!

Para seguirmos com seu atendimento em {{empresa}}, precisamos confirmar alguns dados.

Por favor, responda este e-mail com as informações solicitadas ou indique o melhor horário para contato.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'contact-checkin',
    category: 'contact',
    label: 'Acompanhamento comercial',
    subject: '[{{produto}}] Como podemos ajudar?',
    body: `Olá, {{nome}}!

Passando para saber se está tudo certo com o uso do {{produto}} em {{empresa}}.

Há algo em que possamos ajudar neste momento?

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'billing-reminder',
    category: 'billing',
    label: 'Lembrete de fatura em aberto',
    subject: '[{{produto}}] Lembrete de pagamento',
    body: `Olá, {{nome}}!

Identificamos uma fatura em aberto referente à assinatura de {{empresa}}.

Para evitar interrupções no serviço, pedimos a regularização o quanto antes. Caso o pagamento já tenha sido feito, desconsidere este aviso.

Se precisar do boleto ou link de pagamento novamente, responda este e-mail.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'billing-overdue',
    category: 'billing',
    label: 'Fatura vencida',
    subject: '[{{produto}}] Fatura vencida — ação necessária',
    body: `Olá, {{nome}}!

A fatura da assinatura de {{empresa}} encontra-se vencida.

Solicitamos a regularização para manter o acesso ao {{produto}}. Em caso de dificuldade, entre em contato para analisarmos alternativas.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'billing-payment-confirmed',
    category: 'billing',
    label: 'Confirmação de pagamento',
    subject: '[{{produto}}] Pagamento confirmado',
    body: `Olá, {{nome}}!

Confirmamos o recebimento do pagamento referente à assinatura de {{empresa}}.

O acesso ao {{produto}} permanece ativo. Obrigado pela confiança!

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'billing-suspension-warning',
    category: 'billing',
    label: 'Aviso de suspensão por inadimplência',
    subject: '[{{produto}}] Aviso de suspensão da conta',
    body: `Olá, {{nome}}!

Devido a pendências financeiras em {{empresa}}, o acesso ao {{produto}} poderá ser suspenso nos próximos dias.

Para evitar a interrupção, regularize o pagamento ou entre em contato conosco o quanto antes.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'billing-renewal',
    category: 'billing',
    label: 'Renovação de assinatura',
    subject: '[{{produto}}] Renovação da sua assinatura',
    body: `Olá, {{nome}}!

A assinatura de {{empresa}} está próxima da renovação.

Em breve você receberá a cobrança referente ao próximo período. Qualquer dúvida sobre plano ou valores, estamos à disposição.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'general-update',
    category: 'general',
    label: 'Atualização da plataforma',
    subject: '[{{produto}}] Novidades e melhorias',
    body: `Olá, {{nome}}!

Realizamos melhorias no {{produto}} para tornar sua experiência ainda melhor em {{empresa}}.

Acesse a plataforma para conhecer as novidades. Se tiver dúvidas, nossa equipe está à disposição.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'general-maintenance',
    category: 'general',
    label: 'Manutenção programada',
    subject: '[{{produto}}] Manutenção programada',
    body: `Olá, {{nome}}!

Informamos que o {{produto}} passará por manutenção programada em breve.

Durante esse período, o acesso poderá ficar indisponível por alguns minutos. Pedimos desculpas por qualquer inconveniente.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'general-satisfaction',
    category: 'general',
    label: 'Pesquisa de satisfação',
    subject: '[{{produto}}] Como está sendo sua experiência?',
    body: `Olá, {{nome}}!

Gostaríamos de saber como tem sido sua experiência com o {{produto}} em {{empresa}}.

Sua opinião é muito importante para continuarmos melhorando. Responda este e-mail com seu feedback — levamos cada retorno a sério.

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'general-custom-notice',
    category: 'general',
    label: 'Aviso geral ao cliente',
    subject: '[{{produto}}] Comunicado importante',
    body: `Olá, {{nome}}!

Entramos em contato referente à conta de {{empresa}} no {{produto}}.

[Descreva aqui o assunto do comunicado.]

Atenciosamente,
Equipe {{produto}}`,
  },
  {
    id: 'general-whatsapp-missing',
    category: 'general',
    label: 'Solicitar WhatsApp (cadastro incompleto)',
    subject: '[{{produto}}] Precisamos do seu WhatsApp para falar com você',
    body: `Olá, {{nome}}, tudo bem?

Seja bem-vindo(a) ao {{produto}}! 🚀

Identificamos que o seu cadastro da empresa {{empresa}} foi concluído, porém o telefone de WhatsApp não ficou disponível para nossa equipe.

Queremos garantir que você tenha todo o suporte necessário...

Por favor, responda este e-mail informando o número de WhatsApp com DDD ou clique no botão abaixo para falar conosco.

Assim que recebermos, entraremos em contato por lá.

Obrigado por escolher o {{produto}}. Estamos à disposição para ajudar!`,
  },
  {
    id: 'support-whatsapp-missing',
    category: 'support',
    label: 'Solicitar WhatsApp (não salvo no cadastro)',
    subject: '[{{produto}}] Precisamos do seu WhatsApp para falar com você',
    body: `Olá, {{nome}}, tudo bem?

Seja bem-vindo(a) ao {{produto}}! 🚀

Identificamos que o seu cadastro da empresa {{empresa}} foi concluído, porém o telefone de WhatsApp não ficou disponível para nossa equipe.

Queremos garantir que você tenha todo o suporte necessário...

Por favor, responda este e-mail informando o número de WhatsApp com DDD ou clique no botão abaixo para falar conosco.

Assim que recebermos, entraremos em contato por lá.

Obrigado por escolher o {{produto}}. Estamos à disposição para ajudar!`,
  },
  {
    id: 'support-welcome',
    category: 'support',
    label: 'Boas-vindas com suporte',
    subject: '[{{produto}}] Bem-vindo(a) — estamos aqui para ajudar',
    body: `Olá, {{nome}}, tudo bem?

Seja bem-vindo(a) ao {{produto}}! 🚀

Sua conta em {{empresa}} está ativa. Nossa equipe está à disposição para ajudar com dúvidas, configuração e primeiros passos.

Por favor, responda este e-mail se precisar de orientação ou quiser falar conosco.

Obrigado por escolher o {{produto}}. Estamos à disposição para ajudar!`,
  },
  {
    id: 'support-followup',
    category: 'support',
    label: 'Acompanhamento de suporte',
    subject: '[{{produto}}] Como podemos ajudar?',
    body: `Olá, {{nome}}, tudo bem?

Passando para saber se está tudo certo com o uso do {{produto}} em {{empresa}}.

Por favor, responda este e-mail se houver algo em que possamos ajudar.

Obrigado por escolher o {{produto}}. Estamos à disposição para ajudar!`,
  },
];

export interface PlatformEmailTemplateContext {
  nome?: string | null;
  produto?: string | null;
  empresa?: string | null;
}

export function applyPlatformEmailTemplate(
  template: PlatformEmailTemplate,
  context: PlatformEmailTemplateContext
): { subject: string; body: string } {
  const replacements: Record<string, string> = {
    nome: context.nome?.trim() || 'cliente',
    produto: context.produto?.trim() || 'Gestgo',
    empresa: context.empresa?.trim() || 'sua empresa',
  };

  const replace = (text: string): string =>
    text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => replacements[key] ?? `{{${key}}}`);

  return {
    subject: replace(template.subject),
    body: replace(template.body),
  };
}
