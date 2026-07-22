export class UpxDecimalMask {
    type = 2;

    getRawValue(value: string): string {
        if (!value) return '';

        let rawValue = '';

        if (value.includes('R$')) {
            rawValue = value
                .replace(/^R\$\s?/, '')
                .replace(/\./g, '')
                .replace(',', '.');
        } else {
            rawValue = value.replace(/\,/g, '.');
        }

        return rawValue;
    }

    format(value: string): string {
        return this.getRawValue(value);
    }

    getValueFormatted(originalValue: string): string {
        return this.format(originalValue);
    }

    getValue(originalValue: string): string {
        return this.getRawValue(originalValue);
    }
}
