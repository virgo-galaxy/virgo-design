import { Cursor, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CursorComparisonExample.module.scss';

function Description() {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <Tooltip.Trigger>{t('examples.cursor.copy.hoverOrFocus')}</Tooltip.Trigger>
      <Tooltip.Content>{t('examples.cursor.copy.oneTooltipTwoAnchorModes')}</Tooltip.Content>
    </Tooltip>
  );
}

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.comparison}>
      <div className={styles.stage}>
        <p className={styles.note}>{t('examples.cursor.copy.elementAnchor')}</p>
        <Description />
      </div>
      <Cursor.Provider follow={{ tooltip: true }} className={styles.stage}>
        <p className={styles.note}>{t('examples.cursor.copy.pointerFollow')}</p>
        <Description />
      </Cursor.Provider>
    </div>
  );
}
