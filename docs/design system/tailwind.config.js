/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        theme: 'rgb(var(--theme) / <alpha-value>)',
        'theme-contrast': 'rgb(var(--theme-contrast) / <alpha-value>)',
        'theme-info': 'rgb(var(--theme-info) / <alpha-value>)',
        'theme-success': 'rgb(var(--theme-success) / <alpha-value>)',
        'theme-danger': 'rgb(var(--theme-danger) / <alpha-value>)',
        'theme-warning': 'rgb(var(--theme-warning) / <alpha-value>)',
        'theme-default': 'rgb(var(--theme-default) / <alpha-value>)',
        'theme-focus': 'rgb(var(--theme-focus) / <alpha-value>)',
        'theme-floor-1': 'rgb(var(--theme-floor-1) / <alpha-value>)',
        'theme-floor-2': 'rgb(var(--theme-floor-2) / <alpha-value>)',
        'theme-sidebar': 'rgb(var(--theme-sidebar) / <alpha-value>)',
        'theme-padrao': 'rgb(var(--theme-padrao) / <alpha-value>)',
        'theme-padrao-2': 'rgb(var(--theme-padrao-2) / <alpha-value>)',
        'theme-fg': 'rgb(var(--theme-fg) / <alpha-value>)',
        'theme-border': 'rgb(var(--theme-border) / <alpha-value>)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
