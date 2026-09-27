import { EllipsisIcon, SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './DropdownCustomTriggerExample.module.scss';

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
      <Dropdown>
        <Tooltip>
          <Tooltip.Trigger
            aria-label="More workspace actions"
            render={(props) => (
              <Dropdown.Trigger {...props} indicator={false}>
                <EllipsisIcon size={20} />
              </Dropdown.Trigger>
            )}
          />
          <Tooltip.Content>More workspace actions</Tooltip.Content>
        </Tooltip>
        <Dropdown.Content>
          <Actions onAction={setAction} />
        </Dropdown.Content>
      </Dropdown>
      <span role="status">{action}</span>
    </div>
  );
}
