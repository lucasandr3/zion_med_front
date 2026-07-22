# Shell — `up-app-shell` (canônico Gestgo)

Sincronizado de `src/app/layout/shell/` (**20/jul/2026**).

## Arquivos

| Arquivo | Função |
|---------|--------|
| `app-shell.component.ts` | Standalone, signals, TemaUtil, ScreenService, menus |
| `app-shell.component.html` | Sidenav + header + slots de notificação/conta |
| `app-shell.component.scss` | Layout visual (copiar 1:1) |

## Anatomia

```
mat-sidenav-container.sidenav-container-main
├── mat-sidenav.sidenav-main (15rem)
│   ├── .sidenav-main__toolbar-header   (#0d2833 + logo)
│   ├── .sidenav-main__body             (seções + .upx-navigation)
│   └── .sidenav-main__footer           (Sair)
└── mat-sidenav-content.sidenav-content-main
    ├── header.sidenav-content-main__header  (#0d2833)
    │   ├── menu + .header-title
    │   └── ajuda | notificações (.notif) | conta (.uam)
    └── .sidenav-content-main__body     (ng-content, floor-2)
```

## Inputs / outputs

- `pageTitle` — título no header
- `empresaNome` — nome do produto (default)
- `logout` — output ao sair

## Layout flex (importante)

Filhos de `.sidenav-content-main__body` usam:

- `flex: 1 1 auto`
- `min-height: 0` (não `100%`)
- `width: 100%` / sem max-width
- fundo `floor-2`

Isso permite páginas full-height (wizard designer) sem estourar o scroll do shell.

## Responsivo

- `< 960px`: sidenav overlay, fecha ao navegar
- Avatar: meta nome/email só `≥ 900px`

## Ao portar

1. Ajustar `navSections` / rotas do menu
2. Trocar logo em `assets/logo/up/`
3. Remover Help/Notifications se o projeto não tiver — manter estrutura do header
4. Desacoplar `HelpAssistantService` / `NotificationService` se não existirem no destino
5. Manter classes BEM (`sidenav-main__*`, `header-*`, `uam`, `notif`)
