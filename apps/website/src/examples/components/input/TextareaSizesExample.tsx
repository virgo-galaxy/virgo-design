import { Textarea } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 480 }}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Textarea
          key={size}
          aria-label={`${size} textarea`}
          placeholder={`${size} multiline input`}
          rows={3}
          size={size}
        />
      ))}
    </div>
  );
}
