const StringMask = require('../../includes/string.mask.js');

export class UpxDateBRMask {
    private datePattern = new StringMask('00/00/0000'); // Formato dd/MM/yyyy
    type = 'date';

    getRawValue(value: any): string {
        // Remove tudo que não for número
        const rawValue = value ? value.toString().replace(/\D/g, '') : '';
        // Limita a 8 dígitos (dd/mm/yyyy) - isso impede mais de 4 dígitos no ano
        return rawValue.substring(0, 8);
    }

    format(rawValue: string | number): string {
        if (!rawValue) return '';
        const formattedValue = this.datePattern.apply(rawValue) || '';
        return formattedValue;
    }

    getValueFormatted(originalValue: string, mask: string = 'date'): string {
        this.type = mask;
        const rawValue = this.getRawValue(originalValue);
        return this.format(rawValue);
    }
}
