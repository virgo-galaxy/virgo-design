import { Button } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" disabled>
        Secondary disabled
      </Button>
    </div>
  );
}
