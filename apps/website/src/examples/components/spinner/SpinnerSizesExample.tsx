import { Spinner } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Spinner size="sm" intent="neutral" aria-label="Small loading indicator" />
      <Spinner size="md" intent="brand" aria-label="Medium loading indicator" />
      <Spinner size="lg" aria-label="Large loading indicator" />
    </div>
  );
}
