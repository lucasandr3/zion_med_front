const StringMask = require('../../includes/string.mask.js');

export class UpxWeightMask {
    percentPattern = new StringMask('##0,000', { reverse: true });
    getRawValue(value: any) {
		const parts = value.split(".");
	    if (parts.length === 2) {
	        //parts[1] = parts[1].substring(0, parts[1].length - 1);
	        value = parts.join(".");
	    }
        const rawValue = value
            .replace('%', '')
			.replace(/\./g, '')
            .replace(',', '');

        return (parseFloat(rawValue ));
    }

    format(rawValue: string | number) {
        let formatedValue = '';
		formatedValue = this.percentPattern.apply(rawValue) || '';
        return formatedValue;
    }

    getValueFormated(originalValue: string) {
        return this.format(this.getRawValue(originalValue));
    }
}
