import { Skeleton } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{ display: 'grid', gap: 20, width: '100%', maxWidth: 320 }}
      aria-label="Loading card"
      aria-busy="true"
    >
      <Skeleton style={{ height: 144 }} />
      <div style={{ display: 'grid', gap: 8 }}>
        <Skeleton variant="text" style={{ width: '72%' }} />
        <Skeleton variant="text" />
        <Skeleton variant="text" style={{ width: '84%' }} />
      </div>
    </div>
  );
}
