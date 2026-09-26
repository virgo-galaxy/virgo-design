import { Badge, Button } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
      <Badge count={0}>
        <Button variant="outline">Zero hidden</Button>
      </Badge>
      <Badge count={0} showZero>
        <Button variant="outline">Zero shown</Button>
      </Badge>
    </div>
  );
}
