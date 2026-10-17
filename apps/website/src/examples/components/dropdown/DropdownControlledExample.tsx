import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Button, Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DropdownControlledExample.module.scss';

type DemoAction = 'profileSelected' | 'settingsSelected' | 'deleteSelected' | 'nextControlReached';

function Actions({ onAction }: { onAction: (action: DemoAction) => void }) {
  const { t } = useTranslation();

  return (
    <>
      <Dropdown.Item icon={<UserIcon />} onSelect={() => onAction('profileSelected')}>
        {t('examples.dropdown.copy.profile')}
      </Dropdown.Item>
      <Dropdown.Item icon={<SettingsIcon />} onSelect={() => onAction('settingsSelected')}>
        {t('examples.dropdown.copy.settings')}
      </Dropdown.Item>
      <Dropdown.Item disabled icon={<UserIcon />}>
        {t('examples.dropdown.copy.inviteMember')}
      </Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item
        danger
        icon={<TrashIcon />}
        onSelect={() => onAction('deleteSelected')}
      >
        {t('examples.dropdown.copy.deleteWorkspace')}
      </Dropdown.Item>
    </>
  );
}

export default function App() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<DemoAction | null>(null);

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
      <Button variant="text" onClick={() => setAction('nextControlReached')}>
        {t('examples.dropdown.copy.nextControl')}
      </Button>
      <span role="status">{t(`examples.dropdown.details.${action ?? 'chooseAnAction'}`)}</span>
    </div>
  );
}
