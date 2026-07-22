const StringMask = require('../../includes/string.mask.js');

export class UpxDecimalAliquotaMask {
	// Não precisamos de um pattern do StringMask nesse caso,
    // faremos a formatação manualmente
    type = 1;

    getRawValue(value: string | number): number {
        if (typeof value === 'number') {
            return value;
        }

        const numericOnly = value.replace(/[^\d]/g, '');
        const parsed = parseInt(numericOnly, 10);

        return isNaN(parsed) ? 0 : parsed / 10000;
    }

    format(rawValue: string | number): string {
        const numeric = typeof rawValue === 'number' ? rawValue : this.getRawValue(rawValue);

        return numeric.toFixed(4).replace('.', ','); // sempre 4 casas com vírgula
    }

    getValueFormated(originalValue: string): string {
        return this.format(this.getRawValue(originalValue));
    }

    getValue(originalValue: string): string {
        return this.getValueFormated(originalValue);
    }
}
