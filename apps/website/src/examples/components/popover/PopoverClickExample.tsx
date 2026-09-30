import { Input, Popover } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './PopoverClickExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Popover trigger="click">
      <Popover.Trigger>{t('examples.popover.copy.clickForDetails')}</Popover.Trigger>
      <Popover.Content arrow>
        <div className={styles.root!}>
          <strong>{t('examples.popover.copy.projectNotes')}</strong>
          <p className={styles.text!}>
            {t('examples.popover.copy.useTabToMoveThroughControlsAndEscapeToReturn')}
          </p>
          <Input
            aria-label={t('examples.popover.copy.previewNote')}
            placeholder={t('examples.popover.copy.addANote')}
          />
          <Popover.Close>{t('examples.popover.copy.done')}</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}
