import { Spinner } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 96,
            height: 80,
            borderRadius: 'var(--vd-radius-8)',
            color: 'var(--vd-text-primary)',
            background: 'var(--vd-surface-default)',
            border: '1px solid var(--vd-border-subtle)',
          }}
        >
          <Spinner intent="neutral" aria-label={`Loading in ${theme} theme`} />
        </div>
      ))}
    </div>
  );
}
