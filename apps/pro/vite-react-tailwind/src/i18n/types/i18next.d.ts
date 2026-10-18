import 'i18next';

import type { enUS } from '../locales/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enUS;
    };
    returnNull: false;
  }
}
