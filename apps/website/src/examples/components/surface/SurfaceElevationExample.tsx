import { Surface } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
        gap: 24,
        width: '100%',
        padding: 12,
      }}
    >
      {([0, 1, 2, 3, 4, 5] as const).map((elevation) => (
        <Surface
          key={elevation}
          tone="elevated"
          elevation={elevation}
          radius={12}
          style={{ padding: 24, textAlign: 'center' }}
        >
          Level {elevation}
        </Surface>
      ))}
    </div>
  );
}
