import { Cursor, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CursorTooltipExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Cursor.Provider follow={{ tooltip: true }} className={styles.stage}>
      <p className={styles.note}>
        {t('examples.cursor.copy.moveAcrossTheButtonThenTryTabAndEscape')}
      </p>
      <Tooltip openDelay={100}>
        <Tooltip.Trigger>{t('examples.cursor.copy.exploreWithYourPointer')}</Tooltip.Trigger>
        <Tooltip.Content>{t('examples.cursor.copy.contextThatFollowsYourIntent')}</Tooltip.Content>
      </Tooltip>
    </Cursor.Provider>
  );
}
