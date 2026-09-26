import { Input } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <Input.Password
        aria-label="Current password"
        autoComplete="current-password"
        defaultValue="virgo-password"
      />
    </div>
  );
}
