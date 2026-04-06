# Gestgo — front-end (Angular)

SPA do produto **Gestgo**, gerado com [Angular CLI](https://github.com/angular/angular-cli). Nome do projeto Angular: **`gestgo_front`** (artefatos em `dist/gestgo_front`).

## Requisitos

- Node.js LTS (compatível com o `package.json`)
- npm

## Setup

```bash
npm install
```

## Variáveis de ambiente

Edite `src/environments/environment.ts` (dev) e `environment.prod.ts` (produção):

| Campo   | Exemplo dev              | Observação        |
|---------|--------------------------|-------------------|
| `apiUrl` | `http://zion_med.test` ou `http://localhost:8000` | URL base da API Laravel, **sem** `/api/v1` no final |

O proxy de desenvolvimento está em `proxy.conf.json` (recomendado alinhar com o host da API).

## Desenvolvimento

```bash
npm start
# ou: ng serve --host 0.0.0.0
```

Abra `http://localhost:4200/`.

## Build

```bash
npm run build        # development
npm run build:prod   # produção → dist/gestgo_front/browser
```

## Docker

O `Dockerfile` copia `dist/gestgo_front/browser` para Nginx. O build da imagem deve rodar `npm run build:prod` antes (já incluído no estágio `build`).

## Tema

O tema corporativo padrão é **`gestgo-blue`** (classe `theme-gestgo-blue`). Valores antigos `zion-blue` no `localStorage` são normalizados para `gestgo-blue` (ver `user-appearance.sync.ts`).

## Testes

- Unitários: `npm test`
- E2E (Playwright): `npx playwright test` (com app em `localhost:4200`)
