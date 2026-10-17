import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DropdownSplitStatesExample.module.scss';

type DemoAction =
  'profileSelected' | 'settingsSelected' | 'deleteSelected' | 'dangerActionSelected';

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
      <Dropdown.Item danger icon={<TrashIcon />} onSelect={() => onAction('deleteSelected')}>
        {t('examples.dropdown.copy.deleteWorkspace')}
      </Dropdown.Item>
    </>
  );
}

export default function App() {
  const { t } = useTranslation();

  const [action, setAction] = useState<DemoAction | null>(null);

  return (
    <div className={styles.root!}>
      <div className={styles.stage!}>
        <Dropdown disabled>
          <Dropdown.Button menuLabel="Disabled actions">
            {t('examples.dropdown.copy.disabled')}
          </Dropdown.Button>
          <Dropdown.Content>
            <Dropdown.Item>{t('examples.dropdown.copy.unavailable')}</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button
            danger
            menuLabel="More danger actions"
            onClick={() => setAction('dangerActionSelected')}
          >
            {t('examples.dropdown.copy.danger')}
          </Dropdown.Button>
          <Dropdown.Content>
            <Actions onAction={setAction} />
          </Dropdown.Content>
        </Dropdown>
      </div>
      <span role="status">{t(`examples.dropdown.details.${action ?? 'chooseAnAction'}`)}</span>
    </div>
  );
}
