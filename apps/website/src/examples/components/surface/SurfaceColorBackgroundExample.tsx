import { Surface } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
        width: '100%',
      }}
    >
      <Surface
        background={{ type: 'color', value: '#243852' }}
        radius={12}
        style={{ padding: 24, color: '#ffffff' }}
      >
        <strong>Custom color</strong>
        <p>A flat decorative background below normal content.</p>
      </Surface>
      <Surface
        background={{
          type: 'gradient',
          value: 'linear-gradient(125deg, #263c60, #5e448e 55%, #8b506d)',
        }}
        radius={12}
        style={{ padding: 24, color: '#ffffff' }}
      >
        <strong>Custom gradient</strong>
        <p>Consumers own the foreground contrast.</p>
      </Surface>
    </div>
  );
}
