import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import {
  GestgoDialogOptions,
  GestgoDialogService,
} from '@/shared/components/dialog';
import {
  TemplateVersionCompareResult,
  TemplatesService,
} from './templates.service';
import {
  TemplateVersionDiffDialogData,
  ZmTemplateVersionDiffDialogContentComponent,
} from '../../paginas/templates/template-version-diff-dialog-content.component';
import { ConfirmDialogService } from './confirm-dialog.service';
import { ToastService } from './toast.service';
import {
  extractApiErrorMessage,
  extractClinicalValidationIssues,
  formatClinicalValidationMessage,
} from '../utils/clinical-validation.util';

@Injectable({ providedIn: 'root' })
export class TemplatePublishGuardService {
  private readonly templates = inject(TemplatesService);
  private readonly gestgoDialog = inject(GestgoDialogService);
  private readonly confirm = inject(ConfirmDialogService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  /** Retorna `true` se o usuário confirmou publicar (ou não havia diff). */
  async confirmPublishIfNeeded(templateId: number): Promise<boolean> {
    const diff = await firstValueFrom(this.templates.compararVersoes(templateId));
    if (!diff.has_changes) {
      return true;
    }

    return this.openDiffDialog(diff);
  }

  /**
   * Exibe erros/avisos de validação clínica ao falhar a publicação.
   * Preferência: modal com as mensagens da API (toast único engolia o detalhe).
   * Com `templateId`, o botão principal vira **Editar** e abre a ficha do modelo.
   */
  async reportPublishFailure(err: unknown, templateId?: number): Promise<void> {
    const issues = extractClinicalValidationIssues(err);
    if (issues.length) {
      const hasError = issues.some((i) => i.level === 'error');
      const canEdit = templateId != null && Number.isFinite(templateId) && templateId > 0;
      const goEdit = await this.confirm.request({
        title: hasError ? 'Não foi possível publicar' : 'Atenção ao publicar',
        message: formatClinicalValidationMessage(issues),
        confirmLabel: canEdit ? 'Editar' : 'Entendi',
        cancelLabel: 'Fechar',
        variant: canEdit ? 'neutral' : hasError ? 'danger' : 'neutral',
      });
      if (goEdit && canEdit) {
        void this.router.navigate(['/templates', templateId, 'editar']);
      }
      return;
    }

    this.toast.error(
      'Erro ao publicar',
      extractApiErrorMessage(err, 'Não foi possível publicar o link deste modelo.'),
    );
  }

  private openDiffDialog(diff: TemplateVersionCompareResult): Promise<boolean> {
    return new Promise((resolve) => {
      let settled = false;
      const settle = (value: boolean): void => {
        if (settled) return;
        settled = true;
        resolve(value);
      };

      const config = new GestgoDialogOptions<
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

      const dialogRef = this.gestgoDialog.create(config);
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
