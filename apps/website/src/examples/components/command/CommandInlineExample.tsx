import { DashboardIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { Command } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CommandInlineExample.module.scss';

function CommandItems({ select }: { select: (value: string) => void }) {
  const { t } = useTranslation();

  return (
    <>
      <Command.Empty>{t('examples.command.copy.noMatchingCommands')}</Command.Empty>
      <Command.Group heading={t('examples.command.details.workspace')}>
        <Command.Item
          value="action-a"
          keywords={['home']}
          icon={<DashboardIcon />}
          shortcut="G D"
          onSelect={select}
        >
          {t('examples.command.copy.openDashboard')}
        </Command.Item>
        <Command.Item value="action-b" icon={<LayoutIcon />} shortcut="⌘ W" onSelect={select}>
          {t('examples.command.copy.switchWorkspace')}
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading={t('examples.command.details.settings')}>
        <Command.Item
          value="preferences"
          keywords={['settings']}
          icon={<SettingsIcon />}
          shortcut="⌘ ,"
          onSelect={select}
        >
          {t('examples.command.copy.openPreferences')}
        </Command.Item>
        <Command.Item value="unavailable" disabled>
          {t('examples.command.copy.unavailableCommand')}
        </Command.Item>
      </Command.Group>
    </>
  );
}

export default function App() {
  const { t } = useTranslation();

  const [selection, setSelection] = useState<string | null>(null);

  return (
    <div className={styles.root!}>
      <Command>
        <Command.Input
          aria-label={t('examples.command.copy.searchInlineCommands')}
          placeholder={t('examples.command.copy.searchCommands')}
        />
        <Command.List>
          <CommandItems select={setSelection} />
        </Command.List>
      </Command>
      <p role="status" className={styles.text!}>
        {t('examples.command.copy.selected')} {selection ?? t('examples.command.details.noCommandSelected')}
      </p>
    </div>
  );
}
