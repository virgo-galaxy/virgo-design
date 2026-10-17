import { EllipsisIcon, SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DropdownCustomTriggerExample.module.scss';

type DemoAction = 'profileSelected' | 'settingsSelected' | 'deleteSelected';

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
      <Dropdown>
        <Tooltip>
          <Tooltip.Trigger
            aria-label={t('examples.dropdown.copy.moreWorkspaceActions')}
            render={(props) => (
              <Dropdown.Trigger {...props} indicator={false}>
                <EllipsisIcon size={20} />
              </Dropdown.Trigger>
            )}
          />
          <Tooltip.Content>{t('examples.dropdown.copy.moreWorkspaceActions')}</Tooltip.Content>
        </Tooltip>
        <Dropdown.Content>
          <Actions onAction={setAction} />
        </Dropdown.Content>
      </Dropdown>
      <span role="status">{t(`examples.dropdown.details.${action ?? 'chooseAnAction'}`)}</span>
    </div>
  );
}
