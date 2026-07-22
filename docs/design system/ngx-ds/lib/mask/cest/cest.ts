const StringMask = require('../../includes/string.mask.js');

export class UpxCestMask {
    
    private maskPattern = '00.000.00'; // Padrão da máscara

    getRawValue(value: string) {
        return value.replace(/\D/g, ""); // Remove caracteres não numéricos
    }

    format(rawValue: string | number) {
        if (typeof rawValue !== 'string') {
            rawValue = rawValue.toString(); // Converte para string se for número
        }

        let onlyNumbers = this.getRawValue(rawValue); // Remove caracteres que não são números

        // Se o usuário apagar tudo, retorna string vazia
        if (!onlyNumbers) return "";

        // Aplica a máscara considerando que pode haver remoção
        let formattedValue = "";
        for (let i = 0, j = 0; i < this.maskPattern.length && j < onlyNumbers.length; i++) {
            if (this.maskPattern[i] === "0") {
                formattedValue += onlyNumbers[j];
                j++;
            } else {
                formattedValue += this.maskPattern[i];
            }
        }

        return formattedValue;
    }

    getValueFormated(originalValue: string) {
        return this.format(originalValue);
    }

    getValue(originalValue: string) {
        return this.format(originalValue);
    }
}
