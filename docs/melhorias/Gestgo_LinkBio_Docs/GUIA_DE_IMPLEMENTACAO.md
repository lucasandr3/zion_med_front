# Gestgo — Modelos de Link na Bio | Protótipos HTML

## Conteúdo

- `index.html`: galeria comparativa com oito experiências.
- `01_solo.html`: profissional autônomo.
- `02_generico.html`: clínica genérica.
- `03_estetica.html`: estética facial.
- `04_odontologia.html`: clínica odontológica.
- `05_nutricao.html`: nutricionista.
- `06_pediatria.html`: pediatria.
- `07_multiprofissional.html`: clínica com múltiplas especialidades.
- `08_fisioterapia_dermatofuncional.html`: fisioterapia dermatofuncional.
- `previews/*.png`: capturas para documentação e apresentação.

## Uso imediato

Abra `index.html` em um navegador. Clique em um modelo para abrir sua página independente. Os oito arquivos HTML são **autocontidos**: CSS, scripts e ícones SVG estão incorporados, sem bibliotecas ou fontes externas. Funcionam offline.

## O que é funcional no protótipo

- Modais com detalhes dos serviços e sequência de agendamento **simulada** (serviço, data, horário, confirmação fictícia).
- Prévia de ficha com validação básica no navegador, **sem envio ou persistência**.
- Seleção de faixa etária na pediatria; filtragem de especialidade na página multiprofissional.
- Tema claro/escuro, seção de perguntas frequentes, compartilhamento/cópia do endereço (quando o navegador permitir).
- Layout responsivo, foco de teclado e fechamento de modais com Escape.

## O que NÃO está integrado

Não há API, banco, horário real, WhatsApp ativo, assinatura digital, protocolo, cadastro de pacientes nem armazenagem. Nomes de estabelecimentos e serviços são fictícios, usados para estudo visual. Para produção, cada recurso deve ser conectado ao domínio real do Gestgo, respeitando autenticação, LGPD e estados de erro.

## Integração sugerida com Angular e Laravel existentes

1. **Shell base:** converter HTML em um único `PublicLinkBioPage` Angular (rota atual `/l/:slug`) e extrair blocos do template em componentes (`Hero`, `Services`, `Forms`, `ContactActions`, `FAQ`, `AppointmentCTA`).
2. **Presets:** armazenar `preset_key`/`link_bio_model`, `accent_hex`, visibilidade e ordem dos blocos; não manter oito páginas com lógica de negócio duplicada. Preservar modelos e temas já existentes.
3. **Conteúdo dinâmico:** renderizar apenas formulários publicados e autorizados, especialidades configuradas e serviços reais. Não publicar dados clínicos ou links sensíveis inadvertidamente.
4. **Agendamento:** primeiro permitir URL externa segura ou integração Feegow existente. Motor interno futuro fica no módulo Agenda, não dentro do Link na Bio.
5. **Fichas:** encaminhar para `/f/:token` ou fluxo individual existente, evitando criar formulário paralelo; ver regras `person_link`/OTP do PRD.
6. **Analytics:** acrescentar eventos de CTA, `service_selected`, `form_opened`, `appointment_started`, sem registrar PII/dados de saúde. Registrar consentimentos/retenção conforme base legal.
7. **Design:** manter tokens Gestgo/Nord (`--c-primary`, Inter, etc.) no painel. Para a página pública, `accent_hex` da organização pode personalizar um subconjunto de tokens próprios; manter semânticas de acessibilidade e contraste.

## Checklist de QA antes de liberar

- [ ] Verificação mobile 320, 360, 390, 430 px e desktop
- [ ] Testes E2E de links públicos, permissões e formulário por especialidade
- [ ] Sem overbooking no módulo de agenda real; horários recuperados da API
- [ ] Documentos consentidos e específicos por procedimento
- [ ] Privacidade: nenhuma ficha protegida exposta apenas por possuir um link público
- [ ] Mensagens claras de integração indisponível e estados loading / erro / sucesso
- [ ] Conferir textos e orientações com os respectivos profissionais de saúde
- [ ] Captar conversão real para validar valor do Link na Bio

**Estratégia:** uma arquitetura com oito presets, não oito frontends separados. Priorizar Estética e Fisioterapia Dermatofuncional nos experimentos comerciais. 
