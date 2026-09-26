import { Input } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <Input aria-label="Project name" placeholder="Untitled project" />
      <Input aria-label="Workspace name" defaultValue="Virgo Design" />
    </div>
  );
}
