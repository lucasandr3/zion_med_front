import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformaService, PlatformLead } from '../../../core/services/plataforma.service';
import { LoadingOverlayComponent } from '../../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-plataforma-leads',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './plataforma-leads.component.html',
  styleUrl: './plataforma-leads.component.css',
})
export class PlataformaLeadsComponent implements OnInit {
  estadoCarregando = false;
  estadoErro = false;
  leads: PlatformLead[] = [];

  private plataformaService = inject(PlataformaService);

  ngOnInit(): void {
    this.estadoCarregando = true;
    this.plataformaService.getLeads().subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        this.leads = res.data ?? [];
      },
      error: () => {
        this.estadoCarregando = false;
        this.estadoErro = true;
      },
    });
  }

  formatarData(iso?: string): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return iso;
    }
  }
}
