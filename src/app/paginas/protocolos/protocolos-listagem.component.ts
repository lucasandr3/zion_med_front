import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProtocolosService, Protocolo } from '../../core/services/protocolos.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-protocolos-listagem',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './protocolos-listagem.component.html',
  styleUrl: './protocolos-listagem.component.css',
})
export class ProtocolosListagemComponent implements OnInit {
  protocolos: Protocolo[] = [];
  meta: { current_page: number; last_page: number; per_page: number; total: number } = {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  };
  carregando = false;
  erro = '';

  private protocolosService = inject(ProtocolosService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(page = 1): void {
    this.carregando = true;
    this.protocolosService.list({ per_page: 20, page }).subscribe({
      next: (res) => {
        this.protocolos = res.data;
        this.meta = res.meta;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar os protocolos.';
      },
    });
  }
}
