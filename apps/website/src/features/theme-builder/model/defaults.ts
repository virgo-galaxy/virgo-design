import type { ThemeBuilderState } from './types';

export const THEME_BUILDER_DEFAULTS: ThemeBuilderState = {
  themeName: 'Virgo Theme',
  prefix: 'virgo',
  scaleNaming: 'conventional',
  exportFormat: 'css',
  semantics: {
    light: {
      primary: {
        family: 'brand',
        step: 6,
      },
      success: {
        family: 'green',
        step: 6,
      },
      warning: {
        family: 'amber',
        step: 6,
      },
      danger: {
        family: 'red',
        step: 6,
      },
      info: {
        family: 'teal',
        step: 6,
      },
    },
    dark: {
      primary: {
        family: 'brand',
        step: 5,
      },
      success: {
        family: 'green',
        step: 5,
      },
      warning: {
        family: 'amber',
        step: 5,
      },
      danger: {
        family: 'red',
        step: 5,
      },
      info: {
        family: 'teal',
        step: 5,
      },
    },
  },
};
