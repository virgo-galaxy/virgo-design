import { Tag } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
      {(['neutral', 'brand', 'success', 'warning', 'danger', 'info'] as const).map((intent) => (
        <Tag key={intent} intent={intent}>
          {intent}
        </Tag>
      ))}
    </div>
  );
}
