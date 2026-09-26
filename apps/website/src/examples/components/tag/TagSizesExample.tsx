import { Tag } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Tag key={size} size={size}>
          {size.toUpperCase()}
        </Tag>
      ))}
    </div>
  );
}
