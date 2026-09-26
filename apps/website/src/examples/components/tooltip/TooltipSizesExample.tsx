import { Tooltip } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
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
