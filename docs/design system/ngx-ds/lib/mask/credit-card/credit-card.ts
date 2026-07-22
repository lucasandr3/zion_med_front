const StringMask = require('../../includes/string.mask.js');

export class UpxCreditCardMask {
    creditCardPattern = new StringMask('0000 0000 0000 0000'); // sem reverse
	deaDatePattern = new StringMask('00/0000'); // sem reverse
	type = 'credit-card';
    getRawValue(value: any) {
        // Remove qualquer caractere não numérico
        const rawValue = value.replace(/\D/g, '');
        return rawValue;
    }

    format(rawValue: string | number) {
        // Aplica a máscara progressivamente, com base no comprimento dos números digitados
		let formattedValue ='';
		if (this.type == 'credit-card') {
			 formattedValue = this.creditCardPattern.apply(rawValue) || '';
		}else{
			formattedValue = this.deaDatePattern.apply(rawValue) || '';
		}

        return formattedValue;
    }

    getValueFormatted(originalValue: string, mask: string) {
		this.type = mask;
        // Obtém o valor sem formatação e aplica a máscara
        const rawValue = this.getRawValue(originalValue);
        return this.format(rawValue);
    }
}
