import { Component, OnInit, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { switchMap, map, catchError, of } from 'rxjs';
import { TemplatesService, Template, TemplateCampo } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonTemplateCamposComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { TemplatePublishGuardService } from '../../core/services/template-publish-guard.service';

const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'text', label: 'Texto curto' },
  { value: 'textarea', label: 'Texto longo' },
  { value: 'number', label: 'Número' },
  { value: 'date', label: 'Data' },
  { value: 'select', label: 'Lista de opções' },
  { value: 'radio', label: 'Escolha única' },
  { value: 'checkbox', label: 'Caixa de seleção' },
  { value: 'file', label: 'Anexo' },
  { value: 'signature', label: 'Assinatura' },
  { value: 'heading', label: 'Título de seção' },
  { value: 'notice', label: 'Texto informativo (termo)' },
  { value: 'section_break', label: 'Quebra de etapa' },
];

const TYPE_ICONS: Record<string, string> = {
  text: 'text_fields',
  textarea: 'notes',
  number: 'numbers',
  date: 'calendar_today',
  select: 'arrow_drop_down_circle',
  radio: 'radio_button_checked',
  checkbox: 'check_box',
  file: 'attach_file',
  signature: 'draw',
  heading: 'title',
  notice: 'info',
  section_break: 'horizontal_rule',
};

const STRUCTURAL_TYPES = new Set(['heading', 'notice', 'section_break']);

/** Blocos recomendados (Recomendação CFM nº 1/2016 — boa prática, não lei federal). */
const CONSENT_HINTS = [
  { key: 'procedimento', label: 'Descrição / justificativa do procedimento' },
  { key: 'risco', label: 'Riscos e intercorrências' },
  { key: 'beneficio', label: 'Benefícios / prognóstico' },
  { key: 'alternativa', label: 'Alternativas terapêuticas' },
  { key: 'nao realiz', label: 'Consequências da não realização' },
  { key: 'cuidado', label: 'Cuidados pré/pós' },
  { key: 'recusa', label: 'Direito de recusa / revogação' },
  { key: 'autoriz', label: 'Autorização explícita do procedimento' },
  { key: 'assinatura', label: 'Assinatura do paciente' },
];

import { ZardTableImports } from '@/shared/components/table';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardComboboxComponent, type ZardComboboxOption } from '@/shared/components/combobox';
import { ZardTooltipImports } from '@/shared/components/tooltip';
import {
  buildVisibilityRulesPayload,
  FIELD_VISIBILITY_OPERATORS,
  FieldVisibilityOperator,
  parseVisibilityRules,
} from '../../core/utils/field-visibility.util';
import { CLINICAL_STEP_KINDS, CLINICAL_STEP_LABELS } from '../../core/utils/clinical-step.util';

@Component({
  selector: 'app-templates-campos',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    ...ZardTableImports,
    ...ZardTooltipImports,
    RouterLink,
    FormsModule,
    DragDropModule,
    ZmSkeletonTemplateCamposComponent,
    ZmPageBackLinkComponent,
    ZardCardComponent,
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardComboboxComponent,
  ],
  templateUrl: './templates-campos.component.html',
  styleUrl: './templates-campos.component.css',
})
export class TemplatesCamposComponent implements OnInit {
  templateId = '';
  template: Template | null = null;
  campos: TemplateCampo[] = [];
  linkPublicoUrl = '';
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  gerandoLink = false;
  desativandoLink = false;
  salvandoCampo = false;
  removendoId: number | null = null;
  reordenando = false;

  /** Formulário "Adicionar campo" */
  novoType = 'text';
  novoLabel = '';
  novoNameKey = '';
  novoMostrarOpcoesAvancadas = false;
  novoOptionsText = '';
  novoRequired = false;

