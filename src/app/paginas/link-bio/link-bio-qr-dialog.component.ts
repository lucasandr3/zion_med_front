import { Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import { ToastService } from '../../core/services/toast.service';
import {
  downloadPublicFormQrPng,
  getOrCreatePublicFormQrDataUrl,
} from '../../core/utils/public-form-qr.util';

@Component({
  selector: 'zm-link-bio-qr-dialog',
  standalone: true,
  imports: [CommonModule, ZardButtonComponent, ZardSkeletonComponent],
  templateUrl: './link-bio-qr-dialog.component.html',
  styleUrl: './link-bio-qr-dialog.component.css',
})
export class LinkBioQrDialogComponent implements OnChanges {
  @Input() open = false;
  @Input() publicUrl = '';
  @Input() clinicName = '';

  @Output() closed = new EventEmitter<void>();

  qrCarregando = false;
  qrDataUrl = '';

  private toast = inject(ToastService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      void this.carregarQr();
    }
    if (changes['open']?.currentValue === false) {
      this.qrDataUrl = '';
      this.qrCarregando = false;
    }
  }

  fechar(): void {
    this.closed.emit();
  }

  baixar(): void {
    if (!this.qrDataUrl || !this.clinicName) return;
    downloadPublicFormQrPng(this.qrDataUrl, this.clinicName);
    this.toast.success('Download iniciado', 'O QR code foi salvo no seu dispositivo.');
  }

  private async carregarQr(): Promise<void> {
    if (!this.publicUrl) {
      this.toast.warning('Link indisponível', 'A página pública ainda não possui URL.');
      this.fechar();
      return;
    }
    this.qrCarregando = true;
    this.qrDataUrl = '';
    try {
      this.qrDataUrl = await getOrCreatePublicFormQrDataUrl(this.publicUrl);
    } catch {
      this.toast.error('QR code', 'Não foi possível gerar o QR code deste link.');
      this.fechar();
    } finally {
      this.qrCarregando = false;
    }
  }
}
