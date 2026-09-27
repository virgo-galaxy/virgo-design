import { Command } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './CommandFilterExample.module.scss';

export default function App() {
  const [selection, setSelection] = useState('None');
  return (
    <div className={styles.root!}>
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
