import { Dropdown, Popover } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './PopoverNestedMenuExample.module.scss';

export default function App() {
  const [visibility, setVisibility] = useState('Private');
  return (
    <Popover>
      <Popover.Trigger>Sharing settings</Popover.Trigger>
      <Popover.Content aria-label="Sharing settings panel" arrow>
        <div className={styles.root!}>
          <strong>Sharing</strong>
          <p className={styles.text!}>Visibility: {visibility}</p>
          <Dropdown>
            <Dropdown.Trigger>Change visibility</Dropdown.Trigger>
            <Dropdown.Content>
              {['Private', 'Team', 'Public'].map((value) => (
                <Dropdown.Item
                  key={value}
                  checked={visibility === value}
                  onSelect={() => setVisibility(value)}
                >
                  {value}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
          <Popover.Close>Done</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}
