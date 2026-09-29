import { LanguageEnIcon, LanguageZhIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { setAppLocale, useAppLocale } from '@/i18n';

import styles from './global-controls.module.scss';

export function LanguageControl() {
  const { t } = useTranslation();
  const locale = useAppLocale();

  const nextLocale = locale === 'en-US' ? 'zh-CN' : 'en-US';
  const actionLabel = t(
    locale === 'en-US' ? 'app.controls.switchToChinese' : 'app.controls.switchToEnglish',
  );
  const LocaleIcon = locale === 'en-US' ? LanguageZhIcon : LanguageEnIcon;

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
