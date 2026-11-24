import '@virgo-nsh/highlighter/theme.css';

import { createHighlighter } from '@virgo-nsh/highlighter';

const languages = ['typescript', 'tsx', 'css', 'scss', 'svg', 'bash'] as const;
export type SourceLanguage = (typeof languages)[number];

export const sourceHighlighter = createHighlighter({
  modelBaseUrl: `${import.meta.env.BASE_URL}models/`,
  languages,
});
