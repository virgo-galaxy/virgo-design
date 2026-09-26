import { Input } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <Input clearable aria-label="Clearable project name" defaultValue="Virgo Design" />
    </div>
  );
}
