import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TooltipSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Tooltip>
        <Tooltip.Trigger>{t('examples.tooltip.copy.smallTooltip')}</Tooltip.Trigger>
        <Tooltip.Content size="small">
          {t('examples.tooltip.copy.compactDescription')}
        </Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger>{t('examples.tooltip.copy.mediumTooltip')}</Tooltip.Trigger>
        <Tooltip.Content size="medium">
          {t('examples.tooltip.copy.defaultDescription')}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
