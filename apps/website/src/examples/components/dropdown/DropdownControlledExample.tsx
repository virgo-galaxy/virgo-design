import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Button, Dropdown } from '@virgo-design/ui';
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
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('Choose an action.');
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
      <Dropdown open={open} onOpenChange={setOpen}>
        <Dropdown.Trigger>Controlled menu</Dropdown.Trigger>
        <Dropdown.Content>
          <Actions onAction={setAction} />
        </Dropdown.Content>
      </Dropdown>
      <span>Menu {open ? 'open' : 'closed'}</span>
      <Button variant="text" onClick={() => setAction('Next control reached')}>
        Next control
      </Button>
      <span role="status">{action}</span>
    </div>
  );
}
