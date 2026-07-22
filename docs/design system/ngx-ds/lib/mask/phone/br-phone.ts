interface optionsBrPhoneNumberMask {
    types: string[];
    size: string;
}

const StringMask = require('../../includes/string.mask.js');

export class UpxBrPhoneNumberMask {
    options: optionsBrPhoneNumberMask = {
        types: ['phone', 'mobile', '0800'],
        size: 'all', // countryCode, areaCode, simple, all
    };

    phoneMask = {
        countryCode: new StringMask('+00 (00) 0000-0000'), //with country code
        areaCode: new StringMask('(00) 0000-0000'), //with area code
        simple: new StringMask('0000-0000'), //without area code
    };

    mobilePhone = {
        countryCode: new StringMask('+00 (00) 00000-0000'), //with country code
        areaCode: new StringMask('(00) 00000-0000'), //with area code
        simple: new StringMask('00000-0000'), //without area code
    };

    mask0800 = {
        countryCode: null, //N/A
        areaCode: null, //N/A
        simple: new StringMask('0000-000-0000'), //N/A, so it's "simple"
    };

    maskSizes = {
        countryCode: { sliceSize: 13, min: 12, max: 13 },
        areaCode: { sliceSize: 11, min: 10, max: 11 },
        simple: { sliceSize: 9, min: 8, max: 9 },
        all: { sliceSize: 13, min: 8, max: 13 },
    };

    constructor(options?: optionsBrPhoneNumberMask) {
        if (options) this.options = { ...this.options, ...options };
    }

    findMaskSizes() {
        let maskSize = this.maskSizes.all;

        if (this.options.size !== 'all') {
            let sizeOption = this.options.size;
            Object.entries(this.maskSizes).forEach(([key, value], index) => {
                if (key === sizeOption) {
                    maskSize = value;
                    return;
                }
            });
        }

        return maskSize;
    }

    clearValue(rawValue: string) {
        let maskSize = this.findMaskSizes();
        return rawValue
            .toString()
            .replace(/[^0-9]/g, '')
            .slice(0, maskSize.sliceSize);
    }

    format(cleanValue: string) {
        let formattedValue;

        if (
            cleanValue.indexOf('0800') === 0 &&
            this.options.types.includes('0800')
        ) {
            formattedValue = this.mask0800.simple.apply(cleanValue);
        } else if (
            cleanValue.length < 9 &&
            this.options.types.includes('phone')
        ) {
            formattedValue = this.phoneMask.simple.apply(cleanValue) || '';
        } else if (
            cleanValue.length < 10 &&
            this.options.types.includes('mobile')
        ) {
            formattedValue = this.mobilePhone.simple.apply(cleanValue);
        } else if (
            cleanValue.length < 11 &&
            this.options.types.includes('phone')
        ) {
            formattedValue = this.phoneMask.areaCode.apply(cleanValue);
        } else if (
            cleanValue.length < 12 &&
            this.options.types.includes('mobile')
        ) {
            formattedValue = this.mobilePhone.areaCode.apply(cleanValue);
        } else if (
            cleanValue.length < 13 &&
            this.options.types.includes('phone')
        ) {

            formattedValue = this.phoneMask.countryCode.apply(cleanValue);
        } else if (this.options.types.includes('mobile')) {
            formattedValue = this.mobilePhone.countryCode.apply(cleanValue);
        }

        return formattedValue.trim().replace(/[^0-9]$/, '');
    }

    getValue(originalValue: string) {
        return this.format(this.clearValue(originalValue));
    }
}
