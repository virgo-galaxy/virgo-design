import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './DropdownSplitExample.module.scss';

function Actions({ onAction }: { onAction: (action: string) => void }) {
  return (
    <>
      <Dropdown.Item icon={<UserIcon />} onSelect={() => onAction('Profile selected')}>
        Profile
      </Dropdown.Item>
      <Dropdown.Item icon={<SettingsIcon />} onSelect={() => onAction('Settings selected')}>
        Settings
      </Dropdown.Item>
      <Dropdown.Item disabled icon={<UserIcon />}>
        Invite member
      </Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item danger icon={<TrashIcon />} onSelect={() => onAction('Delete selected')}>
        Delete workspace
      </Dropdown.Item>
    </>
  );
}

export default function App() {
  const [action, setAction] = useState('Choose an action.');
  return (
    <div className={styles.root!}>
      <div className={styles.stage!}>
        <Dropdown>
          <Dropdown.Button menuLabel="More save actions" onClick={() => setAction('Saved')}>
            Save
          </Dropdown.Button>
          <Dropdown.Content>
            <Actions onAction={setAction} />
          </Dropdown.Content>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button
            menuLabel="Account actions"
            menuIcon={<UserIcon />}
            onClick={() => setAction('Account opened')}
          >
            Account
          </Dropdown.Button>
          <Dropdown.Content>
            <Actions onAction={setAction} />
          </Dropdown.Content>
        </Dropdown>
      </div>
      <span role="status">{action}</span>
    </div>
  );
}