  /** Modal Editar campo */
  modalAberto = false;
  editCampo: TemplateCampo | null = null;
  editType = 'text';
  editLabel = '';
  editNameKey = '';
  editOptionsText = '';
  editRequired = false;
  editVisibilityEnabled = false;
  editVisibilityField = '';
  editVisibilityOperator: FieldVisibilityOperator = 'equals';
  editVisibilityValue = '';
  editClinicalStepKind = '';
  aplicandoEstruturaTcle = false;

  actorsVisibilityEnabled = false;
  actorsVisibilityField = '';
  actorsVisibilityOperator: FieldVisibilityOperator = 'equals';
  actorsVisibilityValue = '';
  actorsRequireGuardian = false;
  salvandoActorsRules = false;

  readonly typeOptions = TYPE_OPTIONS;
  readonly typeIcons = TYPE_ICONS;
  readonly visibilityOperators = FIELD_VISIBILITY_OPERATORS;
  readonly clinicalStepOptions = CLINICAL_STEP_KINDS.map((value) => ({
    value,
    label: CLINICAL_STEP_LABELS[value],
  }));

  private route = inject(ActivatedRoute);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private publishGuard = inject(TemplatePublishGuardService);

  get idNum(): number {
    return parseInt(this.templateId, 10) || 0;
  }

  get opcoesTipo(): ZardComboboxOption[] {
    return this.typeOptions.map((opt) => ({ value: opt.value, label: opt.label }));
  }

  get showNovoOptions(): boolean {
    return ['select', 'radio'].includes(this.novoType);
  }

  get isNovoStructural(): boolean {
    return STRUCTURAL_TYPES.has(this.novoType);
  }

  get isEditStructural(): boolean {
    return STRUCTURAL_TYPES.has(this.editType);
  }

  get isConsentimento(): boolean {
    const kind = (this.template?.document_kind || this.template?.category || '').toLowerCase();
    return kind === 'consentimento';
  }

  get consentHints(): { key: string; label: string; present: boolean }[] {
    const blob = this.campos.map((c) => `${c.label} ${c.name_key}`.toLowerCase()).join(' | ');
    return CONSENT_HINTS.map((h) => ({
      ...h,
      present:
        blob.includes(h.key) ||
        blob.includes(h.label.toLowerCase().split(' ')[0]) ||
        (h.key === 'beneficio' && (blob.includes('benefício') || blob.includes('beneficio') || blob.includes('prognóstico') || blob.includes('prognostico'))) ||
        (h.key === 'nao realiz' && (blob.includes('não realização') || blob.includes('nao realizacao') || blob.includes('consequencias_nao'))),
    }));
  }

  get showEditOptions(): boolean {
    return ['select', 'radio'].includes(this.editType);
  }

  get editVisibilityFieldOptions(): { value: string; label: string }[] {
    if (!this.editCampo) return [];
    return this.campos
      .filter((c) => !STRUCTURAL_TYPES.has(c.type) && c.name_key !== this.editCampo?.name_key)
      .map((c) => ({ value: c.name_key, label: `${c.label} (${c.name_key})` }));
  }

  get editVisibilityNeedsValue(): boolean {
    return this.editVisibilityOperator === 'equals' || this.editVisibilityOperator === 'not_equals';
  }

  get actorsVisibilityFieldOptions(): { value: string; label: string }[] {
    return this.campos
      .filter((c) => !STRUCTURAL_TYPES.has(c.type))
      .map((c) => ({ value: c.name_key, label: `${c.label} (${c.name_key})` }));
  }

  get actorsVisibilityNeedsValue(): boolean {
    return this.actorsVisibilityOperator === 'equals' || this.actorsVisibilityOperator === 'not_equals';
  }

  get tipoIcon(): (type: string) => string {
    return (type: string) => TYPE_ICONS[type] ?? 'tune';
  }

