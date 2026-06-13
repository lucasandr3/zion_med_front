import { cva, type VariantProps } from 'class-variance-authority';

export const tableVariants = cva(
  'w-full caption-bottom text-sm [&_tbody]:border-0 [&_caption]:mt-4 [&_caption]:text-sm [&_caption]:text-muted-foreground',
  {
    variants: {
      zType: {
        default: '',
        striped: '[&_tbody_tr:nth-child(odd)]:bg-muted/30',
        bordered: 'border border-border',
      },
      zSize: {
        default: '',
        compact: '[&_td]:py-2.5 [&_th]:py-2 [&_td]:px-4 [&_th]:px-4',
        comfortable: '[&_td]:py-5 [&_th]:py-4 [&_td]:px-5 [&_th]:px-5',
      },
    },
    defaultVariants: {
      zType: 'default',
      zSize: 'default',
    },
  },
);

export const tableHeaderVariants = cva('border-b border-border bg-muted/45', {
  variants: {},
  defaultVariants: {},
});

export const tableBodyVariants = cva('[&_tr:last-child]:border-0', {
  variants: {},
  defaultVariants: {},
});

export const tableRowVariants = cva(
  'border-b border-border/70 transition-colors duration-150 hover:bg-muted/30 data-[state=selected]:bg-muted',
  {
    variants: {},
    defaultVariants: {},
  },
);

export const tableHeadVariants = cva(
  'py-2.5 px-4 text-left align-middle font-bold text-muted-foreground text-[0.625rem] uppercase tracking-[0.14em] whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
  {
    variants: {},
    defaultVariants: {},
  },
);

export const tableCellVariants = cva(
  'py-3.5 px-4 align-middle text-[0.8125rem] [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
  {
    variants: {},
    defaultVariants: {},
  },
);

export const tableCaptionVariants = cva('mt-4 text-sm text-muted-foreground', {
  variants: {},
  defaultVariants: {},
});

export type ZardTableSizeVariants = NonNullable<VariantProps<typeof tableVariants>['zSize']>;
export type ZardTableTypeVariants = NonNullable<VariantProps<typeof tableVariants>['zType']>;
