import { Badge, Button } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
      <Badge count={8}>
        <Button variant="outline">Inbox</Button>
      </Badge>
      <Badge count={120} max={99}>
        <Button variant="outline">Updates</Button>
      </Badge>
      <Badge count="New" intent="info">
        <Button variant="outline">Release</Button>
      </Badge>
    </div>
  );
}
