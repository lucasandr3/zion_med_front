import { Pipe, PipeTransform } from '@angular/core';

import { formatarDataBr, formatarDataHoraBr } from '@/shared/utils/date';

/**
 * Exibe datas no formato brasileiro.
 * - `{{ v | dateBr }}` → dd/mm/aaaa
 * - `{{ v | dateBr:'datetime' }}` → dd/mm/aaaa HH:mm
 */
@Pipe({ name: 'dateBr', standalone: true })
export class DateBrPipe implements PipeTransform {
  transform(value: string | Date | null | undefined, mode: 'date' | 'datetime' = 'date'): string {
    if (value == null || value === '') return '';
    return mode === 'datetime' ? formatarDataHoraBr(value) : formatarDataBr(value);
  }
}
