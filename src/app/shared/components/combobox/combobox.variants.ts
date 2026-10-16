import { cva, type VariantProps } from 'class-variance-authority';

export const comboboxVariants = cva('block w-full min-w-0 max-w-full', {
  variants: {
    zWidth: {
      default: 'w-full',
      sm: 'w-full max-w-37.5',
      md: 'w-full max-w-62.5',
      lg: 'w-full max-w-87.5',
      full: 'w-full',
    },
  },
  defaultVariants: {
    zWidth: 'full',
  },
});

export type GestgoComboboxWidthVariants = NonNullable<VariantProps<typeof comboboxVariants>['zWidth']>;
