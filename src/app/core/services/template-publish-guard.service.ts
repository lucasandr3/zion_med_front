import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import {
  ZardDialogOptions,
  ZardDialogService,
} from '@/shared/components/dialog';
import {
  TemplateVersionCompareResult,
  TemplatesService,
} from './templates.service';
import {
  TemplateVersionDiffDialogData,
  ZmTemplateVersionDiffDialogContentComponent,
} from '../../paginas/templates/template-version-diff-dialog-content.component';

@Injectable({ providedIn: 'root' })
export class TemplatePublishGuardService {
  private readonly templates = inject(TemplatesService);
  private readonly zardDialog = inject(ZardDialogService);

  /** Retorna `true` se o usuário confirmou publicar (ou não havia diff). */
  async confirmPublishIfNeeded(templateId: number): Promise<boolean> {
    const diff = await firstValueFrom(this.templates.compararVersoes(templateId));
    if (!diff.has_changes) {
      return true;
    }

    return this.openDiffDialog(diff);
  }

  private openDiffDialog(diff: TemplateVersionCompareResult): Promise<boolean> {
    return new Promise((resolve) => {
      let settled = false;
      const settle = (value: boolean): void => {
        if (settled) return;
        settled = true;
        resolve(value);
      };

      const config = new ZardDialogOptions<
        ZmTemplateVersionDiffDialogContentComponent,
        TemplateVersionDiffDialogData
      >();
      config.zTitle = 'Alterações desde a última versão';
      config.zContent = ZmTemplateVersionDiffDialogContentComponent;
      config.zData = { diff };
      config.zOkText = 'Publicar mesmo assim';
      config.zCancelText = 'Cancelar';
      config.zClosable = false;
      config.zMaskClosable = true;
      config.zWidth = '32rem';
      config.zCustomClasses = 'sm:max-w-lg';
      config.zOnOk = () => settle(true);
      config.zOnCancel = () => settle(false);

      const dialogRef = this.zardDialog.create(config);
      const originalClose = dialogRef.close.bind(dialogRef);
      dialogRef.close = (result?: boolean): void => {
        if (!settled) {
          settle(result === true);
        }
        originalClose(result);
      };
    });
  }
}
