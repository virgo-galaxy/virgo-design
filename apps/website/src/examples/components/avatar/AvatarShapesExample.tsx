import { Avatar } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Avatar shape="circle" fallback="PK" aria-label="Person" />
      <Avatar shape="square" fallback="VD" aria-label="Workspace" />
    </div>
  );
}
