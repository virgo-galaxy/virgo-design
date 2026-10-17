import { DashboardIcon, LayoutIcon, SearchIcon, SettingsIcon } from '@virgo-design/icons';
import { Button, Command } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CommandDialogExample.module.scss';

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

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<string | null>(null);

  return (
    <div
      className={styles.root!}
      onKeyDown={(event) => {
        if (
          !event.defaultPrevented &&
          (event.metaKey || event.ctrlKey) &&
          event.key.toLowerCase() === 'k'
        ) {
          event.preventDefault();
          setOpen((current) => !current);
        }
      }}
    >
      <Button
        onClick={() => setOpen(true)}
        leadingIcon={<SearchIcon />}
        aria-keyshortcuts="Meta+K Control+K"
      >
        {t('examples.command.copy.openCommandPalette')}
      </Button>
      <p className={styles.text!}>{t('examples.command.copy.focusTheButtonThenPressCtrlK')}</p>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input
          autoFocus
          aria-label={t('examples.command.copy.searchCommandPalette')}
          placeholder={t('examples.command.copy.typeACommand')}
        />
        <Command.List>
          <CommandItems
            select={(value) => {
              setSelection(value);
              setOpen(false);
            }}
          />
        </Command.List>
      </Command.Dialog>
      <span role="status">
        {t('examples.command.copy.selected')}{' '}
        {selection ?? t('examples.command.details.noCommandSelected')}
      </span>
    </div>
  );
}
