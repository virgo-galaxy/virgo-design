import { Tag } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {(['soft', 'solid', 'outline'] as const).map((variant) => (
        <Tag key={variant} variant={variant} intent="brand">
          {variant}
        </Tag>
      ))}
    </div>
  );
}
