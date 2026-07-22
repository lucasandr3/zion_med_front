const StringMask = require('../../includes/string.mask.js');

export class UpxCpfCnpjMask {
    cnpjPattern = new StringMask('00.000.000/0000-00');
    cpfPattern = new StringMask('000.000.000-00');

    clearValue(rawValue: string) {
        return rawValue.replace(/[^\d]/g, '').slice(0, 14);
    }

    format(cleanValue: string) {
        let formatedValue;

        if (cleanValue.length > 11) {
            formatedValue = this.cnpjPattern.apply(cleanValue);
        } else {
            formatedValue = this.cpfPattern.apply(cleanValue) || '';
        }

        return formatedValue.trim().replace(/[^0-9]$/, '');
    }

    getValue(originalValue: string) {
        return this.format(this.clearValue(originalValue));
    }

    isCPF(value: string) {
        return this.clearValue(value).length === 11;
    }

    isCNPJ(value: string) {
        return this.clearValue(value).length === 14;
    }
}
