import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DropdownSplitExample.module.scss';

type DemoAction =
  'profileSelected' | 'settingsSelected' | 'deleteSelected' | 'saved' | 'accountOpened';

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
        <Dropdown>
          <Dropdown.Button menuLabel="More save actions" onClick={() => setAction('saved')}>
            {t('examples.dropdown.copy.save')}
          </Dropdown.Button>
          <Dropdown.Content>
            <Actions onAction={setAction} />
          </Dropdown.Content>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button
            menuLabel="Section actions"
            menuIcon={<UserIcon />}
            onClick={() => setAction('accountOpened')}
          >
            {t('examples.dropdown.copy.account')}
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
