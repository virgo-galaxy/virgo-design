import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TooltipTonesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['default', 'brand', 'success', 'warning', 'danger', 'info'] as const).map((tone) => (
        <Tooltip key={tone}>
          <Tooltip.Trigger size="small">{tone}</Tooltip.Trigger>
          <Tooltip.Content tone={tone}>
            {tone} {t('examples.tooltip.copy.description')}
          </Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}
