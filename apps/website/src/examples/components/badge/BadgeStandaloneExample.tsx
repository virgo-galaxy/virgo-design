import { Badge } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
      <span>
        Queued <Badge count={12} />
      </span>
      <span>
        Release <Badge count="New" intent="info" />
      </span>
    </div>
  );
}
