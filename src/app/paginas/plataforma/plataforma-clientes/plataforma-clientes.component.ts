import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlataformaService, PlatformTenant } from '../../../core/services/plataforma.service';
import { LoadingOverlayComponent } from '../../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-plataforma-clientes',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingOverlayComponent],
  templateUrl: './plataforma-clientes.component.html',
  styleUrl: './plataforma-clientes.component.css',
})
export class PlataformaClientesComponent implements OnInit {
  estadoCarregando = false;
  estadoErro = false;
  tenants: PlatformTenant[] = [];

  private plataformaService = inject(PlataformaService);

  ngOnInit(): void {
    this.estadoCarregando = true;
    this.plataformaService.getTenants().subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        this.tenants = res.data ?? [];
      },
      error: () => {
        this.estadoCarregando = false;
        this.estadoErro = true;
      },
    });
  }
}
