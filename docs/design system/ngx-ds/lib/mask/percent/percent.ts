const StringMask = require('../../includes/string.mask.js');

export class UpxPercentMask {
    percentPattern = new StringMask('##0,00', { reverse: true });
    getRawValue(value: any) {
		if (typeof value == 'string') {
			const parts = value.split(".");
			if (parts.length === 2) {
				//parts[1] = parts[1].substring(0, parts[1].length - 1);
				value = parts.join(".");

			}
		}
		else{
			value = value.toString();
		}

        const rawValue = value
            .replace('%', '')
			.replace(/\./g, '')
            .replace(',', '');

        return (parseFloat(rawValue ));
    }

    format(rawValue: string | number) {
        let formatedValue = '';
		formatedValue = this.percentPattern.apply(rawValue) || '0,00';
        return formatedValue;
    }

    getValueFormated(originalValue: string) {
        return this.format(this.getRawValue(originalValue));
    }
}
