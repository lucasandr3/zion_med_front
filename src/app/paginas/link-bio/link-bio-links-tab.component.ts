import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LinkBioLink,
  LinkBioService,
  LinkBioState,
} from '../../core/services/link-bio.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import {
  buildGoogleWriteReviewUrl,
  extractPlaceIdFromMapsUrl,
  GOOGLE_REVIEW_LINK_ICON,
  GOOGLE_REVIEW_LINK_LABEL,
  hasGoogleReviewLink,
  isShortGoogleMapsShareUrl,
  normalizeGooglePlaceId,
  resolveGoogleWriteReviewUrl,
} from './link-bio-google-review-link.util';
import { MAT_FORM_IMPORTS } from '@/shared/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardCardComponent } from '@/shared/components/card/card.component';

export type LinkBioLinksTabNavigate = 'aparencia';

@Component({
  selector: 'zm-link-bio-links-tab',
  standalone: true,
  imports: [
    ...MAT_FORM_IMPORTS,
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ZardBadgeComponent,
    ZardCardComponent,
  ],
  templateUrl: './link-bio-links-tab.component.html',
})
export class LinkBioLinksTabComponent {
  @Input({ required: true }) state!: LinkBioState;
  @Input() linkAvaliePlaceIdManual = '';

  @Output() reload = new EventEmitter<void>();
  @Output() goToTab = new EventEmitter<LinkBioLinksTabNavigate>();
  @Output() linkAvaliePlaceIdManualChange = new EventEmitter<string>();

  mostrarFormNovo = false;
  novoLabel = '';
  novoUrl = '';
  novoIcon = 'link';
  editandoId: number | null = null;
  editLabel = '';
  editUrl = '';
  editIcon = 'link';
  salvandoNovoLink = false;
  salvandoEdicaoId: number | null = null;
  excluindoLinkId: number | null = null;
  salvandoLinkAvalieGoogle = false;

