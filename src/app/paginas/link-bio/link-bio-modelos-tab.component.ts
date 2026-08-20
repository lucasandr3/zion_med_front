import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import {
  LinkBioLayoutModel,
  LinkBioService,
  LinkBioState,
} from '../../core/services/link-bio.service';
import { ToastService } from '../../core/services/toast.service';
import {
  LINK_BIO_MODEL_LABELS,
  LINK_BIO_MODEL_SUBTITLES,
  LINK_BIO_PREVIEW_MODEL_IDS,
} from './link-bio-model-labels.util';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardComponent } from '@/shared/components/card/card.component';

@Component({
  selector: 'zm-link-bio-modelos-tab',
  standalone: true,
  imports: [RouterLink, ZardBadgeComponent, ZardButtonComponent, ZardCardComponent],
  templateUrl: './link-bio-modelos-tab.component.html',
  styleUrl: './link-bio-modelos-tab.component.css',
  host: { class: 'link-bio-config block min-w-0' },
})
export class LinkBioModelosTabComponent implements OnChanges {
  @Input({ required: true }) state!: LinkBioState;
  @Input({ required: true }) activeModel!: LinkBioLayoutModel;
  @Input({ required: true }) persistedModel!: LinkBioLayoutModel;
  @Input() previewSessionVersion = 0;

  @Output() activeModelChange = new EventEmitter<LinkBioLayoutModel>();
  @Output() persistedModelChange = new EventEmitter<LinkBioLayoutModel>();
  @Output() draftSync = new EventEmitter<void>();
  @Output() previewRefresh = new EventEmitter<void>();
  @Output() goToConteudoExtra = new EventEmitter<void>();

  readonly previewModelIds = LINK_BIO_PREVIEW_MODEL_IDS;
  readonly linkBioModelLabels = LINK_BIO_MODEL_LABELS;
  readonly linkBioModelSubtitles = LINK_BIO_MODEL_SUBTITLES;

  salvando = false;

  private readonly modelPreviewUrlByModel = new Map<LinkBioLayoutModel, SafeResourceUrl>();
  private previewModelsTimestamp = Date.now();

  private linkBioService = inject(LinkBioService);
  private toast = inject(ToastService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  get modelDirty(): boolean {
    return this.activeModel !== this.persistedModel;
  }

  get activeModelIframeSrc(): SafeResourceUrl | null {
    return this.modelPreviewUrlByModel.get(this.activeModel) ?? null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']?.currentValue || changes['activeModel'] || changes['previewSessionVersion']) {
      if (changes['previewSessionVersion']?.currentValue) {
        this.previewModelsTimestamp = changes['previewSessionVersion'].currentValue as number;
      }
      this.rebuildModelPreviewUrls();
    }
  }

  selecionarModelo(m: LinkBioLayoutModel): void {
    if (this.activeModel === m) return;
    this.activeModelChange.emit(m);
    this.draftSync.emit();
    this.rebuildModelPreviewUrls();
  }

  salvar(): void {
    if (!this.modelDirty) return;
    this.salvando = true;
    this.linkBioService.updateAparencia({ link_bio_model: this.activeModel }).subscribe({
      next: (clinic) => {
        this.salvando = false;
        this.state.clinic = { ...this.state.clinic, ...clinic };
        this.persistedModelChange.emit(this.activeModel);
        this.draftSync.emit();
        this.previewRefresh.emit();
        this.toast.success('Modelo publicado', 'O layout do link público foi atualizado.');
      },
      error: () => {
        this.salvando = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar o modelo.');
      },
    });
  }

  private rebuildModelPreviewUrls(): void {
    this.modelPreviewUrlByModel.clear();
    const slug = this.state?.clinic?.slug;
    if (!slug || !isPlatformBrowser(this.platformId)) return;
    const origin = window.location.origin;
    const t = this.previewModelsTimestamp;
    for (const model of this.previewModelIds) {
      const u = `${origin}/l/${encodeURIComponent(slug)}?preview=1&preview_model=${model}&t=${t}`;
      this.modelPreviewUrlByModel.set(model, this.sanitizer.bypassSecurityTrustResourceUrl(u));
    }
  }
}
