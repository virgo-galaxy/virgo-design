import { Separator } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 20, width: '100%', maxWidth: 480 }}>
      <span>Account details</span>
      <Separator />
      <span>Notification preferences</span>
      <Separator />
      <span>Security settings</span>
    </div>
  );
}
