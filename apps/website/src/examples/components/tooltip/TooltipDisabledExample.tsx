import { Tooltip } from '@virgo-design/ui';

export default function App() {
  return (
    <Tooltip disabled>
      <Tooltip.Trigger>Disabled tooltip</Tooltip.Trigger>
      <Tooltip.Content>Unavailable</Tooltip.Content>
    </Tooltip>
  );
}
