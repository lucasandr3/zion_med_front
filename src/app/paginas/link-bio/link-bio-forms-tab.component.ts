import { Component, EventEmitter, Input, Output, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkBioFormLink } from '../../core/services/link-bio.service';
import { ToastService } from '../../core/services/toast.service';
import { GestgoCardComponent } from '@/shared/components/card/card.component';


@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-link-bio-forms-tab',
  standalone: true,
  imports: [RouterLink, GestgoCardComponent],
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
