import { Switch } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
      <Switch aria-label="Notifications off" />
      <Switch aria-label="Notifications on" defaultChecked />
    </div>
  );
}
