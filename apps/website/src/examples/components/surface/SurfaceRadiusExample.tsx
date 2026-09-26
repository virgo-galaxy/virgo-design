import { Surface } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {([0, 6, 12, 24, 'full'] as const).map((radius) => (
        <Surface
          key={radius}
          radius={radius}
          border="default"
          tone="secondary"
          style={{ padding: 24, minWidth: 80, textAlign: 'center' }}
        >
          {radius}
        </Surface>
      ))}
    </div>
  );
}
