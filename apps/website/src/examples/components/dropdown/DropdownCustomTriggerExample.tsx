import { EllipsisIcon, SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './DropdownCustomTriggerExample.module.scss';

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

  const [action, setAction] = useState('Choose an action.');
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
      <span role="status">{translateExampleText(t, 'dropdown', action)}</span>
    </div>
  );
}
