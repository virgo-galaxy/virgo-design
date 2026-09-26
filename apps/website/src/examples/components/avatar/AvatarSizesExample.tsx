import { Avatar } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Avatar size="sm" fallback="S" aria-label="Small avatar" />
      <Avatar size="md" fallback="M" aria-label="Medium avatar" />
      <Avatar size="lg" fallback="L" aria-label="Large avatar" />
    </div>
  );
}