  private linkBioService = inject(LinkBioService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  get links(): LinkBioLink[] {
    return this.state?.links ?? [];
  }

  get iconComboboxOptions(): { value: string; label: string }[] {
    return Object.entries(this.state?.available_icons ?? {}).map(([value, label]) => ({ value, label }));
  }

  get linkBioFooterLinksSaveDisabled(): boolean {
    if (this.salvandoNovoLink || this.salvandoEdicaoId !== null) return true;
    if (this.mostrarFormNovo) {
      return !this.novoLabel.trim() || !this.novoUrl.trim();
    }
    if (this.editandoId !== null) {
      return !this.editLabel.trim() || !this.editUrl.trim();
    }
    return true;
  }

  get temLinkAvalieGoogle(): boolean {
    return hasGoogleReviewLink(this.links);
  }

  get faltaLinkGoogleMaps(): boolean {
    return !(this.state?.clinic?.maps_url ?? '').trim();
  }

  get mapsUrlCurtoSemPlaceId(): boolean {
    const url = this.state?.clinic?.maps_url;
    if (!url?.trim()) return false;
    return (
      isShortGoogleMapsShareUrl(url) &&
      !extractPlaceIdFromMapsUrl(url) &&
      !normalizeGooglePlaceId(this.linkAvaliePlaceIdManual)
    );
  }

  get urlAvalieGoogleSugerida(): string | null {
    if (!this.state?.clinic) return null;
    const manual = normalizeGooglePlaceId(this.linkAvaliePlaceIdManual);
    if (manual) {
      return buildGoogleWriteReviewUrl(manual);
    }
    return resolveGoogleWriteReviewUrl(this.state.clinic);
  }

  onPlaceIdManualChange(value: string): void {
    this.linkAvaliePlaceIdManualChange.emit(value);
  }

  irParaAparencia(): void {
    this.goToTab.emit('aparencia');
  }

  toggleFormNovo(): void {
    this.mostrarFormNovo = !this.mostrarFormNovo;
    if (!this.mostrarFormNovo) {
      this.novoLabel = '';
      this.novoUrl = '';
      this.novoIcon = 'link';
    }
  }

  salvarFooterAbaLinks(): void {
    if (this.mostrarFormNovo) {
      this.salvarNovoLink();
      return;
    }
    if (this.editandoId !== null) {
      const lnk = this.links.find((l) => l.id === this.editandoId);
      if (lnk) {
        this.salvarEdicao(lnk);
      }
    }
  }

  salvarNovoLink(): void {
    if (!this.novoLabel.trim() || !this.novoUrl.trim()) return;
    this.salvandoNovoLink = true;
    this.linkBioService.createLink({ label: this.novoLabel.trim(), url: this.novoUrl.trim(), icon: this.novoIcon }).subscribe({
      next: () => {
        this.salvandoNovoLink = false;
        this.toggleFormNovo();
        this.reload.emit();
        this.toast.success('Link adicionado', 'O novo link foi salvo.');
      },
      error: () => {
        this.salvandoNovoLink = false;
        this.toast.error('Erro', 'Não foi possível adicionar o link.');
      },
    });
  }

  adicionarLinkAvalieGoogle(): void {
    if (this.temLinkAvalieGoogle) {
      this.toast.info('Link já existe', 'Sua página já possui um botão de avaliação no Google.');
      return;
    }
    const url = this.urlAvalieGoogleSugerida;
    if (!url) {
      this.toast.warning(
        'Configure o Google Maps',
        'Informe o link do Maps em Aparência ou cole o Place ID abaixo (formato ChIJ…).',
      );
      return;
    }
    this.salvandoLinkAvalieGoogle = true;
    this.linkBioService
      .createLink({ label: GOOGLE_REVIEW_LINK_LABEL, url, icon: GOOGLE_REVIEW_LINK_ICON })
      .subscribe({
        next: () => {
          this.salvandoLinkAvalieGoogle = false;
          this.reload.emit();
          this.toast.success('Link adicionado', 'O botão «Avalie no Google» já aparece na sua página pública.');
        },
        error: () => {
          this.salvandoLinkAvalieGoogle = false;
          this.toast.error('Erro', 'Não foi possível adicionar o link.');
        },
      });
  }

  iniciarEdicao(link: LinkBioLink): void {
    this.editandoId = link.id;
    this.editLabel = link.label;
    this.editUrl = link.url;
    this.editIcon = link.icon ?? 'link';
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.editLabel = '';
    this.editUrl = '';
    this.editIcon = 'link';
  }

  salvarEdicao(link: LinkBioLink): void {
    if (!this.editandoId) return;
    this.salvandoEdicaoId = link.id;
    const payload = {
      label: this.editLabel.trim() || link.label,
      url: this.editUrl.trim() || link.url,
      icon: this.editIcon || link.icon || 'link',
    };
    this.linkBioService.updateLink(link.id, payload).subscribe({
      next: () => {
        this.salvandoEdicaoId = null;
        this.cancelarEdicao();
        this.reload.emit();
        this.toast.success('Link atualizado', 'As alterações foram salvas.');
      },
      error: () => {
        this.salvandoEdicaoId = null;
        this.toast.error('Erro', 'Não foi possível salvar o link.');
      },
    });
  }

  async excluirLink(link: LinkBioLink): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover este link?',
      messageBefore: 'O link ',
      emphasis: link.label,
      messageAfter: ' será removido da página pública.',
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;
    this.excluindoLinkId = link.id;
    this.linkBioService.deleteLink(link.id).subscribe({
      next: () => {
        this.excluindoLinkId = null;
        this.reload.emit();
        this.toast.success('Link removido', `${link.label} foi excluído.`);
      },
      error: () => {
        this.excluindoLinkId = null;
        this.toast.error('Erro', 'Não foi possível remover o link.');
      },
    });
  }
}