  constructor() {
    this.templateId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const id = this.idNum;
    if (!id) return;
    this.erro = '';
    const load$ = this.templatesService.get(id).pipe(
      switchMap((t) =>
        this.templatesService.getCampos(id).pipe(
          map((list) => ({ t, list })),
          catchError(() => of({ t, list: [] as TemplateCampo[] })),
        ),
      ),
    );
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(load$);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: ({ t, list }) => {
        this.listaPronta = true;
        this.template = t;
        if (t.public_url) this.linkPublicoUrl = t.public_url;
        this.campos = [...list].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        this.loadActorsVisibilityRules(t);
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar o template.';
      },
    });
  }

  onCamposDrop(event: CdkDragDrop<TemplateCampo[]>): void {
    if (event.previousIndex === event.currentIndex || this.reordenando) return;
    const previous = [...this.campos];
    moveItemInArray(this.campos, event.previousIndex, event.currentIndex);
    this.campos = this.campos.map((c, i) => ({ ...c, sort_order: i + 1 }));
    const id = this.idNum;
    if (!id) return;
    this.reordenando = true;
    this.templatesService.reorderCampos(id, this.campos.map((c) => c.id)).subscribe({
      next: () => {
        this.reordenando = false;
        this.toast.success('Ordem salva', 'A ordem dos campos foi atualizada.');
      },
      error: () => {
        this.reordenando = false;
        this.campos = previous;
        this.toast.error('Erro', 'Não foi possível salvar a nova ordem.');
      },
    });
  }

  adicionarCampo(): void {
    const id = this.idNum;
    if (!id) return;
    const label = this.novoLabel?.trim();
    const manualKey = this.novoNameKey?.trim();
    const generatedKey = this.gerarNameKey(label);
    const nameKey = this.novoMostrarOpcoesAvancadas && manualKey
      ? this.normalizarNameKey(manualKey)
      : generatedKey;
    if (!label || !nameKey) return;
    const payload: { type: string; label: string; name_key: string; required: boolean; options?: string[] } = {
      type: this.novoType,
      label,
      name_key: nameKey,
      required: this.isNovoStructural ? false : this.novoRequired,
    };
    if (this.showNovoOptions && this.novoOptionsText?.trim()) {
      payload.options = this.novoOptionsText
        .split(/\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    this.salvandoCampo = true;
    this.templatesService.storeCampo(id, payload).subscribe({
      next: () => {
        this.salvandoCampo = false;
        this.novoLabel = '';
        this.novoNameKey = '';
        this.novoMostrarOpcoesAvancadas = false;
        this.novoOptionsText = '';
        this.novoRequired = false;
        this.carregar();
        this.toast.success('Campo adicionado', 'O novo campo foi salvo.');
      },
      error: (err) => {
        this.salvandoCampo = false;
        this.erro = err?.error?.message ?? 'Não foi possível adicionar o campo.';
        this.toast.error('Erro', this.erro);
      },
    });
  }

  abrirModalEditar(c: TemplateCampo): void {
    this.editCampo = c;
    this.editType = c.type;
    this.editLabel = c.label;
    this.editNameKey = c.name_key;
    this.editOptionsText = Array.isArray(c.options) ? c.options.join('\n') : '';
    this.editRequired = !!c.required;
    const parsed = parseVisibilityRules(c.visibility_rules);
    this.editVisibilityEnabled = parsed.enabled;
    this.editVisibilityField = parsed.field;
    this.editVisibilityOperator = parsed.operator;
    this.editVisibilityValue = parsed.value;
    this.editClinicalStepKind = c.clinical_step_kind ?? '';
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.editCampo = null;
  }

  salvarEdicao(): void {
    const id = this.idNum;
    if (!id || !this.editCampo) return;
    const label = this.editLabel?.trim();
    const nameKey = this.normalizarNameKey(this.editNameKey?.trim() || '') || this.editCampo.name_key;
    if (!label || !nameKey) return;
    const payload: Partial<TemplateCampo> & { options?: string[] } = {
      type: this.editType,
      label,
      name_key: nameKey,
      required: this.isEditStructural ? false : this.editRequired,
    };
    if (this.showEditOptions) {
      payload.options = this.editOptionsText
        .split(/\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    payload.visibility_rules = buildVisibilityRulesPayload(
      this.editVisibilityEnabled,
      this.editVisibilityField,
      this.editVisibilityOperator,
      this.editVisibilityValue,
    );
    payload.clinical_step_kind = this.editClinicalStepKind?.trim() || null;
    this.salvandoCampo = true;
    this.templatesService.updateCampo(id, this.editCampo.id, payload).subscribe({
      next: () => {
        this.salvandoCampo = false;
        this.fecharModal();
        this.carregar();
        this.toast.success('Campo atualizado', 'As alterações foram salvas.');
      },
      error: (err) => {
        this.salvandoCampo = false;
        this.erro = err?.error?.message ?? 'Não foi possível salvar.';
        this.toast.error('Erro ao salvar', this.erro);
      },
    });
  }

  async removerCampo(c: TemplateCampo): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover campo?',
      messageBefore: 'O campo ',
      emphasis: c.label,
      messageAfter: ' será removido do template. Esta ação não pode ser desfeita.',
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;
    const id = this.idNum;
    if (!id) return;
    this.removendoId = c.id;
    this.templatesService.destroyCampo(id, c.id).subscribe({
      next: () => {
        this.removendoId = null;
        this.carregar();
        this.toast.success('Campo removido', `${c.label} foi excluído.`);
      },
      error: () => {
        this.removendoId = null;
        this.erro = 'Não foi possível remover o campo.';
        this.toast.error('Erro', this.erro);
      },
    });
  }

  gerarLink(): void {
    const id = this.idNum;
    if (!id) return;
    this.gerandoLink = true;
    void this.publishGuard.confirmPublishIfNeeded(id).then((confirmed) => {
      if (!confirmed) {
        this.gerandoLink = false;
        return;
      }
      this.templatesService.gerarLink(id).subscribe({
        next: (res) => {
          this.gerandoLink = false;
          const url = (res as { data?: { public_url?: string } })?.data?.public_url;
          if (url) this.linkPublicoUrl = url;
          else if (typeof window !== 'undefined') {
            const token = (res as { data?: { token?: string } })?.data?.token;
            if (token) this.linkPublicoUrl = `${window.location.origin}/f/${token}`;
          }
          this.carregar();
          this.toast.success('Link público gerado', 'O link está disponível para copiar.');
        },
        error: (err) => {
          this.gerandoLink = false;
          this.erro = err?.error?.message ?? 'Não foi possível gerar o link.';
          const issues = err?.error?.clinical_validation as { message?: string; level?: string }[] | undefined;
          if (Array.isArray(issues) && issues.length) {
            this.toast.warning('Validação clínica', issues.map((i) => i.message).filter(Boolean).join(' '));
          }
          this.toast.error('Erro', this.erro);
        },
      });
    });
  }

  aplicarEstruturaTcle(): void {
    const id = this.idNum;
    if (!id || this.aplicandoEstruturaTcle) return;
    this.aplicandoEstruturaTcle = true;
    this.templatesService.aplicarEstruturaTcle(id).subscribe({
      next: () => {
        this.aplicandoEstruturaTcle = false;
        this.carregar();
        this.toast.success('Etapas clínicas', 'Estrutura TCLE aplicada aos campos.');
      },
      error: (err) => {
        this.aplicandoEstruturaTcle = false;
        this.toast.error('Erro', err?.error?.message ?? 'Não foi possível aplicar a estrutura TCLE.');
      },
    });
  }

  toggleUsesClinicalSteps(enabled: boolean): void {
    const id = this.idNum;
    if (!id || !this.template) return;
    this.templatesService.update(id, { uses_clinical_steps: enabled }).subscribe({
      next: () => {
        this.template = { ...this.template!, uses_clinical_steps: enabled };
        this.toast.success('Etapas clínicas', enabled ? 'Wizard clínico ativado.' : 'Wizard clínico desativado.');
      },
      error: () => this.toast.error('Erro', 'Não foi possível atualizar etapas clínicas.'),
    });
  }

  async desativarLink(): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Desativar link público?',
      message: 'O formulário deixará de ser acessível pelo link atual. Você poderá gerar um novo link depois.',
      confirmLabel: 'Sim, desativar',
      variant: 'danger',
    });
    if (!ok) return;
    const id = this.idNum;
    if (!id) return;
    this.desativandoLink = true;
    this.templatesService.desativarLink(id).subscribe({
      next: () => {
        this.desativandoLink = false;
        this.linkPublicoUrl = '';
        this.carregar();
        this.toast.success('Link desativado', 'O link público foi removido.');
      },
      error: () => {
        this.desativandoLink = false;
        this.erro = 'Não foi possível desativar o link.';
        this.toast.error('Erro', this.erro);
      },
    });
  }

  copiarLink(event?: Event): void {
    if (!this.linkPublicoUrl) return;
    const btn = (event?.currentTarget ?? null) as HTMLElement | null;
    navigator.clipboard.writeText(this.linkPublicoUrl).then(() => {
      const lbl = btn?.querySelector('.copy-label');
      if (lbl) {
        const t = lbl.textContent;
        lbl.textContent = 'Copiado!';
        setTimeout(() => { lbl.textContent = t ?? ''; }, 2000);
      }
    });
  }

  ordemFormatada(sortOrder: number): string {
    return String(sortOrder).padStart(2, '0');
  }

  alternarOpcoesAvancadas(): void {
    this.novoMostrarOpcoesAvancadas = !this.novoMostrarOpcoesAvancadas;
    if (!this.novoMostrarOpcoesAvancadas) {
      this.novoNameKey = '';
    }
  }

  selecionarNovoType(value: string | null): void {
    this.novoType = value ?? 'text';
  }

  selecionarEditType(value: string | null): void {
    this.editType = value ?? 'text';
  }

  previewNameKey(): string {
    if (this.novoMostrarOpcoesAvancadas && this.novoNameKey?.trim()) {
      return this.normalizarNameKey(this.novoNameKey);
    }
    return this.gerarNameKey(this.novoLabel);
  }

  private gerarNameKey(label: string): string {
    const base = this.normalizarNameKey(label);
    if (!base) return `campo_${Date.now()}`;
    const existentes = new Set(this.campos.map((c) => c.name_key));
    if (!existentes.has(base)) return base;
    let idx = 2;
    while (existentes.has(`${base}_${idx}`)) idx += 1;
    return `${base}_${idx}`;
  }

  private normalizarNameKey(value: string): string {
    return (value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9_ ]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_');
  }

  private loadActorsVisibilityRules(t: Template): void {
    const parsed = parseVisibilityRules(t.actors_visibility_rules);
    this.actorsVisibilityEnabled = parsed.enabled;
    this.actorsVisibilityField = parsed.field;
    this.actorsVisibilityOperator = parsed.operator;
    this.actorsVisibilityValue = parsed.value;
    this.actorsRequireGuardian = !!t.actors_visibility_rules?.require_guardian;
  }

  salvarActorsVisibilityRules(): void {
    const id = this.idNum;
    if (!id || !this.template) return;
    this.salvandoActorsRules = true;
    const rules = buildVisibilityRulesPayload(
      this.actorsVisibilityEnabled,
      this.actorsVisibilityField,
      this.actorsVisibilityOperator,
      this.actorsVisibilityValue,
    );
    const payload = rules
      ? { ...rules, require_guardian: this.actorsRequireGuardian }
      : null;
    this.templatesService.update(id, { actors_visibility_rules: payload }).subscribe({
      next: () => {
        this.salvandoActorsRules = false;
        this.toast.success('Regras salvas', 'Visibilidade do bloco responsável atualizada.');
        this.carregar();
      },
      error: () => {
        this.salvandoActorsRules = false;
        this.toast.error('Erro', 'Não foi possível salvar as regras do responsável.');
      },
    });
  }
}
