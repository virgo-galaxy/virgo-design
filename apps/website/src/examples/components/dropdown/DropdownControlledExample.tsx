import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Button, Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './DropdownControlledExample.module.scss';

function Actions({ onAction }: { onAction: (action: string) => void }) {
  const { t } = useTranslation();

  return (
    <>
      <Dropdown.Item
        icon={<UserIcon />}
        onSelect={() => onAction(t('examples.dropdown.details.profileSelected'))}
      >
        {t('examples.dropdown.copy.profile')}
      </Dropdown.Item>
      <Dropdown.Item
        icon={<SettingsIcon />}
        onSelect={() => onAction(t('examples.dropdown.details.settingsSelected'))}
      >
        {t('examples.dropdown.copy.settings')}
      </Dropdown.Item>
      <Dropdown.Item disabled icon={<UserIcon />}>
        {t('examples.dropdown.copy.inviteMember')}
      </Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item
        danger
        icon={<TrashIcon />}
        onSelect={() => onAction(t('examples.dropdown.details.deleteSelected'))}
      >
        {t('examples.dropdown.copy.deleteWorkspace')}
      </Dropdown.Item>
    </>
  );
}

export default function App() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('Choose an action.');
  return (
    <div className={styles.root!}>
      <Dropdown open={open} onOpenChange={setOpen}>
        <Dropdown.Trigger>{t('examples.dropdown.copy.controlledMenu')}</Dropdown.Trigger>
        <Dropdown.Content>
          <Actions onAction={setAction} />
        </Dropdown.Content>
      </Dropdown>
      <span>
        {t('examples.dropdown.copy.menu')}
        {open ? 'open' : 'closed'}
      </span>
      <Button variant="text" onClick={() => setAction('Next control reached')}>
        {t('examples.dropdown.copy.nextControl')}
      </Button>
      <span role="status">{translateExampleText(t, 'dropdown', action)}</span>
    </div>
  );
}
