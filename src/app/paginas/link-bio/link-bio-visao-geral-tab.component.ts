import { Component, EventEmitter, Input, Output, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  LinkBioLayoutModel,
  LinkBioService,
  LinkBioState,
} from '../../core/services/link-bio.service';
import { ToastService } from '../../core/services/toast.service';
import { type LinkBioOverviewSuggestion } from './link-bio-overview-suggestions.util';
import { type LinkBioStatsPeriodo, CTR_MEDIA_SETOR_DEFAULT } from './link-bio-stats-chart.util';
import { LinkBioOverviewHeaderComponent } from './link-bio-overview-header.component';
import { LinkBioOverviewSectionComponent } from './link-bio-overview-section.component';
import { LinkBioQrDialogComponent } from './link-bio-qr-dialog.component';
import {
  buildHeaderMetaLinha,
  buildRecepcaoKioskUrl,
  resolvePublicUrlForBrowser,
} from './link-bio-public-url.util';

@Component({
  selector: 'zm-link-bio-visao-geral-tab',
  standalone: true,
  imports: [
    CommonModule,
    LinkBioOverviewHeaderComponent,
    LinkBioOverviewSectionComponent,
    LinkBioQrDialogComponent,
  ],
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
  qrAberto = false;
  statsPeriodo: LinkBioStatsPeriodo = '7d';
  insightBannerFechado = false;
  atualizandoStats = false;
  readonly ctrMediaSetor = CTR_MEDIA_SETOR_DEFAULT;

  private linkBioService = inject(LinkBioService);
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

  get recepcaoKioskUrl(): string {
    return buildRecepcaoKioskUrl(this.publicUrlAbrirNoNavegador);
  }

  get headerMeta(): string | null {
    return buildHeaderMetaLinha(this.state.metrics);
  }

  copiarLinkPrincipal(): void {
    if (!this.publicUrl) return;
    navigator.clipboard.writeText(this.publicUrl).then(
      () => {
        this.copiedPrincipalLink = true;
        this.toast.success('Link copiado', 'Você já pode colar e compartilhar.');
        window.setTimeout(() => {
          this.copiedPrincipalLink = false;
        }, 2000);
      },
      () => this.toast.error('Não foi possível copiar', 'Tente novamente.'),
    );
  }

  copiarLinkRecepcao(): void {
    const url = this.recepcaoKioskUrl;
    if (!url) return;
    navigator.clipboard.writeText(url).then(
      () => this.toast.success('Copiado', 'Link do modo recepção na área de transferência.'),
      () => this.toast.error('Não foi possível copiar', 'Tente selecionar o link manualmente.'),
    );
  }

  abrirQr(): void {
    if (!this.publicUrl) {
      this.toast.warning('Link indisponível', 'A página pública ainda não possui URL.');
      return;
    }
    this.qrAberto = true;
  }

  fecharQr(): void {
    this.qrAberto = false;
  }

  atualizarDadosEstatisticas(): void {
    if (this.atualizandoStats) return;
    this.atualizandoStats = true;
    this.linkBioService.get().subscribe({
      next: (s) => {
        this.atualizandoStats = false;
        this.stateUpdated.emit(s);
        this.toast.success('Dados atualizados', 'Métricas e estatísticas foram recarregadas.');
      },
      error: () => {
        this.atualizandoStats = false;
        this.toast.error('Erro', 'Não foi possível atualizar os dados.');
      },
    });
  }

  selecionarPeriodoStats(periodo: LinkBioStatsPeriodo): void {
    this.statsPeriodo = periodo;
  }

  fecharInsightBanner(): void {
    this.insightBannerFechado = true;
  }
}
