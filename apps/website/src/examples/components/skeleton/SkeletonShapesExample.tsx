import { Skeleton } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}
      aria-busy="true"
      aria-label="Loading content"
    >
      <Skeleton variant="text" style={{ width: '80%' }} />
      <Skeleton variant="text" style={{ width: '56%' }} />
      <Skeleton style={{ width: '100%', maxWidth: 240, height: 96 }} />
      <Skeleton variant="circle" />
    </div>
  );
}
