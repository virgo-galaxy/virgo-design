import { Surface } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
        gap: 16,
        width: '100%',
      }}
    >
      {(['none', 'subtle', 'default', 'strong'] as const).map((border) => (
        <Surface
          key={border}
          border={border}
          tone="secondary"
          radius={8}
          style={{ padding: 24, textAlign: 'center' }}
        >
          {border}
        </Surface>
      ))}
    </div>
  );
}
