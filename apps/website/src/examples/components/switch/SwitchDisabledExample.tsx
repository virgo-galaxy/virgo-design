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
          <Switch aria-label={`Disabled ${appearance} off`} appearance={appearance} disabled />
          <Switch
            aria-label={`Disabled ${appearance} on`}
            appearance={appearance}
            defaultChecked
            disabled
          />
        </div>
      ))}
    </div>
  );
}
