import { Switch, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';

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
    <div style={{ display: 'grid', justifyItems: 'center', gap: 24, width: '100%' }}>
      <Switch checked={arrow} onCheckedChange={setArrow}>
        Show arrow
      </Switch>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}
        role="group"
        aria-label="Twelve tooltip placements"
      >
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
