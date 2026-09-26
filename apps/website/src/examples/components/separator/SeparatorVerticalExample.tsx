import { Separator } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, minHeight: 40 }}>
      <span>Overview</span>
      <Separator orientation="vertical" />
      <span>Activity</span>
      <Separator orientation="vertical" />
      <span>Settings</span>
    </div>
  );
}
