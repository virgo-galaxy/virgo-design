import { Switch, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TooltipPlacementExample.module.scss';

const placements = [
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'left',
  'leftBottom',
  'rightTop',
  'right',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
] as const;

export default function App() {
  const { t } = useTranslation();

  const [arrow, setArrow] = useState(true);
  return (
    <div className={styles.root!}>
      <Switch checked={arrow} onCheckedChange={setArrow}>
        {t('examples.tooltip.copy.showArrow')}
      </Switch>
      <div
        className={styles.stage!}
        role="group"
        aria-label={t('examples.tooltip.copy.twelveTooltipPlacements')}
      >
        {placements.map((placement) => (
          <Tooltip key={placement} className={styles[placement]!}>
            <Tooltip.Trigger size="small">{placement}</Tooltip.Trigger>
            <Tooltip.Content placement={placement} arrow={arrow}>
              {placement} {t('examples.tooltip.copy.tooltip')}
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
