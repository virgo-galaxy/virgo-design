import { Switch } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
      <Switch aria-label="Power" checkedContent="On" uncheckedContent="Off" defaultChecked />
      <Switch aria-label="Binary" checkedContent="1" uncheckedContent="0" />
    </div>
  );
}
