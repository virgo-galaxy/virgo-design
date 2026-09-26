import { Spinner } from '@virgo-design/ui';

export default function App() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Spinner size="sm" />
      Syncing changes
    </span>
  );
}
