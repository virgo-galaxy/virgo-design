import { LanguageEnIcon, LanguageZhIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { type AppLocale, setAppLocale } from '@/i18n';

import styles from './global-controls.module.scss';

export function LanguageControl() {
  const { i18n, t } = useTranslation();

  const locale: AppLocale = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en';
  const nextLocale: AppLocale = locale === 'en' ? 'zh-CN' : 'en';
  const actionLabel = t(locale === 'en' ? 'common.switchToChinese' : 'common.switchToEnglish');
  const LocaleIcon = locale === 'en' ? LanguageZhIcon : LanguageEnIcon;

  function toggleLocale() {
    void setAppLocale(nextLocale);
  }

  return (
    <Tooltip className={styles.control} closeOnClick={false} smoothTransition>
      <Tooltip.Trigger
        aria-label={actionLabel}
        onClick={toggleLocale}
        render={(triggerProps) => (
          <Button
            {...triggerProps}
            iconOnly
            aria-label={actionLabel}
            className={styles.button}
            size="medium"
            variant="text"
          >
            <LocaleIcon aria-hidden="true" />
          </Button>
        )}
      />
      <Tooltip.Content arrow={false} placement="bottom" size="small">
        {actionLabel}
      </Tooltip.Content>
    </Tooltip>
  );
}
