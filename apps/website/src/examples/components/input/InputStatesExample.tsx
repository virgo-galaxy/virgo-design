import { Input } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <Input aria-label="Default input" placeholder="Type something" />
      <Input disabled aria-label="Disabled input" defaultValue="Unavailable" />
      <Input readOnly aria-label="Read-only input" defaultValue="virgo-galaxy" />
      <Input invalid aria-label="Invalid input" defaultValue="virgo design" />
    </div>
  );
}
