import './TooltipInstantExample.module.scss';

import { Tooltip } from '@virgo-design/ui';

export default function App() {
  return (
    <Tooltip openDelay={0}>
      <Tooltip.Trigger>Instant preview</Tooltip.Trigger>
      <Tooltip.Content>No hover delay for this example.</Tooltip.Content>
    </Tooltip>
  );
}
