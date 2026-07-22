const StringMask = require('../../includes/string.mask.js');

export class UpxNumberMask {


    getRawValue(value: string) {

        const rawValue = value.replace(/(?!^-)[^0-9]/g, "");
        return rawValue;
    }



    getValueFormated(originalValue: string|number) {
		if (typeof originalValue == 'number') {
			originalValue = originalValue.toString();
		}

        return this.getRawValue(originalValue);
    }
}
