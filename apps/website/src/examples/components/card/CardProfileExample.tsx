import { Avatar, Badge, Card } from '@virgo-design/ui';

export default function App() {
  return (
    <Card variant="outlined" style={{ width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
        <Avatar fallback="PK" size="lg" />
        <div style={{ flex: '1 1 120px' }}>
          <Card.Title as="h3">Pokeya</Card.Title>
          <Card.Description>Design system maintainer</Card.Description>
        </div>
        <Badge count="Online" intent="success" />
      </div>
    </Card>
  );
}
