import { Avatar, Card, Tag } from '@virgo-design/ui';

export default function App() {
  return (
    <Card style={{ width: '100%', maxWidth: 360 }}>
      <Avatar fallback="VD" />
      <Card.Title as="h3">Virgo Design Core</Card.Title>
      <Tag intent="brand">Coverage Pass</Tag>
      <p style={{ margin: 0, color: 'var(--vd-text-secondary)' }}>
        Direct children participate in the Card’s structural flow.
      </p>
    </Card>
  );
}
