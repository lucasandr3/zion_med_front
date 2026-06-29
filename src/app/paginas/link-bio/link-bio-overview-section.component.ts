import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LinkBioClinic,
  LinkBioFormLink,
  LinkBioLayoutModel,
  LinkBioLink,
  LinkBioMetrics,
  LinkBioStats,
} from '../../core/services/link-bio.service';
import {
  buildLinkBioOverviewSuggestions,
  type LinkBioOverviewSuggestion,
} from './link-bio-overview-suggestions.util';
import {
  buildChartCliques,
  buildOrigensClique,
  cliquesTrendPercent,
  ctrAbaixoDaMedia,
  ctrBarPercent,
  CTR_MEDIA_SETOR_DEFAULT,
  insightBannerTexto,
  LINK_BIO_STATS_PERIODOS,
  LinkBioStatsPeriodo,
  totalCliquesPeriodo,
  visitasOntem,
  visitasTrendPercent,
} from './link-bio-stats-chart.util';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

@Component({
  selector: 'zm-link-bio-overview-section',
  standalone: true,
  imports: [CommonModule, ZardCardComponent, ZardButtonComponent],
  templateUrl: './link-bio-overview-section.component.html',
})
export class LinkBioOverviewSectionComponent {
  @Input({ required: true }) metrics!: LinkBioMetrics;
  @Input({ required: true }) stats!: LinkBioStats;
  @Input({ required: true }) clinic!: LinkBioClinic;
  @Input({ required: true }) links: LinkBioLink[] = [];
  @Input({ required: true }) forms: LinkBioFormLink[] = [];
  @Input({ required: true }) layoutModel!: LinkBioLayoutModel;
  @Input() statsPeriodo: LinkBioStatsPeriodo = '7d';
  @Input() insightBannerFechado = false;
  @Input() atualizandoStats = false;
  @Input() ctrMediaSetor = CTR_MEDIA_SETOR_DEFAULT;

  @Output() statsPeriodoChange = new EventEmitter<LinkBioStatsPeriodo>();
  @Output() refreshStats = new EventEmitter<void>();
  @Output() closeInsight = new EventEmitter<void>();
  @Output() applySuggestion = new EventEmitter<LinkBioOverviewSuggestion>();

  readonly statsPeriodos = LINK_BIO_STATS_PERIODOS;

  get visitasOntemCount(): number {
    return visitasOntem(this.stats);
  }

  get visitasTrendPercentValue(): number | null {
    return visitasTrendPercent(this.metrics, this.stats);
  }

  get cliquesTrendPercentValue(): number | null {
    return cliquesTrendPercent(this.stats);
  }

  get ctrBarPercentValue(): number {
    return ctrBarPercent(this.metrics, this.ctrMediaSetor);
  }

  get mostrarInsightBanner(): boolean {
    return ctrAbaixoDaMedia(this.metrics, this.ctrMediaSetor) && !this.insightBannerFechado;
  }

  get insightBannerTextoValue(): string {
    return insightBannerTexto(this.metrics);
  }

  get chartCliques() {
    return buildChartCliques(this.stats, this.statsPeriodo);
  }

  get totalCliquesPeriodoValue(): number {
    return totalCliquesPeriodo(this.chartCliques);
  }

  get origensClique() {
    return buildOrigensClique(this.stats);
  }

  get sugestoesMelhoria(): LinkBioOverviewSuggestion[] {
    return buildLinkBioOverviewSuggestions({
      clinic: this.clinic,
      links: this.links,
      forms: this.forms,
      layoutModel: this.layoutModel,
      metrics: this.metrics,
      ctrMediaSetor: this.ctrMediaSetor,
    });
  }

  selecionarPeriodo(periodo: LinkBioStatsPeriodo): void {
    this.statsPeriodoChange.emit(periodo);
  }
}
