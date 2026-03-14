import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-pagina-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingOverlayComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  estadoCarregando = false;
  estadoErro = false;
  mensagemErro = '';
  semClinica = false;
  pendentesHoje = 0;
  totalTemplates = 0;
  ultimos7Dias = 0;
  ultimos30Dias = 0;
  linksPublicosCount = 0;
  porStatus: { pending: number; approved: number; rejected: number } = { pending: 0, approved: 0, rejected: 0 };
  ultimosTemplates: { id: number; name: string; created_at: string }[] = [];

  private dashboardService = inject(DashboardService);

  get totalStatus(): number {
    return this.porStatus.pending + this.porStatus.approved + this.porStatus.rejected;
  }

  ngOnInit(): void {
    this.estadoCarregando = true;
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.estadoCarregando = false;
        this.semClinica = data.sem_clinica;
        this.pendentesHoje = data.pendentes_hoje ?? 0;
        this.ultimos7Dias = data.ultimos_7_dias ?? 0;
        this.ultimos30Dias = data.ultimos_30_dias ?? 0;
        this.linksPublicosCount = data.links_publicos_count ?? 0;
        this.ultimosTemplates = (data.ultimos_templates ?? []).map((t: { id: number; name: string; created_at?: string }) => ({
          id: t.id,
          name: t.name,
          created_at: t.created_at ?? '',
        }));
        this.totalTemplates = this.ultimosTemplates.length;
        const ps = data.por_status ?? {};
        this.porStatus = {
          pending: Number(ps['pending'] ?? ps['Pending'] ?? 0),
          approved: Number(ps['approved'] ?? ps['Approved'] ?? 0),
          rejected: Number(ps['rejected'] ?? ps['Rejected'] ?? 0),
        };
      },
      error: () => {
        this.estadoCarregando = false;
        this.estadoErro = true;
        this.mensagemErro = 'Não foi possível carregar o dashboard.';
      },
    });
  }
}
