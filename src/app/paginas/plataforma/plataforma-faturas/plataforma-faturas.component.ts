import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformaService, PlatformInvoice } from '../../../core/services/plataforma.service';
import { LoadingOverlayComponent } from '../../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-plataforma-faturas',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './plataforma-faturas.component.html',
  styleUrl: './plataforma-faturas.component.css',
})
export class PlataformaFaturasComponent implements OnInit {
  estadoCarregando = false;
  estadoErro = false;
  faturas: PlatformInvoice[] = [];

  private plataformaService = inject(PlataformaService);

  ngOnInit(): void {
    this.estadoCarregando = true;
    this.plataformaService.getInvoices().subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        this.faturas = res.data ?? [];
      },
      error: () => {
        this.estadoCarregando = false;
        this.estadoErro = true;
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

  formatarValor(valor: number | null | undefined, moeda?: string | null): string {
    if (valor == null) return '—';
    const symbol = moeda === 'BRL' || !moeda ? 'R$' : moeda;
    return symbol + ' ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
