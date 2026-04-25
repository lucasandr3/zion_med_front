import { Component, OnInit, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap, map, catchError, of } from 'rxjs';
import { TemplatesService, Template, TemplateCampo } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

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
};

@Component({
  selector: 'app-templates-campos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonListComponent],
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

  readonly typeOptions = TYPE_OPTIONS;
  readonly typeIcons = TYPE_ICONS;

  private route = inject(ActivatedRoute);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  get idNum(): number {
    return parseInt(this.templateId, 10) || 0;
  }

  get showNovoOptions(): boolean {
    return ['select', 'radio'].includes(this.novoType);
  }

  get showEditOptions(): boolean {
    return ['select', 'radio'].includes(this.editType);
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
        this.campos = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar o template.';
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
      required: this.novoRequired,
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
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.editCampo = null;
  }

  salvarEdicao(): void {
    const id = this.idNum;
    if (!id || !this.editCampo) return;
    const payload: Partial<TemplateCampo> = {
      type: this.editType,
      label: this.editLabel?.trim() || this.editCampo.label,
      name_key: (this.editNameKey?.trim().toLowerCase().replace(/\s+/g, '_')) || this.editCampo.name_key,
      required: this.editRequired,
    };
    if (this.showEditOptions) {
      payload.options = this.editOptionsText
        .split(/\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
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
      error: () => {
        this.gerandoLink = false;
        this.erro = 'Não foi possível gerar o link.';
        this.toast.error('Erro', this.erro);
      },
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
}
