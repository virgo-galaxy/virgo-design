import { Tooltip } from '@virgo-design/ui';

import styles from './TooltipTonesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['default', 'brand', 'success', 'warning', 'danger', 'info'] as const).map((tone) => (
        <Tooltip key={tone}>
          <Tooltip.Trigger size="small">{tone}</Tooltip.Trigger>
          <Tooltip.Content tone={tone}>{tone} description</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}
