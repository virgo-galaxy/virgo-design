import { Tooltip } from '@virgo-design/ui';

import styles from './TooltipSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Tooltip>
        <Tooltip.Trigger>Small tooltip</Tooltip.Trigger>
        <Tooltip.Content size="small">Compact description</Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger>Medium tooltip</Tooltip.Trigger>
        <Tooltip.Content size="medium">Default description</Tooltip.Content>
      </Tooltip>
    </div>
  );
}
