import { Switch, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';

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
  const [arrow, setArrow] = useState(true);
  return (
    <div className={styles.root!}>
      <Switch checked={arrow} onCheckedChange={setArrow}>
        Show arrow
      </Switch>
      <div className={styles.stage!} role="group" aria-label="Twelve tooltip placements">
        {placements.map((placement) => (
          <Tooltip key={placement}>
            <Tooltip.Trigger size="small">{placement}</Tooltip.Trigger>
            <Tooltip.Content placement={placement} arrow={arrow}>
              {placement} tooltip
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
