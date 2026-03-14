import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesService, Template, TemplateCampo } from '../../core/services/templates.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'text', label: 'Texto curto' },
  { value: 'textarea', label: 'Texto longo' },
  { value: 'number', label: 'Número' },
  { value: 'date', label: 'Data' },
  { value: 'select', label: 'Select' },
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox' },
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
  imports: [CommonModule, RouterLink, FormsModule, LoadingOverlayComponent],
  templateUrl: './templates-campos.component.html',
  styleUrl: './templates-campos.component.css',
})
export class TemplatesCamposComponent implements OnInit {
  templateId = '';
  template: Template | null = null;
  campos: TemplateCampo[] = [];
  linkPublicoUrl = '';
  carregando = false;
  erro = '';
  gerandoLink = false;
  desativandoLink = false;
  salvandoCampo = false;
  removendoId: number | null = null;

  /** Formulário "Adicionar campo" */
  novoType = 'text';
  novoLabel = '';
  novoNameKey = '';
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
    this.carregando = true;
    this.erro = '';
    this.templatesService.get(id).subscribe({
      next: (t) => {
        this.template = t;
        if (t.public_url) this.linkPublicoUrl = t.public_url;
        this.templatesService.getCampos(id).subscribe({
          next: (list) => {
            this.campos = list;
            this.carregando = false;
          },
          error: () => {
            this.campos = [];
            this.carregando = false;
          },
        });
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar o template.';
      },
    });
  }

  adicionarCampo(): void {
    const id = this.idNum;
    if (!id) return;
    const label = this.novoLabel?.trim();
    const nameKey = this.novoNameKey?.trim().toLowerCase().replace(/\s+/g, '_');
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
        this.novoOptionsText = '';
        this.novoRequired = false;
        this.carregar();
      },
      error: (err) => {
        this.salvandoCampo = false;
        this.erro = err?.error?.message ?? 'Não foi possível adicionar o campo.';
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
      },
      error: (err) => {
        this.salvandoCampo = false;
        this.erro = err?.error?.message ?? 'Não foi possível salvar.';
      },
    });
  }

  removerCampo(c: TemplateCampo): void {
    if (!confirm('Remover este campo?')) return;
    const id = this.idNum;
    if (!id) return;
    this.removendoId = c.id;
    this.templatesService.destroyCampo(id, c.id).subscribe({
      next: () => {
        this.removendoId = null;
        this.carregar();
      },
      error: () => {
        this.removendoId = null;
        this.erro = 'Não foi possível remover o campo.';
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
      },
      error: () => {
        this.gerandoLink = false;
        this.erro = 'Não foi possível gerar o link.';
      },
    });
  }

  desativarLink(): void {
    if (!confirm('Desativar link público?')) return;
    const id = this.idNum;
    if (!id) return;
    this.desativandoLink = true;
    this.templatesService.desativarLink(id).subscribe({
      next: () => {
        this.desativandoLink = false;
        this.linkPublicoUrl = '';
        this.carregar();
      },
      error: () => {
        this.desativandoLink = false;
        this.erro = 'Não foi possível desativar o link.';
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
}
