export interface upxDataListColumnsInterface {
    name: string,
    type: string,
    width: string,
    title?: string,
    align?: string,
    order?: string,
	tooltip?: string | ((value: any, row: any) => any),
	tooltipPosition?: string,
	styleIcon?: string | ((value: any, row: any) => any),
	iconSize?: string,
	icon?: string | ((value: any, row: any) => any),
	iconColor?: string | ((value: any, row: any) => any),
	iconSize2?: string,
	icon2?: string | ((value: any, row: any) => any),
	iconFontAwesome?: string | ((value: any, row: any) => any),
	iconFontAwSize?: string | ((value: any, row: any) => any),
	iconFontAwesome2?: string | ((value: any, row: any) => any),
	iconFontAwSize2?: string | ((value: any, row: any) => any),
	faIcon?: boolean | false,
	faIcon2?: string | ((value: any, row: any) => any),
	ngClassFa?: string | ((value: any, row: any) => any),
	ngClassFa2?: string | ((value: any, row: any) => any),
	sourceType?: string,
	ngClass?: string | ((value: any, row: any) => any),
	ngClassFontAw?: string | ((value: any, row: any) => any),
    mobile?: {
        position: number
    },
    formatter?: (value: any, row: any) => any,
    disabled?: (value: any, row: any) => any,
    canceled?: (value: any, row: any) => any,
    /** Quando `false`, clique na célula não dispara `openRegister` (ex.: coluna só exibição). */
    openOnClick?: boolean,
    options?: {
        maxLines?: number,
        /** Permite quebra de linha na célula e aumenta a altura da linha da tabela. */
        multiline?: boolean,
        /** Exibe `column.icon` na mesma linha do texto formatado (ex.: descrição truncada + olho). */
        iconInline?: boolean,
        upxAvatar?: {
            columnText?: string,
            columnEmail?: string,
            variant?: string,
            icon?: string | ((value: any, row: any) => any)
            color?: string,
			matTooltip?: string | ((value: any, row: any) => any),
			ngClass?: string | ((value: any, row: any) => any)
        },
        upxBadge?: {
            variant?: string,
			columnText?: string,
			columnColor?: string,
			columnColorHexadecimal?: string,
			columnColorTextHexadecimal?: string,
			/** Exibe reticências e tooltip com o texto completo quando ultrapassar esse tamanho */
			maxTextLength?: number,
            binds?: {
                [key: number]: {
                    text?: string,
                    color?: string,
					colorHexadecimal?: string,
					colorTextHexadecimal?: string,
					size?: string,
					icon?: string,
                };
              },
        },
    },
}

export function isDataListColumns(
    dataListColumns: upxDataListColumnsInterface | undefined
): dataListColumns is upxDataListColumnsInterface {
    return (dataListColumns as upxDataListColumnsInterface).name !== undefined;
}
