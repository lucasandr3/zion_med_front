const StringMask = require('../../includes/string.mask.js');

export class UpxMoneyMask {
    moneyPattern = new StringMask('R$ #.##0,00', { reverse: true });
    decimalPattern = new StringMask('R$ #.##0,00', { reverse: false });

	type = 1;

    getRawValue(value: string, isDecimal: boolean = false) {
		if(typeof value == 'number') {
			return value
		}

        let rawValue = '';

        if(isDecimal) {
            rawValue = value.replace('R$', '').replace(',', '');
        } else {
            rawValue = value.replace('R$', '').replace(/\./g, '').replace(',', '');
        }
    
        return parseFloat(rawValue);
    }

    format(rawValue: string | number, isDecimal: boolean = false) {
        let formatedValue = '';

        if(isDecimal) {
            const numValue = typeof rawValue === 'number' ? rawValue : parseFloat(rawValue.toString());
            if(isNaN(numValue)) {
                return 'R$ 0,00';
            }
            
            const formatted = numValue.toFixed(2).replace('.', ',');
            const parts = formatted.split(',');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            formatedValue = 'R$ ' + parts.join(',');
        } else {
            formatedValue = this.moneyPattern.apply(rawValue) || 'R$ 0,00';
        }

        return formatedValue;
    }

    getValueFormated(originalValue: string, isDecimal: boolean = false) {
        return this.format(this.getRawValue(originalValue, isDecimal), isDecimal);
    }

	getValue(originalValue: string) {
        return this.format(this.getRawValue(originalValue));
    }
}
