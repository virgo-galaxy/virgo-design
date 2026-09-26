import { Switch } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['toggle', 'fader'] as const).map((appearance) => (
        <div
          key={appearance}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}
        >
          <span>{appearance}</span>
          <Switch aria-label={`${appearance} off`} appearance={appearance} />
          <Switch aria-label={`${appearance} on`} appearance={appearance} defaultChecked />
        </div>
      ))}
    </div>
  );
}
