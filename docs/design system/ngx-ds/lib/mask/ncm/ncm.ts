const StringMask = require('../../includes/string.mask.js');

export class UpxNcmMask {
    percentPattern = new StringMask('####.##.##');

    getRawValue(value: any) {
        if (typeof value == 'number') {
            value = value.toFixed(0);
        }
        const rawValue = value
            .replace(/\./g, '');


        // Evita a conversão para número, mantendo os zeros à esquerda
        return rawValue;
    }

    format(rawValue: string | number) {
        // Aplique o padrão ao valor bruto formatado
        const formattedValue = this.percentPattern.apply(rawValue.toString()) || '';
        return formattedValue;
    }

    getValueFormated(originalValue: string) {
        // Chame as funções para formatar mantendo os zeros à esquerda
        return this.format(this.getRawValue(originalValue));
    }
}
