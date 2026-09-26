import { Progress } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24, width: '100%', maxWidth: 480 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Progress key={size} value={60} size={size} label={size.toUpperCase()} />
      ))}
    </div>
  );
}
