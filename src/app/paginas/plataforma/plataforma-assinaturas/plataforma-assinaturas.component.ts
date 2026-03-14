import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformaService, PlatformSubscription } from '../../../core/services/plataforma.service';
import { LoadingOverlayComponent } from '../../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-plataforma-assinaturas',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './plataforma-assinaturas.component.html',
  styleUrl: './plataforma-assinaturas.component.css',
})
export class PlataformaAssinaturasComponent implements OnInit {
  estadoCarregando = false;
  estadoErro = false;
  assinaturas: PlatformSubscription[] = [];

  private plataformaService = inject(PlataformaService);

  ngOnInit(): void {
    this.estadoCarregando = true;
    this.plataformaService.getSubscriptions().subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        this.assinaturas = res.data ?? [];
      },
      error: () => {
        this.plataformaService.getSubscriptionsFromTenants().subscribe({
          next: (res) => {
            this.estadoCarregando = false;
            this.assinaturas = res.data ?? [];
          },
          error: () => {
            this.estadoCarregando = false;
            this.estadoErro = true;
          },
        });
      },
    });
  }

  formatarData(iso?: string | null): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return iso;
    }
  }
}
