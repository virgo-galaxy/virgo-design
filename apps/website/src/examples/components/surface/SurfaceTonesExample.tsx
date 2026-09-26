import { Surface } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
        gap: 16,
        width: '100%',
      }}
    >
      {(['default', 'secondary', 'strong', 'elevated'] as const).map((tone) => (
        <Surface key={tone} tone={tone} border="subtle" radius={12} style={{ padding: 24 }}>
          <strong>{tone}</strong>
          <p style={{ marginBottom: 0, color: 'var(--vd-text-secondary)' }}>
            Theme-aware content and container color.
          </p>
        </Surface>
      ))}
    </div>
  );
}
