import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import {
  LinkBioLayoutModel,
  LinkBioService,
  LinkBioState,
} from '../../core/services/link-bio.service';
import { ToastService } from '../../core/services/toast.service';
import { normalizeLinkBioClinic } from '../../core/utils/link-bio-clinic-normalize.util';
import {
  linkBioExtraHasAnySection,
  linkBioExtraModelLabel,
  linkBioExtraSectionVisible,
  LinkBioExtraSection,
} from './link-bio-extra-fields.util';
import {
  buildExtraPayload,
  type LinkBioExtraFormState,
} from './link-bio-extra-form.util';
import { MAT_FORM_IMPORTS } from '@/shared/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ZardCardComponent } from '@/shared/components/card/card.component';

const LINK_BIO_FOTO_PROFISSIONAL_MAX_BYTES = 2 * 1024 * 1024;

@Component({
  selector: 'zm-link-bio-conteudo-extra-tab',
  standalone: true,
  imports: [
    ...MAT_FORM_IMPORTS,
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ZardCardComponent,
  ],
  templateUrl: './link-bio-conteudo-extra-tab.component.html',
})
export class LinkBioConteudoExtraTabComponent {
  @Input({ required: true }) state!: LinkBioState;
  @Input({ required: true }) extraForm!: LinkBioExtraFormState;
  @Input({ required: true }) activeModel!: LinkBioLayoutModel;
  @Input({ required: true }) persistedModel!: LinkBioLayoutModel;
  @Input() modelDirty = false;

  @Output() previewRefresh = new EventEmitter<void>();
  @Output() draftSync = new EventEmitter<void>();
  @Output() goToModelos = new EventEmitter<void>();
  @Output() clinicUpdated = new EventEmitter<void>();

  salvando = false;
  enviandoFoto = false;
  nomeArquivoFoto = '';

  private linkBioService = inject(LinkBioService);
  private toast = inject(ToastService);

  get conteudoExtraModeloAtivoLabel(): string {
    return linkBioExtraModelLabel(this.activeModel);
  }

  get conteudoExtraTemCamposParaModelo(): boolean {
    return linkBioExtraHasAnySection(this.activeModel);
  }

  get conteudoExtraApareceNoPublico(): boolean {
    return this.persistedModel !== 1;
  }

  get layoutPublicadoLabel(): string {
    return linkBioExtraModelLabel(this.persistedModel);
  }

  get layoutSelecionadoLabel(): string {
    return linkBioExtraModelLabel(this.activeModel);
  }

  extraMostraSecao(section: LinkBioExtraSection): boolean {
    return linkBioExtraSectionVisible(this.activeModel, section);
  }

  get extraMostraTextosLinks(): boolean {
    return (
      this.extraMostraSecao('hero_tagline') ||
      this.extraMostraSecao('council') ||
      this.extraMostraSecao('brand_subtitle') ||
      this.extraMostraSecao('instagram')
    );
  }

  onDraftChange(): void {
    this.draftSync.emit();
  }

  adicionarConvenioLinha(): void {
    this.extraForm.conveniosLinhas.push('');
    this.onDraftChange();
  }

  removerConvenioLinha(index: number): void {
    if (this.extraForm.conveniosLinhas.length <= 1) {
      this.extraForm.conveniosLinhas = [''];
    } else {
      this.extraForm.conveniosLinhas.splice(index, 1);
    }
    this.onDraftChange();
  }

  adicionarModalidade(): void {
    this.extraForm.modalities.push({ title: '', subtitle: '', available: true });
    this.onDraftChange();
  }

  removerModalidade(index: number): void {
    this.extraForm.modalities.splice(index, 1);
    this.onDraftChange();
  }

  adicionarMembroEquipe(): void {
    this.extraForm.equipe.push({ name: '', credential: '', notes: '', whatsapp: '' });
    this.onDraftChange();
  }

  removerMembroEquipe(index: number): void {
    this.extraForm.equipe.splice(index, 1);
    this.onDraftChange();
  }

