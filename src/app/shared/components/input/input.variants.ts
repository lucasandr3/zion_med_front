import { cva, type VariantProps } from 'class-variance-authority';

export type zInputIcon = 'email' | 'password' | 'text';

const selectChevron =
  "appearance-none cursor-pointer bg-[length:1.4em_1.4em] bg-[position:right_0.5rem_center] bg-no-repeat pr-9 bg-[image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")] dark:bg-[image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%237c7c96' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")]";

export const inputVariants = cva('w-full min-w-0', {
  variants: {
    zType: {
      default:
        'flex rounded-lg border border-input bg-transparent px-2.5 font-normal transition-colors file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:bg-input/30 dark:disabled:bg-input/80',
      textarea:
        'flex pb-2 min-h-20 h-auto rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors placeholder:text-muted-foreground outline-none focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:bg-input/30 dark:disabled:bg-input/80',
      select:
        `flex rounded-lg border border-input bg-transparent px-2.5 font-normal transition-colors outline-none focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:bg-input/30 dark:disabled:bg-input/80 ${selectChevron}`,
    },
    zSize: {
      default: 'text-base md:text-sm',
      sm: 'text-base md:text-sm',
      lg: 'text-base',
    },
    zStatus: {
      error: 'border-destructive',
      warning: 'border-yellow-500',
      success: 'border-green-500',
    },
    zBorderless: {
      true: 'flex-1 bg-transparent border-0 outline-none p-0',
    },
  },
  defaultVariants: {
    zType: 'default',
    zSize: 'default',
  },
  compoundVariants: [
    {
      zType: 'default',
      zSize: 'default',
      class:
        'h-[length:var(--control-height)] min-h-[length:var(--control-height)] py-1 file:h-8 file:text-sm file:max-md:py-0',
    },
    {
      zType: 'default',
      zSize: 'sm',
      class:
        'h-[length:var(--control-height)] min-h-[length:var(--control-height)] py-1 file:h-8 file:text-sm file:max-md:py-1.5',
    },
    {
      zType: 'default',
      zSize: 'lg',
      class:
        'h-[length:var(--control-height)] min-h-[length:var(--control-height)] py-1 file:h-8 file:text-sm file:max-md:py-2.5',
    },
    {
      zType: 'select',
      zSize: 'default',
      class: 'h-[length:var(--control-height)] min-h-[length:var(--control-height)] py-0',
    },
    {
      zType: 'select',
      zSize: 'sm',
      class: 'h-[length:var(--control-height)] min-h-[length:var(--control-height)] py-0',
    },
    {
      zType: 'select',
      zSize: 'lg',
      class: 'h-[length:var(--control-height)] min-h-[length:var(--control-height)] py-0',
    },
  ],
});

export type ZardInputTypeVariants = NonNullable<VariantProps<typeof inputVariants>['zType']>;
export type ZardInputSizeVariants = NonNullable<VariantProps<typeof inputVariants>['zSize']>;
export type ZardInputStatusVariants = NonNullable<VariantProps<typeof inputVariants>['zStatus']>;
