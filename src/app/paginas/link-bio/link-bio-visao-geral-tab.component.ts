import { Component, EventEmitter, Input, Output, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  LinkBioLayoutModel,
  LinkBioState,
} from '../../core/services/link-bio.service';
import { ToastService } from '../../core/services/toast.service';
import { type LinkBioOverviewSuggestion } from './link-bio-overview-suggestions.util';
import { type LinkBioStatsPeriodo, CTR_MEDIA_SETOR_DEFAULT } from './link-bio-stats-chart.util';
import { LinkBioOverviewHeaderComponent } from './link-bio-overview-header.component';
import { LinkBioOverviewSectionComponent } from './link-bio-overview-section.component';
import { resolvePublicUrlForBrowser } from './link-bio-public-url.util';

@Component({
  selector: 'zm-link-bio-visao-geral-tab',
  standalone: true,
  imports: [LinkBioOverviewHeaderComponent, LinkBioOverviewSectionComponent],
  templateUrl: './link-bio-visao-geral-tab.component.html',
  styleUrl: './link-bio-visao-geral-tab.component.css',
})
export class LinkBioVisaoGeralTabComponent {
  @Input({ required: true }) state!: LinkBioState;
  @Input({ required: true }) layoutModel!: LinkBioLayoutModel;

  @Output() editContent = new EventEmitter<void>();
  @Output() applySuggestion = new EventEmitter<LinkBioOverviewSuggestion>();
  @Output() stateUpdated = new EventEmitter<LinkBioState>();

  copiedPrincipalLink = false;
  statsPeriodo: LinkBioStatsPeriodo = '7d';
  readonly ctrMediaSetor = CTR_MEDIA_SETOR_DEFAULT;

  private toast = inject(ToastService);
  private platformId = inject(PLATFORM_ID);

  get publicUrl(): string {
    return this.state.public_url ?? '';
  }

  get publicUrlAbrirNoNavegador(): string {
    return resolvePublicUrlForBrowser(
      this.publicUrl,
      this.state.clinic?.slug,
      isPlatformBrowser(this.platformId),
    );
  }

  copiarLinkPrincipal(): void {
    if (!this.publicUrl) return;
    navigator.clipboard.writeText(this.publicUrl).then(
      () => {
        this.copiedPrincipalLink = true;
        this.toast.success('Link copiado', 'Você já pode colar e compartilhar.');
        window.setTimeout(() => {
          this.copiedPrincipalLink = false;
        }, 1600);
      },
      () => this.toast.error('Não foi possível copiar', 'Tente novamente.'),
    );
  }

  selecionarPeriodoStats(periodo: LinkBioStatsPeriodo): void {
    this.statsPeriodo = periodo;
  }
}
