import { Input } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Input key={size} aria-label={`${size} input`} placeholder={`${size} input`} size={size} />
      ))}
    </div>
  );
}
