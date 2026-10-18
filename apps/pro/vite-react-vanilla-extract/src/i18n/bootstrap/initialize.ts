import { enUS, zhCN } from '../locales/resources';
import { initializeI18n } from '../runtime/locale';

export function initializeAppLocale() {
  return initializeI18n({
    'en-US': { translation: enUS },
    'zh-CN': { translation: zhCN },
  });
}
