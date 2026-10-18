import { SettingsIcon } from '@virgo-design/icons';
import { Button, Drawer, Separator, Tooltip } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import type { AppPreferences } from '@/preferences';

import { AppearanceSettings } from './AppearanceSettings';
import { LayoutSettings } from './LayoutSettings';

import * as styles from './SettingsDrawer.css';

export function SettingsDrawer({
  settings,
  theme,
  storageAvailable,
  onChange,
  onReset,
  extraActions,
  onHeaderChange,
  onCloseAutoFocus,
}: {
  settings: AppPreferences;
  theme: 'light' | 'dark';
  storageAvailable: boolean;
  onChange: (patch: Partial<AppPreferences>) => void;
  onReset: () => void;
  extraActions?: ReactNode;
  onHeaderChange: (showHeader: boolean, anchorY: number) => void;
  onCloseAutoFocus: (event: Event) => void;
}) {
  const { t } = useTranslation();

  return (
    <Drawer.Portal>
      <Drawer.Overlay />
      <Drawer.Content
        placement="right"
        className={styles.panel}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <Drawer.Header>
          <Drawer.Title className={styles.title}>
            <SettingsIcon aria-hidden="true" />
            {t('settings.settings')}
          </Drawer.Title>
          <Drawer.Description>{t('settings.makeThisWorkspaceFeelRight')}</Drawer.Description>
        </Drawer.Header>
        <Drawer.Body className={styles.body}>
          <AppearanceSettings settings={settings} theme={theme} onChange={onChange} />
          <Separator decorative />
          <LayoutSettings settings={settings} onChange={onChange} onHeaderChange={onHeaderChange} />
        </Drawer.Body>
        <Drawer.Footer className={styles.footer}>
          <p role="status">
            {storageAvailable
              ? t('settings.changesApplyImmediatelyAndSaveInThisBrowser')
              : t('settings.changesApplyForThisSessionBrowserStorageIsUnavailable')}
          </p>
          <div className={styles.footerActions}>
            <Button.Group layout="custom" className={styles.resetActions}>
              <Button variant="outline" onClick={onReset}>
                {t('settings.restoreDefaults')}
              </Button>
              {extraActions}
            </Button.Group>
            <Drawer.Close variant="primary">{t('settings.done')}</Drawer.Close>
          </div>
        </Drawer.Footer>
        <Tooltip>
          <Tooltip.Trigger
            render={(props) => (
              <Drawer.Close {...props} size="medium" aria-label={t('settings.closeSettings')} />
            )}
          />
          <Tooltip.Content placement="left">{t('settings.closeSettings')}</Tooltip.Content>
        </Tooltip>
      </Drawer.Content>
    </Drawer.Portal>
  );
}
