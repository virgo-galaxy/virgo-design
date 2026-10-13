import { initializeI18n } from '@/i18n';

import { enUS, zhCN } from './registry';

// Product composition supplies feature-local copy before the first render.
void initializeI18n({
  'en-US': { translation: enUS },
  'zh-CN': { translation: zhCN },
});
