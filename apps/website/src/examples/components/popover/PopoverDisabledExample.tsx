import './PopoverDisabledExample.module.scss';

import { Popover } from '@virgo-design/ui';

export default function App() {
  return (
    <Popover disabled>
      <Popover.Trigger>Disabled popover</Popover.Trigger>
      <Popover.Content>Unavailable</Popover.Content>
    </Popover>
  );
}
