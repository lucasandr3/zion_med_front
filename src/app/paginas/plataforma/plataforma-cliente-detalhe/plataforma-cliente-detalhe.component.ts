import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlataformaService, PlatformTenantDetail } from '../../../core/services/plataforma.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingOverlayComponent } from '../../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-plataforma-cliente-detalhe',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './plataforma-cliente-detalhe.component.html',
  styleUrl: './plataforma-cliente-detalhe.component.css',
})
export class PlataformaClienteDetalheComponent implements OnInit, OnDestroy {
  estadoCarregando = false;
  estadoErro = false;
  data: PlatformTenantDetail | null = null;

  private route = inject(ActivatedRoute);
  private plataformaService = inject(PlataformaService);
  private headerService = inject(PlataformaHeaderService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.estadoCarregando = true;
    this.plataformaService.getTenant(+id).subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        this.data = res.data;
        if (res.data?.tenant) {
          this.headerService.setHeader(
            'Tenant: ' + res.data.tenant.name,
            'Detalhes do cliente e empresas vinculadas.'
          );
        }
      },
      error: () => {
        this.estadoCarregando = false;
        this.estadoErro = true;
      },
    });
  }

  ngOnDestroy(): void {
    this.headerService.clearHeader();
  }
}
