const StringMask = require('../../includes/string.mask.js');

export class UpxPlacaMask {

    platePattern = new StringMask('AAA-AAAA');

    getRawValue(value: any) {
        const rawValue = value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
        return rawValue;
    }

    format(rawValue: string) {

        let formatedValue = '';

        // Aplica a máscara
        if (rawValue.length >= 7) {
            formatedValue = this.platePattern.apply(rawValue) || '';
        } else {
            formatedValue = rawValue;
        }

        return formatedValue;

    }

    getValueFormated(originalValue: string) {
        const rawValue = this.getRawValue(originalValue);
        return this.format(rawValue);
    }

}
