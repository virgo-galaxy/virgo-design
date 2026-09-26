import { Skeleton } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
      <div style={{ display: 'grid', gap: 8 }}>
        <span>Animated</span>
        <Skeleton style={{ width: 160 }} />
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        <span>Static</span>
        <Skeleton animated={false} style={{ width: 160 }} />
      </div>
    </div>
  );
}
