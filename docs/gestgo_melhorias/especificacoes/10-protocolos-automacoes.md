> Extraído do documento mestre `GESTGO-PLANO-MESTRE-EVOLUCAO.md` (versão 1.1, decisão Java). Usar em conjunto com `raiox.md`; não presumir que proposta já esteja implementada.

# 10. EPIC AUT-06 — PROTOCOLOS DOCUMENTAIS POR PROCEDIMENTO

**Prioridade:** P2 após confirmar demanda paga.  
**Atenção:** há vínculo agenda → formulário e recursos de TCLE/reconsentimento; **não está comprovado** um orquestrador completo de múltiplos documentos condicionais por procedimento.

## 10.1. Proposta

Permitir criar um **pacote/documental por serviço** com modelos exigidos, ordem opcional, regras de revalidação, momentos de envio e responsáveis.

### Exemplo conceitual — procedimento estético

- Anamnese atualizada antes do procedimento.
- Consentimento específico do procedimento.
- Autorização de imagem **se pertinente**, com escolha independente.
- Orientações pós-atendimento, no momento definido.

A configuração deve ser feita pela clínica/profissional; o Gestgo não decide quais documentos são clinicamente obrigatórios ou legalmente suficientes.

## 10.2. Modelo lógico proposto

`ProcedureWorkflow` → `WorkflowVersion` → `DocumentRequirement[]` → `DocumentRequest/Send[]` → `Submission[]` → `WorkflowRun`.

**Nomes são descritivos**, não instrução para adicionar tabelas novas antes de verificar estruturas de `templates`, `services`, `appointments`, `document_sends` e `form_submissions`.

## 10.3. Regras

- Cada pacote é versionado e associado à organização.
- Instância de atendimento usa versão imutável das regras, preservando auditoria.
- Regra simples inicialmente: obrigatório/opcional; antes/depois; intervalo relativo; ordem; paciente/staff/responsável.
- Se já houver documento atual válido segundo política definida pela clínica, sugerir reaproveitamento ou revisão, nunca presumir automaticamente.
- Cancelar ou reagendar atendimento atualiza disparos futuros sem apagar documentos concluídos.
- Exibir progresso: “2 de 3 documentos exigidos concluídos”; não confundir conclusão documental com autorização clínica para procedimento.
- Definir fallback manual para clínica sem agenda/integrações.

## 10.4. Interface

- Configuração de pacote em Serviços ou Documentos (decidir após pesquisa de navegação).
- Visão de pendências por atendimento/pessoa com filtros e lembrete manual/automático.
- Linha do tempo da instância, com tentativas e estado de cada documento.

## 10.5. Critérios de aceite

- Mesma pessoa pode ter atendimentos diferentes com conjuntos diferentes de documentos.
- Alterar workflow não muda execuções históricas.
- Documentos obrigatórios e opcionais ficam distinguíveis.
- Não ocorre disparo duplicado por retry de eventos de agenda.
- Pode operar sem integração WhatsApp, via e-mail e link manual.

---
