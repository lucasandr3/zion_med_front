const StringMask = require('../../includes/string.mask.js');

/**
 * Percentual com até 4 casas decimais (máscara reversa, mesmo fluxo de UpxPercentMask).
 * Durante a digitação usa dígitos inteiros (ex.: 3600 → 0,36%; 20000 → 2,0000%).
 * Na carga do registro, use formatFromStoredValue() para não confundir 2% com 0,0002%.
 */
export class UpxPercent4DecimalsMask {
	percentPattern = new StringMask('##0,0000', { reverse: true });
	private readonly scale = 10000;

	getRawValue(value: string | number | null | undefined): number {
		if (value === null || value === undefined || value === '') {
			return 0;
		}

		if (typeof value === 'number') {
			return Math.round(value * this.scale);
		}

		// Durante a digitação/backspace: só dígitos (máscara reversa), igual UpxPercentMask.
		// Parsing decimal (2,0000 = 2%) fica em formatFromStoredValue / parseFormValueToDecimal.
		const rawValue = String(value)
			.replace('%', '')
			.replace(/\./g, '')
			.replace(',', '');

		return parseFloat(rawValue) || 0;
	}

	format(maskUnits: string | number, trimDisplay = false): string {
		const formatted =
			this.percentPattern.apply(maskUnits) || '0,0000';
		return trimDisplay ? this.trimTrailingZeros(formatted) : formatted;
	}

	getValueFormated(originalValue: string | number | null | undefined): string {
		if (originalValue === null || originalValue === undefined) {
			return '';
		}

		const str = String(originalValue).trim();
		if (str === '') {
			return '';
		}

		const digits = str.replace(/\D/g, '');
		if (digits === '' || /^0+$/.test(digits)) {
			return '';
		}

		return this.format(this.getRawValue(originalValue), false);
	}

	/** Converte valor gravado (0,36 / 0.36 / 2 / 2.0000) para exibição na máscara de 4 casas. */
	formatFromStoredValue(stored: string | number): string {
		const decimal = this.parseStoredToDecimal(stored);
		if (decimal === 0) {
			return '';
		}

		const maskUnits = Math.round(decimal * this.scale);
		return this.format(maskUnits, false);
	}

	/** Converte valor do FormControl (máscara) para decimal percentual (2 = 2%). */
	parseFormValueToDecimal(value: string | number | null | undefined): number {
		if (value === null || value === undefined || value === '') {
			return 0;
		}
		if (typeof value === 'number') {
			return Number.isFinite(value) ? value : 0;
		}

		const str = String(value).replace('%', '').trim();
		if (!str) {
			return 0;
		}

		if (str.includes(',')) {
			const parsed = parseFloat(str.replace(/\./g, '').replace(',', '.'));
			return Number.isFinite(parsed) ? parsed : 0;
		}

		if (str.includes('.')) {
			const parsed = parseFloat(str);
			return Number.isFinite(parsed) ? parsed : 0;
		}

		return (parseFloat(str.replace(/\D/g, '')) || 0) / this.scale;
	}

	private parseStoredToDecimal(stored: string | number): number {
		if (typeof stored === 'number') {
			return Number.isFinite(stored) ? stored : 0;
		}

		const str = String(stored).replace('%', '').trim();
		if (!str) {
			return 0;
		}

		if (str.includes(',')) {
			const normalized = str.replace(/\./g, '').replace(',', '.');
			const parsed = parseFloat(normalized);
			return Number.isFinite(parsed) ? parsed : 0;
		}

		if (str.includes('.')) {
			const parsed = parseFloat(str);
			return Number.isFinite(parsed) ? parsed : 0;
		}

		// Valor decimal gravado sem separador (ex.: "2" = 2%)
		const parsed = parseFloat(str.replace(/\D/g, ''));
		return Number.isFinite(parsed) ? parsed : 0;
	}

	private trimTrailingZeros(formatted: string): string {
		if (!formatted.includes(',')) {
			return formatted;
		}

		const [intPart, decPart] = formatted.split(',');
		const trimmedDec = decPart.replace(/0+$/, '');
		return trimmedDec.length > 0 ? `${intPart},${trimmedDec}` : intPart;
	}
}
