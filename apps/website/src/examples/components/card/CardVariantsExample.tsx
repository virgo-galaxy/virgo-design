import { Card } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 24,
        width: '100%',
      }}
    >
      <Card variant="outlined" size="sm" style={{ flex: '1 1 220px' }}>
        <Card.Title as="h3">Outlined</Card.Title>
        <Card.Body>Subtle border and small structural spacing.</Card.Body>
      </Card>
      <Card variant="elevated" size="lg" style={{ flex: '1 1 220px' }}>
        <Card.Title as="h3">Elevated</Card.Title>
        <Card.Body>Elevated surface and large structural spacing.</Card.Body>
      </Card>
    </div>
  );
}
