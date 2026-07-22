import { Component, OnInit, OnDestroy, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import {
  PlataformaService,
  PlatformTenantClinic,
  PlatformTenantDetail,
} from '../../../core/services/plataforma.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../../shared/components/ui';
import { statusAssinaturaOuCobrancaPt } from '../../../core/utils/status-labels-pt';

@Component({
  selector: 'app-plataforma-cliente-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ZardCardComponent,
    ZardBadgeComponent,
    ZmSkeletonListComponent,
    ZmEmptyStateComponent,
  ],
  templateUrl: './plataforma-cliente-detalhe.component.html',
  styleUrl: './plataforma-cliente-detalhe.component.css',
})
export class PlataformaClienteDetalheComponent implements OnInit, OnDestroy {
  protected readonly rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;

  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  data: PlatformTenantDetail | null = null;
  clinicasExpandidas = new Set<number>();

  private route = inject(ActivatedRoute);
  private plataformaService = inject(PlataformaService);
  private headerService = inject(PlataformaHeaderService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getTenant(+id));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.data = res.data;
        if (res.data?.tenant) {
          this.headerService.setHeader(
            'Cliente: ' + res.data.tenant.name,
            'Visão executiva do tenant e empresas vinculadas.',
          );
        }
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      },
    });
  }

  ngOnDestroy(): void {
    this.headerService.clearHeader();
  }

  iniciais(nome: string): string {
    const partes = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (partes.length === 0) return '?';
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }

  alternarDetalhes(clinicId: number): void {
    if (this.clinicasExpandidas.has(clinicId)) {
      this.clinicasExpandidas.delete(clinicId);
    } else {
      this.clinicasExpandidas.add(clinicId);
    }
  }

  detalheExpandido(clinicId: number): boolean {
    return this.clinicasExpandidas.has(clinicId);
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

  formatarDataHora(iso?: string | null): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  }

  formatarValor(valor?: number | null): string {
    if (valor == null) return '—';
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatarDocumento(doc?: string | null): string {
    if (!doc) return '—';
    const digits = doc.replace(/\D/g, '');
    if (digits.length === 14) {
      return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
    if (digits.length === 11) {
      return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
    return doc;
  }

  badgeTipoStatus(status?: string | null): 'default' | 'secondary' | 'destructive' | 'outline' {
    const k = (status ?? '').toLowerCase();
    if (['active', 'ok', 'paid', 'received', 'confirmed'].includes(k)) return 'default';
    if (['trial', 'trialing', 'attention', 'pending', 'past_due'].includes(k)) return 'secondary';
    if (['blocked', 'inactive', 'canceled', 'cancelled', 'unpaid', 'overdue'].includes(k)) return 'destructive';
    return 'outline';
  }

  badgeTipoAcesso(acesso?: boolean): 'default' | 'destructive' {
    return acesso ? 'default' : 'destructive';
  }

  planoRotulo(clinic: PlatformTenantClinic): string {
    if (clinic.plan_name) return clinic.plan_name;
    return clinic.plan_key ?? '—';
  }

  limiteUsuarios(clinic: PlatformTenantClinic): string {
    const max = clinic.max_users;
    if (max == null) return `${clinic.users_count}`;
    return `${clinic.users_count}/${max}`;
  }
}
