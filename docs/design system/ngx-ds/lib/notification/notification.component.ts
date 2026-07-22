import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

export type UpxNotificationClienteTag =
	| string
	| Record<string, unknown>
	| { nome?: string; name?: string; desc?: string; tag?: string; cliente?: string };

export interface UpxNotificationItem {
	id: string;
	desc: string;
	status: number;
	path?: string;
	url?: string;
	tags?: UpxNotificationClienteTag | UpxNotificationClienteTag[];
	tags_cliente?: UpxNotificationClienteTag | UpxNotificationClienteTag[];
	nome_cliente?: string;
	cliente?: string | Record<string, unknown>;
	valor_pago?: number | string;
	read: boolean | number | string;
	created_at?: string;
	updated_at?: string;
}

export interface UpxNotificationActionEvent {
	notification: UpxNotificationItem;
	event: Event;
}

@Component({
	selector: 'upx-notification',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatMenuModule,
		MatProgressSpinnerModule,
		ButtonComponent,
		IconComponent,
	],
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
	@Input() notifications: UpxNotificationItem[] = [];
	@Input() total = 0;
	@Input() unreadTotal = 0;
	@Input() loading = false;
	@Input() actionId: string | null = null;

	@Output() openNotifications = new EventEmitter<MouseEvent>();
	@Output() download = new EventEmitter<UpxNotificationActionEvent>();
	@Output() markRead = new EventEmitter<UpxNotificationActionEvent>();
	@Output() removeNotification = new EventEmitter<UpxNotificationActionEvent>();

	@ViewChild('notificationMenuTrigger') private notificationMenuTrigger?: MatMenuTrigger;

	openMenu(): void {
		this.notificationMenuTrigger?.openMenu();
	}

	closeMenu(): void {
		this.notificationMenuTrigger?.closeMenu();
	}

	onOpen(event: MouseEvent): void {
		this.openNotifications.emit(event);
	}

	onDownload(notification: UpxNotificationItem, event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.download.emit({ notification, event });
	}

	onOpenUrl(notification: UpxNotificationItem, event: Event): void {
		event.preventDefault();
		event.stopPropagation();

		const url = notification.url?.trim();
		if (url) {
			window.open(url, '_blank', 'noopener,noreferrer');
		}
	}

	onMarkRead(notification: UpxNotificationItem, event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.markRead.emit({ notification, event });
	}

	onDelete(notification: UpxNotificationItem, event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.removeNotification.emit({ notification, event });
	}

	isRead(notification: UpxNotificationItem): boolean {
		const read = notification.read;
		if (read === true || read === 1) {
			return true;
		}
		if (typeof read === 'string') {
			return read === '1' || read.toLowerCase() === 'true';
		}
		return false;
	}

	canDelete(notification: UpxNotificationItem): boolean {
		const status = Number(notification.status);
		return status !== 0 && status !== 1;
	}

	getStatusLabel(status: number): string {
		switch (Number(status)) {
			case 1:
				return 'Em andamento';
			case 2:
				return 'Finalizado';
			case 3:
				return 'Erro';
			default:
				return 'Pendente';
		}
	}

	getStatusClass(status: number): string {
		switch (Number(status)) {
			case 1:
				return 'upx-notification__status--progress';
			case 2:
				return 'upx-notification__status--done';
			case 3:
				return 'upx-notification__status--error';
			default:
				return 'upx-notification__status--pending';
		}
	}

	hasDetails(notification: UpxNotificationItem): boolean {
		return (
			!!this.getNomeCliente(notification) ||
			this.getClienteTags(notification).length > 0 ||
			this.getValorPago(notification) != null
		);
	}

	getNomeCliente(notification: UpxNotificationItem): string | null {
		const camposDiretos = [
			notification.nome_cliente,
			typeof notification.cliente === 'string' ? notification.cliente : null,
		];

		for (const campo of camposDiretos) {
			const nome = this.normalizarTexto(campo);
			if (nome) {
				return nome;
			}
		}

		if (notification.cliente && typeof notification.cliente === 'object') {
			const cliente = notification.cliente as Record<string, unknown>;
			const nomeObjeto = this.normalizarTexto(
				cliente['cad_nome_razao'] ?? cliente['nome'] ?? cliente['nome_razao'] ?? cliente['razao_social']
			);
			if (nomeObjeto) {
				return nomeObjeto;
			}
		}

		const tags = notification.tags ?? notification.tags_cliente;
		return this.extrairNomeDasTags(tags);
	}

	getClienteTags(notification: UpxNotificationItem): string[] {
		const nomeCliente = this.getNomeCliente(notification);
		const tags = this.coletarTags(notification.tags ?? notification.tags_cliente);
		return tags.filter((tag) => tag !== nomeCliente);
	}

	private coletarTags(tags: UpxNotificationClienteTag | UpxNotificationClienteTag[] | undefined): string[] {
		if (!tags) {
			return [];
		}
		if (typeof tags === 'string') {
			const trimmed = tags.trim();
			return trimmed ? [trimmed] : [];
		}
		if (Array.isArray(tags)) {
			return tags
				.map((tag) => this.extrairTextoTag(tag))
				.filter((tag): tag is string => !!tag);
		}
		if (typeof tags === 'object') {
			const texto = this.extrairTextoTag(tags);
			return texto ? [texto] : [];
		}
		return [];
	}

	private extrairNomeDasTags(tags: UpxNotificationClienteTag | UpxNotificationClienteTag[] | undefined): string | null {
		if (!tags) {
			return null;
		}
		if (typeof tags === 'string') {
			return this.normalizarTexto(tags);
		}
		if (Array.isArray(tags)) {
			for (const tag of tags) {
				const nome = this.extrairNomeDeTagItem(tag);
				if (nome) {
					return nome;
				}
			}
			const primeira = this.extrairTextoTag(tags[0]);
			return primeira ?? null;
		}
		if (typeof tags === 'object') {
			return this.extrairNomeDeTagItem(tags);
		}
		return null;
	}

	private extrairNomeDeTagItem(tag: UpxNotificationClienteTag): string | null {
		if (typeof tag === 'string') {
			return this.normalizarTexto(tag);
		}
		if (!tag || typeof tag !== 'object') {
			return null;
		}
		const objeto = tag as Record<string, unknown>;
		const nomeCliente = this.normalizarTexto(
			objeto['cliente'] ?? objeto['nome_cliente'] ?? objeto['nomeCliente'] ?? objeto['cad_nome_razao']
		);
		if (nomeCliente) {
			return nomeCliente;
		}
		return this.extrairTextoTag(tag);
	}

	private extrairTextoTag(tag: UpxNotificationClienteTag): string | null {
		if (typeof tag === 'string') {
			return this.normalizarTexto(tag);
		}
		if (!tag || typeof tag !== 'object') {
			return null;
		}
		const objeto = tag as Record<string, unknown>;
		const texto = this.normalizarTexto(
			objeto['nome'] ?? objeto['name'] ?? objeto['desc'] ?? objeto['tag'] ?? objeto['label'] ?? objeto['value']
		);
		if (texto) {
			return texto;
		}
		const valores = Object.values(objeto)
			.map((valor) => this.normalizarTexto(valor))
			.filter((valor): valor is string => !!valor);
		return valores.length === 1 ? valores[0] : null;
	}

	private normalizarTexto(valor: unknown): string | null {
		if (valor === null || valor === undefined) {
			return null;
		}
		const texto = String(valor).trim();
		return texto || null;
	}

	getValorPago(notification: UpxNotificationItem): number | null {
		const valor = notification.valor_pago;
		if (valor === null || valor === undefined || valor === '') {
			return null;
		}
		const parsed = Number(valor);
		return Number.isFinite(parsed) ? parsed : null;
	}
}
