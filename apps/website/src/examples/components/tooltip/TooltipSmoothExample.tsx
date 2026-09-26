import { Tooltip } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}
      role="group"
      aria-label="Smooth transition"
    >
      {['Overview', 'Members', 'Activity', 'Settings'].map((label) => (
        <Tooltip key={label} smoothTransition>
          <Tooltip.Trigger variant="primary" style={{ width: '100%' }}>
            {label}
          </Tooltip.Trigger>
          <Tooltip.Content>Explore your workspace.</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}
