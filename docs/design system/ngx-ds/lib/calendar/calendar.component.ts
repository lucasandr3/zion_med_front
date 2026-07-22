import {
	Component,
	EventEmitter,
	Input,
	NgZone,
	OnChanges,
	OnInit,
	Output,
	Renderer2,
	SimpleChanges,
	ViewChild,
	AfterViewInit,
	inject,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	ViewEncapsulation,
} from '@angular/core';
import { CardModule } from '../card/card.module';
import {
	MatCalendar,
	MatCalendarCellCssClasses,
	MatDatepicker,
	MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { PaginaService } from 'projects/up/src/app/services/pagina.service';
import { formatDate } from '@angular/common';
import { TemaUtil } from 'projects/up/src/app/utils/tema.util';


/** @title Datepicker inline calendar example */
@Component({
	selector: 'upx-calendar',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	imports: [CardModule, MatDatepickerModule, MatNativeDateModule],
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges, AfterViewInit {
	@ViewChild(MatCalendar) calendar!: MatCalendar<Date>;
	@Output() fieldChange = new EventEmitter<any>();
	@Output() mudarMes = new EventEmitter<any>();
	@Output() meuEvento = new EventEmitter<string>();
	@Input() datesToHighlight: string[] = [];
	@Input() datesToHighlightDebit: string[] = [];
	@Input() datesToHighlightCredit: string[] = [];
  @Input() datesToHighlightLembret: string[] = [];
	@Input() datesToHighlightBirthdate: string[] = [];
	private highlightCreditSet = new Set<string>();
	private highlightDebitSet = new Set<string>();
	private highlightLembretSet = new Set<string>();
	private highlightBirthdateSet = new Set<string>();
	paginaService: PaginaService = inject(PaginaService);
	private temaUtil: TemaUtil = inject(TemaUtil);
	ngZone: NgZone = inject(NgZone);
	colorTheme:string = '';

	selectedDate: any;
	selectedMonth: any;
	minDate: string | null = null;
	maxDate: string | null = null;
	currentMonthYear: string = '';

	constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {
		
		this.ngZone.runOutsideAngular(() => {
			this.colorTheme = this.getTheme();
			setTimeout(() => {
				const buttons = document.querySelectorAll(`.mat-calendar-next-button, .mat-calendar-previous-button`)

				if (buttons) {
					Array.from(buttons).forEach((button) => {
						this.renderer.listen(button, 'click', () => {
							this.ngZone.run(() => {
								this.handleButtonClick();
							});
						});
					});
				}
			});
		});
	}

	async handleButtonClick() {
		const labelMes = document.querySelector('.mat-calendar-period-button .mdc-button__label span')?.textContent;
		
		if (labelMes) {
			const labelText = labelMes.trim() || '';

			try {
				await this.emitMudarMes(labelText);
			} catch (error) {
				console.error('Error in mudarMes.emit:', error);
			}
		}
	}

	emitMudarMes(labelText: string): Promise<void> {
		
		return new Promise<void>((resolve) => {
			this.mudarMes.emit(this.convertMonthYear(labelText));
			setTimeout(() => {
				resolve();
			}, 0);
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (
			changes['datesToHighlight'] ||
			changes['datesToHighlightDebit'] ||
			changes['datesToHighlightCredit'] ||
			changes['datesToHighlightLembret'] ||
			changes['datesToHighlightBirthdate']
		) {
			this.applyHighlightClasses();
		}
		this.cdr.markForCheck();
	}

	private rebuildHighlightSets(): void {
		this.highlightCreditSet = this.toFullDateKeySet(this.datesToHighlightCredit);
		this.highlightDebitSet = this.toFullDateKeySet(this.datesToHighlightDebit);
		this.highlightLembretSet = this.toFullDateKeySet(this.datesToHighlightLembret);
		this.highlightBirthdateSet = this.toMonthDayKeySet(this.datesToHighlightBirthdate);
	}

	private toFullDateKeySet(dates: string[]): Set<string> {
		const set = new Set<string>();
		for (const str of dates ?? []) {
			const key = this.toFullDateKey(str);
			if (key) {
				set.add(key);
			}
		}
		return set;
	}

	private toMonthDayKeySet(dates: string[]): Set<string> {
		const set = new Set<string>();
		for (const str of dates ?? []) {
			const d = new Date(str);
			if (!Number.isNaN(d.getTime())) {
				set.add(`${d.getMonth()}-${d.getDate()}`);
			}
		}
		return set;
	}

	private toFullDateKey(str: string): string | null {
		if (str == null || str === '') {
			return null;
		}
		const trimmed = String(str).trim();
		let d = new Date(trimmed);
		if (Number.isNaN(d.getTime()) && trimmed.includes('/')) {
			const [dia, mes, ano] = trimmed.split(/[\s/]+/);
			if (dia && mes && ano) {
				d = new Date(Number(ano), Number(mes) - 1, Number(dia));
			}
		}
		if (Number.isNaN(d.getTime())) {
			return null;
		}
		return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
	}

	private applyHighlightClasses(): void {
		this.rebuildHighlightSets();
		if (this.calendar) {
			this.calendar.dateClass = this.dateClass1();
			this.calendar.updateTodaysDate();
		}
	}

	updateDateClasses() {
		this.applyHighlightClasses();
	}

	ngOnInit() {
		// Initialization logic if any
	}

	ngAfterViewInit() {
		this.handleButtonClick();
		this.applyHighlightClasses();
	}

	onSelect(event: any) {
		this.paginaService.setLoading(true);
		this.fieldChange.emit(event);
		this.selectedDate = event;
		if (this.calendar) {
			this.calendar.updateTodaysDate();
		} else {
			console.error('Calendar is not initialized.');
		}
	}

	dateClass(): (date: Date) => MatCalendarCellCssClasses {
		return (date: Date): MatCalendarCellCssClasses => {
			let highlightDate = this.datesToHighlight
				.map((strDate) => new Date(strDate))
				.some(
					(d) =>
						d.getDate() === date.getDate() &&
						d.getMonth() === date.getMonth() &&
						d.getFullYear() === date.getFullYear()
				);
			return highlightDate ? 'credit-date' : '';
		};
	}


	debitClass(): (date: Date) => MatCalendarCellCssClasses {
		return (date: Date): MatCalendarCellCssClasses => {
			let highlightDateDebit = this.datesToHighlightDebit
				.map((strDate) => new Date(strDate))
				.some(
					(d) =>
						d.getDate() === date.getDate() &&
						d.getMonth() === date.getMonth() &&
						d.getFullYear() === date.getFullYear()
				);
			return highlightDateDebit ? 'debit-date' : '';
		};
	}

	dateClass1(): (date: Date) => MatCalendarCellCssClasses {
		return (date: Date): MatCalendarCellCssClasses => {
			const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
			const birthKey = `${date.getMonth()}-${date.getDate()}`;

			const highlightDateCredit = this.highlightCreditSet.has(dateKey);
			const highlightDateDebit = this.highlightDebitSet.has(dateKey);
			const highlightDateLembret = this.highlightLembretSet.has(dateKey);
			const highlightDateBirthdate = this.highlightBirthdateSet.has(birthKey);
			
			if (highlightDateCredit && highlightDateDebit && highlightDateLembret) {
				return ['triple-highlight'];
			} else if (highlightDateCredit && highlightDateDebit) {
				return ['double-highlight'];
			} else if (highlightDateCredit && highlightDateLembret || highlightDateCredit && highlightDateBirthdate) {
				return ['credit-lembret-highlight'];
			} else if (highlightDateDebit && highlightDateLembret  || highlightDateDebit && highlightDateBirthdate) {
				return ['debit-lembret-highlight'];
			} else if (highlightDateCredit) {
				return ['credit-date'];
			} else if (highlightDateDebit) {
				return ['debit-date'];
			} else if (highlightDateLembret || highlightDateBirthdate) {
				return ['lembret-date'];
			} else {
				return '';
			}
		};
	}

	OnChanges(cevent: any): void {
		this.updateDateClasses();
		this.cdr.markForCheck();
	}

	lembretClass(value: string[]) {
		return (date: Date): MatCalendarCellCssClasses => {
			let highlightDate = value
				.map((strDate) => new Date(strDate))
				.some(
					(d) =>
						d.getDate() === date.getDate() &&
						d.getMonth() === date.getMonth() &&
						d.getFullYear() === date.getFullYear()
				);

			return highlightDate ? 'credit-date' : '';
		};
	}

	CreditClass(value: string[]) {
		return (date: Date): MatCalendarCellCssClasses => {
			let highlightDateCredit = value
				.map((strDate) => new Date(strDate))
				.some(
					(d) =>
						d.getDate() === date.getDate() &&
						d.getMonth() === date.getMonth() &&
						d.getFullYear() === date.getFullYear()
				);

			return highlightDateCredit ? 'lembret-date' : '';
		};
	}

	DebitClass(value: string[]) {
		return (date: Date): MatCalendarCellCssClasses => {
			let highlightDateDebit = value
				.map((strDate) => new Date(strDate))
				.some(
					(d) =>
						d.getDate() === date.getDate() &&
						d.getMonth() === date.getMonth() &&
						d.getFullYear() === date.getFullYear()
				);

			return highlightDateDebit ? 'debit-date' : '';
		};
	}

	updateDateClass() {
		this.applyHighlightClasses();
		this.paginaService.setLoading(false);
	}

	onMonthSelected(date: Date) {
		
		this.updateCurrentMonthYear(date);
	}

	updateCurrentMonthYear(date: Date) {
		const monthNames = [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro',
		];
		this.currentMonthYear = `${
			monthNames[date.getMonth()]
		} ${date.getFullYear()}`;
		this.selectedMonth = monthNames[date.getMonth()];
	}

	convertMonthYear(input: string): string {
		const monthMap: { [key: string]: string } = {
			'JAN.': '01',
			'FEV.': '02',
			'MAR.': '03',
			'ABR.': '04',
			'MAI.': '05',
			'JUN.': '06',
			'JUL.': '07',
			'AGO.': '08',
			'SET.': '09',
			'OUT.': '10',
			'NOV.': '11',
			'DEZ.': '12',
		};

		const [monthAbbr, , year] = input.split(' ');

		const month = monthMap[monthAbbr.toUpperCase()];
		return `${year}-${month}-01`;
	}

	setMonthAndYear(Event: any) {
		const ctrlValue = this.transform(Event);

		this.emitMudarMes(ctrlValue);

		
	}

	transform(value: any, ...args: unknown[]): string {
		if (!value) return value;

		// Define the locale and custom format
		const locale = 'PT-BR';
		const customFormat = "MMM' DE 'yyyy";
		const dateP = formatDate(value, customFormat, locale);

		return dateP;
	}
	getTheme(){
		return this.temaUtil.getColorTheme();
	}
}
