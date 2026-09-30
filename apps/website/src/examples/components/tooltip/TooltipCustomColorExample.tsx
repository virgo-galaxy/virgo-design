import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TooltipCustomColorExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <Tooltip.Trigger size="small">{t('examples.tooltip.copy.customViolet')}</Tooltip.Trigger>
      <Tooltip.Content className={styles.root!}>
        {t('examples.tooltip.copy.customBackgroundAndForeground')}
      </Tooltip.Content>
    </Tooltip>
  );
}
