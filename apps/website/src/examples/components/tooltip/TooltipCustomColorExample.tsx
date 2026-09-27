import { Tooltip } from '@virgo-design/ui';

import styles from './TooltipCustomColorExample.module.scss';

export default function App() {
  return (
    <Tooltip>
      <Tooltip.Trigger size="small">Custom violet</Tooltip.Trigger>
      <Tooltip.Content className={styles.root!}>Custom background and foreground.</Tooltip.Content>
    </Tooltip>
  );
}
