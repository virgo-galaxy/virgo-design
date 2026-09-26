import { Tooltip } from '@virgo-design/ui';

export default function App() {
  return (
    <Tooltip>
      <Tooltip.Trigger variant="text">A little more context</Tooltip.Trigger>
      <Tooltip.Content>Move into this text to keep reading.</Tooltip.Content>
    </Tooltip>
  );
}
