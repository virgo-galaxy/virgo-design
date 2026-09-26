import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown } from '@virgo-design/ui';
import { useState } from 'react';

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
    <div style={{ display: 'grid', justifyItems: 'start', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <Dropdown disabled>
          <Dropdown.Button menuLabel="Disabled actions">Disabled</Dropdown.Button>
          <Dropdown.Content>
            <Dropdown.Item>Unavailable</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button
            danger
            menuLabel="More danger actions"
            onClick={() => setAction('Danger action selected')}
          >
            Danger
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
