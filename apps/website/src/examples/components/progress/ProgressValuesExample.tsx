import { Progress } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24, width: '100%', maxWidth: 480 }}>
      {[0, 25, 80, 100].map((value) => (
        <Progress key={value} value={value} label={`${value} of 100`} showValue />
      ))}
      <Progress value={3} max={4} label="Three of four" showValue />
    </div>
  );
}
