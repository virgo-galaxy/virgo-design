import { Command } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [selection, setSelection] = useState('None');
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 400 }}>
      <Command filter={(value, search) => value.startsWith(search.toLowerCase())}>
        <Command.Input aria-label="Prefix filter" placeholder="Try pref…" />
        <Command.List>
          <Command.Empty>No prefix match.</Command.Empty>
          {['preferences', 'projects', 'profile'].map((value) => (
            <Command.Item key={value} value={value} onSelect={setSelection}>
              {value}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
      <span role="status">Selected: {selection}</span>
    </div>
  );
}