  adicionarSpeciesChip(): void {
    this.extraForm.speciesChips.push({ label: '', active: true });
    this.onDraftChange();
  }

  removerSpeciesChip(index: number): void {
    this.extraForm.speciesChips.splice(index, 1);
    this.onDraftChange();
  }

  adicionarVetServiceCard(): void {
    this.extraForm.vetServiceCards.push({ icon: '💉', title: '' });
    this.onDraftChange();
  }

  removerVetServiceCard(index: number): void {
    this.extraForm.vetServiceCards.splice(index, 1);
    this.onDraftChange();
  }

  adicionarPedStep(): void {
    this.extraForm.pedFirstVisitSteps.push({ title: '', subtitle: '' });
    this.onDraftChange();
  }

  removerPedStep(index: number): void {
    this.extraForm.pedFirstVisitSteps.splice(index, 1);
    this.onDraftChange();
  }

  adicionarPedAgeBand(): void {
    this.extraForm.pedAgeBands.push({ emoji: '👶', title: '', range: '' });
    this.onDraftChange();
  }

  removerPedAgeBand(index: number): void {
    this.extraForm.pedAgeBands.splice(index, 1);
    this.onDraftChange();
  }

  salvar(): void {
    this.salvando = true;
    const link_bio_extra = buildExtraPayload(this.extraForm, this.state.clinic.link_bio_extra);
    this.linkBioService.updateAparencia({ link_bio_extra }).subscribe({
      next: (clinic) => {
        this.salvando = false;
        this.state.clinic = normalizeLinkBioClinic({ ...this.state.clinic, ...clinic });
        this.clinicUpdated.emit();
        this.previewRefresh.emit();
        this.toast.success('Conteúdo extra salvo', 'As informações foram atualizadas.');
      },
      error: () => {
        this.salvando = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar o conteúdo extra.');
      },
    });
  }

  onSelecionarFotoProfissional(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > LINK_BIO_FOTO_PROFISSIONAL_MAX_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      this.toast.error(
        'Arquivo muito grande',
        `Esta imagem tem cerca de ${mb} MB. O tamanho máximo permitido é 2 MB. Comprima ou redimensione a foto e tente novamente.`,
      );
      input.value = '';
      return;
    }

    this.enviandoFoto = true;
    this.nomeArquivoFoto = file.name;
    this.linkBioService.uploadProfessionalPhoto(file).subscribe({
      next: (clinic) => {
        this.state.clinic = { ...this.state.clinic, ...clinic };
        this.enviandoFoto = false;
        this.clinicUpdated.emit();
        this.previewRefresh.emit();
        this.toast.success('Foto enviada', 'A foto do profissional foi atualizada no link na bio.');
      },
      error: (err: unknown) => {
        this.enviandoFoto = false;
        this.toast.error('Não foi possível enviar a foto', this.mensagemErroUploadFoto(err));
      },
    });
    input.value = '';
  }

  private mensagemErroUploadFoto(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 413) {
        return 'O servidor recusou o arquivo por ser muito grande. Use uma imagem de até 2 MB ou comprima o arquivo antes de enviar.';
      }
      const body = err.error as
        | { message?: string; errors?: Record<string, string[] | string> }
        | null
        | undefined;
      const fromErrors = body?.errors?.['professional_photo'];
      if (Array.isArray(fromErrors) && fromErrors.length) {
        return String(fromErrors[0]).trim();
      }
      if (typeof fromErrors === 'string' && fromErrors.trim()) {
        return fromErrors.trim();
      }
      if (body?.errors && typeof body.errors === 'object') {
        const first = Object.values(body.errors).flat()[0];
        if (typeof first === 'string' && first.trim()) {
          return first.trim();
        }
      }
      if (typeof body?.message === 'string' && body.message.trim()) {
        return body.message.trim();
      }
    }
    return 'Verifique o formato (JPG, PNG ou WebP) e o tamanho (até 2 MB).';
  }
}
