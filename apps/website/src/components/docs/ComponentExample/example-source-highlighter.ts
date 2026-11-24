import '@virgo-nsh/highlighter/theme.css';

import { createHighlighter } from '@virgo-nsh/highlighter';

export const sourceHighlighter = createHighlighter({
  modelBaseUrl: `${import.meta.env.BASE_URL}models/`,
  languages: ['tsx', 'scss'],
});
