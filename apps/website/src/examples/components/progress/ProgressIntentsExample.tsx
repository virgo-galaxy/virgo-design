import { Progress } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24, width: '100%', maxWidth: 480 }}>
      {(['default', 'success', 'warning', 'error'] as const).map((intent) => (
        <Progress key={intent} value={70} intent={intent} label={intent} showValue />
      ))}
    </div>
  );
}
