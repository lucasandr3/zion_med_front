const StringMask = require('../../includes/string.mask.js');

export class UpxCepMask {
    percentPattern =  new StringMask('00000-000');

    getRawValue(value: any) {

        const rawValue = value
            .replace(/\-/g, '')


        return (rawValue);
    }

    format(rawValue: string | number) {
		let typeValue = rawValue.toString();
		let formatedValue = '';
		if (typeValue.length > 5) {
			formatedValue = this.percentPattern.apply(rawValue) || '';
		}
		else{
			formatedValue = typeValue;
		}


        return formatedValue;
    }

    getValueFormated(originalValue: string) {
        return this.format(this.getRawValue(originalValue));
    }
}
