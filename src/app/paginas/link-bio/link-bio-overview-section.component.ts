import { Component, EventEmitter, Input, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  CTR_MEDIA_SETOR_DEFAULT,
  LINK_BIO_STATS_PERIODOS,
  LinkBioStatsPeriodo,
  totalCliquesPeriodo,
  visitasOntem,
  visitasTrendPercent,
} from './link-bio-stats-chart.util';

/** Total de passos do checklist de referência (destaque + 4 itens). */
const CHECKLIST_TOTAL = 5;

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-link-bio-overview-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link-bio-overview-section.component.html',
  styleUrl: './link-bio-overview-section.component.css',
})
export class LinkBioOverviewSectionComponent {
  @Input({ required: true }) metrics!: LinkBioMetrics;
  @Input({ required: true }) stats!: LinkBioStats;
  @Input({ required: true }) clinic!: LinkBioClinic;
  @Input({ required: true }) links: LinkBioLink[] = [];
  @Input({ required: true }) forms: LinkBioFormLink[] = [];
  @Input({ required: true }) layoutModel!: LinkBioLayoutModel;
  @Input() statsPeriodo: LinkBioStatsPeriodo = '7d';
  @Input() ctrMediaSetor = CTR_MEDIA_SETOR_DEFAULT;

  @Output() statsPeriodoChange = new EventEmitter<LinkBioStatsPeriodo>();
  @Output() applySuggestion = new EventEmitter<LinkBioOverviewSuggestion>();

  readonly statsPeriodos = LINK_BIO_STATS_PERIODOS;

  get visitasOntemCount(): number {
    return visitasOntem(this.stats);
  }

  get visitasTrendPercentValue(): number | null {
    return visitasTrendPercent(this.metrics, this.stats);
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

  get sugestaoDestaque(): LinkBioOverviewSuggestion | null {
    return this.sugestoesMelhoria[0] ?? null;
  }

  get sugestoesLista(): LinkBioOverviewSuggestion[] {
    return this.sugestoesMelhoria.slice(1, 5);
  }

  get concluidosChecklist(): number {
    return Math.max(0, CHECKLIST_TOTAL - Math.min(CHECKLIST_TOTAL, this.sugestoesMelhoria.length));
  }

  get progressoTexto(): string {
    return `${this.concluidosChecklist} de ${CHECKLIST_TOTAL} concluídos`;
  }

  get progressoPercent(): number {
    return (this.concluidosChecklist / CHECKLIST_TOTAL) * 100;
  }

  get startDescricao(): string {
    const visitas = this.metrics.visitas_hoje ?? 0;
    const cliques = this.metrics.total_clicks_last_30 ?? 0;
    if (visitas > 0 && cliques === 0) {
      return `Sua página recebeu ${visitas} visita${visitas === 1 ? '' : 's'}, mas ninguém clicou ainda. Estes passos ajudam a mudar isso.`;
    }
    if (visitas === 0) {
      return 'Configure os pontos abaixo para converter as primeiras visitas em cliques e contatos.';
    }
    return 'Estes passos ajudam a melhorar a conversão da sua página pública.';
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

  selecionarPeriodo(periodo: LinkBioStatsPeriodo): void {
    this.statsPeriodoChange.emit(periodo);
  }
}
