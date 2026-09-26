import { CheckIcon } from '@virgo-design/icons';
import { Menu } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [action, setAction] = useState('Choose a menu.');
  return (
    <div style={{ display: 'grid', justifyItems: 'start', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {(['small', 'medium', 'large'] as const).map((size) => (
          <Menu key={size} size={size}>
            <Menu.Trigger>{size}</Menu.Trigger>
            <Menu.Content>
              <Menu.Item icon={<CheckIcon />} onSelect={() => setAction(`${size} selected`)}>
                Select
              </Menu.Item>
              <Menu.Item disabled>Unavailable</Menu.Item>
            </Menu.Content>
          </Menu>
        ))}
      </div>
      <span role="status">{action}</span>
    </div>
  );
}
