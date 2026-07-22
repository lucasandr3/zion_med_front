# upx-drawer

Componente Angular reutilizável que encapsula o [Drawer do Flowbite](https://flowbite.com/docs/components/drawer/) para ser utilizado em qualquer lugar da aplicação.

## Inputs

| Propriedade        | Tipo               | Padrão                    | Descrição                                                                                         |
|--------------------|--------------------|---------------------------|---------------------------------------------------------------------------------------------------|
| `id`               | `string`           | `upx-drawer-xxxxxxx`      | Identificador único do drawer.                                                                    |
| `open`             | `boolean`          | `false`                   | Controla a visibilidade (two-way binding com `(openChange)`).                                    |
| `placement`        | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Define o lado de onde o drawer será exibido.                                                     |
| `bodyScrolling`    | `boolean`          | `false`                   | Permite rolagem do body enquanto o drawer está aberto.                                           |
| `backdrop`         | `boolean`          | `true`                    | Habilita/desabilita o backdrop.                                                                  |
| `edge`             | `boolean`          | `false`                   | Ativa o comportamento *edge* do Flowbite (exibe parcialmente o drawer quando fechado).           |
| `edgeOffset`       | `string`           | `'bottom-[60px]'`         | Classe Tailwind aplicada quando `edge` é `true`.                                                  |
| `backdropClasses`  | `string`           | `bg-gray-900/50 ...`      | Classes aplicadas ao backdrop.                                                                   |
| `widthClass`       | `string`           | `'w-80'`                  | Largura do drawer (Tailwind). Use `w-screen` para ocupar toda a largura.                         |
| `heightClass`      | `string`           | `'h-screen'`              | Altura do drawer (para `top`/`bottom` o componente usa `h-auto max-h-full`).                     |
| `paddingClass`     | `string`           | `'p-4'`                   | Padding interno do container.                                                                    |
| `customClasses`    | `string`           | `''`                      | Classes extras aplicadas ao container.                                                            |
| `ariaLabelledBy`   | `string \| undefined` | `undefined`           | Define o atributo `aria-labelledby` para acessibilidade.                                         |

> **Nota:** todo o conteúdo visível do drawer deve ser projetado via `<ng-content>`, permitindo compor qualquer layout internamente.

## Eventos

| Evento           | Payload     | Quando é emitido                                           |
|------------------|-------------|------------------------------------------------------------|
| `openChange`     | `boolean`   | Sempre que o estado de visibilidade muda.                 |
| `drawerShow`     | `void`      | Logo após o drawer ser exibido.                           |
| `drawerHide`     | `void`      | Logo após o drawer ser ocultado.                          |
| `drawerToggle`   | `boolean`   | Em qualquer alteração de estado (`show`/`hide`).          |

## Exemplo de uso

```html
<upx-button (onClick)="drawerAberto = true">Abrir</upx-button>

<upx-drawer
	[open]="drawerAberto"
	(openChange)="drawerAberto = $event"
	placement="right"
	widthClass="w-96"
>
	<!-- Conteúdo interno -->
</upx-drawer>
```

```ts
drawerAberto = false;
```

## Dúvidas comuns

- **É possível ocupar a tela inteira?**  
  Sim. Basta definir `widthClass="w-screen"` (para drawers laterais) ou ajustar `heightClass`/`customClasses` conforme a necessidade. Se desejar cobrir toda a tela, também é possível combinar `placement="top"` com `heightClass="h-screen"` e `widthClass="w-screen"`.

- **Como remover o backdrop?**  
  Ajuste `backdrop="false"` e, se necessário, personalize classes com `backdropClasses`.

- **Efeitos *edge***  
  Ative com `edge="true"` e ajuste `edgeOffset` para controlar a posição inicial quando fechado.


