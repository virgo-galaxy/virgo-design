import { Tooltip } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {(['default', 'brand', 'success', 'warning', 'danger', 'info'] as const).map((tone) => (
        <Tooltip key={tone}>
          <Tooltip.Trigger size="small">{tone}</Tooltip.Trigger>
          <Tooltip.Content tone={tone}>{tone} description</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}
