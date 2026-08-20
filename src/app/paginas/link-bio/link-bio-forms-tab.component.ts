import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkBioFormLink } from '../../core/services/link-bio.service';
import { ToastService } from '../../core/services/toast.service';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

@Component({
  selector: 'zm-link-bio-forms-tab',
  standalone: true,
  imports: [RouterLink, ZardCardComponent, ZardButtonComponent],
  templateUrl: './link-bio-forms-tab.component.html',
})
export class LinkBioFormsTabComponent {
  @Input({ required: true }) forms: LinkBioFormLink[] = [];

  private toast = inject(ToastService);

  copiedFormId: number | null = null;

  copiarLinkForm(f: LinkBioFormLink): void {
    if (!f.public_url) return;
    navigator.clipboard.writeText(f.public_url).then(
      () => {
        this.copiedFormId = f.id;
        this.toast.success('Link copiado', 'Cole e compartilhe o formulário.');
        window.setTimeout(() => {
          if (this.copiedFormId === f.id) {
            this.copiedFormId = null;
          }
        }, 2000);
      },
      () => this.toast.error('Não foi possível copiar', 'Tente novamente.'),
    );
  }
}
