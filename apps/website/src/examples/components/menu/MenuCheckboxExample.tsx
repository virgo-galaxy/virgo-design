import { Menu } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [grid, setGrid] = useState(true);
  return (
    <div style={{ display: 'grid', justifyItems: 'start', gap: 16 }}>
      <Menu>
        <Menu.Trigger>View options</Menu.Trigger>
        <Menu.Content>
          <Menu.CheckboxItem checked={grid} onCheckedChange={setGrid}>
            Show grid
          </Menu.CheckboxItem>
          <Menu.CheckboxItem>Show guides</Menu.CheckboxItem>
        </Menu.Content>
      </Menu>
      <span role="status">Grid {grid ? 'on' : 'off'}</span>
    </div>
  );
}
