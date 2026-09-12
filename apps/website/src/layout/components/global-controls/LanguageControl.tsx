import { useTranslation } from 'react-i18next';

import { type AppLocale, setAppLocale } from '@/i18n';

import styles from './global-controls.module.scss';

export function LanguageControl() {
  const { i18n } = useTranslation();

  const locale: AppLocale = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en';

  function changeLocale(nextLocale: AppLocale) {
    if (nextLocale !== locale) {
      void setAppLocale(nextLocale);
    }
  }

  return (
    <div className={styles.group} aria-label="Language">
      <button
        className={`${styles.button} ${locale === 'en' ? styles.buttonActive : ''}`}
        type="button"
        onClick={() => changeLocale('en')}
      >
        EN
      </button>

      <button
        className={`${styles.button} ${locale === 'zh-CN' ? styles.buttonActive : ''}`}
        type="button"
        onClick={() => changeLocale('zh-CN')}
      >
        中
      </button>
    </div>
  );
}
