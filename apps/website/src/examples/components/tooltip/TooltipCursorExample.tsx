import { CursorArrowIcon } from '@virgo-design/icons';
import { Cursor, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TooltipCursorExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Cursor.Provider
      cursor={<CursorArrowIcon className={styles.custom} />}
      hotspot={{ x: 5, y: 3 }}
      follow={{ tooltip: true }}
      className={styles.stage}
    >
      <p className={styles.note}>{t('examples.tooltip.copy.aCustomCursorAnOrdinaryTooltip')}</p>
      <Tooltip>
        <Tooltip.Trigger>{t('examples.tooltip.copy.copyLink')}</Tooltip.Trigger>
        <Tooltip.Content>{t('examples.tooltip.copy.copyAShareableLink')}</Tooltip.Content>
      </Tooltip>
    </Cursor.Provider>
  );
}
