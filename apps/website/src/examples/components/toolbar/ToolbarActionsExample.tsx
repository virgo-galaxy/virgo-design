import { DownloadIcon, MoonIcon, SettingsIcon, SunIcon } from '@virgo-design/icons';
import { Button, Dropdown, Toolbar } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ToolbarActionsExample.module.scss';

export default function ToolbarActionsExample() {
  const { t } = useTranslation();
  const [dark, setDark] = useState(false);
  return (
    <Toolbar className={styles.root} aria-label={t('components.toolbar.actions')} size="small">
      <Button variant="outline" leadingIcon={<DownloadIcon />}>
        {t('components.toolbar.export')}
      </Button>
      <Button
        variant="text"
        iconOnly
        aria-label={t('components.toolbar.theme')}
        aria-pressed={dark}
        onClick={() => setDark((value) => !value)}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </Button>
      <Dropdown>
        <Dropdown.Trigger
          render={(props) => (
            <Button {...props} iconOnly variant="text" aria-label={t('components.toolbar.more')}>
              <SettingsIcon />
            </Button>
          )}
        />
        <Dropdown.Content arrow={false}>
          <Dropdown.Item>{t('components.toolbar.profile')}</Dropdown.Item>
          <Dropdown.Item>{t('components.toolbar.settings')}</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </Toolbar>
  );
}
