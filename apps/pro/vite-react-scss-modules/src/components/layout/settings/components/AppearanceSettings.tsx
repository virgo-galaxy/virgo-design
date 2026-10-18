import { MonitorIcon, MoonFilledIcon, SunFilledIcon } from '@virgo-design/icons';
import { themePresets } from '@virgo-design/themes';
import { SegmentedControl, Select, Separator } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import type { AppPreferences } from '@/preferences';

import { SettingToggle } from './SettingsFields';

import styles from './SettingsDrawer.module.scss';

export function AppearanceSettings({
  settings,
  theme,
  onChange,
}: {
  settings: AppPreferences;
  theme: 'light' | 'dark';
  onChange: (patch: Partial<AppPreferences>) => void;
}) {
  const { t } = useTranslation();
  const id = useId();
  const themeStyle = settings.theme;
  const selectedTheme = themePresets.find((preset) => preset.id === themeStyle);

  return (
    <>
      <section aria-labelledby={`${id}-appearance`} className={styles.section}>
        <h2 id={`${id}-appearance`}>{t('settings.appearance')}</h2>
        <SegmentedControl
          aria-label={t('settings.appearance')}
          motion="slide"
          value={settings.appearance}
          onValueChange={(value) => {
            if (value === 'light' || value === 'dark' || value === 'system')
              onChange({ appearance: value });
          }}
          className={styles.segments!}
          size="medium"
        >
          <SegmentedControl.Item value="light">
            <span className={styles.appearanceLabel}>
              <SunFilledIcon aria-hidden="true" />
              {t('settings.light')}
            </span>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="dark">
            <span className={styles.appearanceLabel}>
              <MoonFilledIcon aria-hidden="true" />
              {t('settings.dark')}
            </span>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="system">
            <span className={styles.appearanceLabel}>
              <MonitorIcon aria-hidden="true" />
              {t('settings.system')}
            </span>
          </SegmentedControl.Item>
        </SegmentedControl>
        <p className={styles.hint}>
          {settings.appearance === 'system'
            ? t('settings.followingSystem', {
                theme: theme === 'dark' ? t('settings.dark') : t('settings.light'),
              })
            : t('settings.alsoAvailableFromTheHeaderAppearanceButton')}
        </p>
      </section>
      <Separator decorative />
      <section aria-labelledby={`${id}-theme-style`} className={styles.section}>
        <h2 id={`${id}-theme-style`}>{t('themeStyleControl.label')}</h2>
        <Select value={themeStyle} onValueChange={(theme) => onChange({ theme })}>
          <Select.Trigger
            aria-labelledby={`${id}-theme-style`}
            aria-describedby={selectedTheme ? `${id}-theme-description` : undefined}
          />
          <Select.Content>
            {themePresets.map((preset) => (
              <Select.Option key={preset.id} value={preset.id}>
                {t(`themeStyleControl.names.${preset.id}`)}
              </Select.Option>
            ))}
          </Select.Content>
        </Select>
        {selectedTheme ? (
          <p id={`${id}-theme-description`} className={styles.hint}>
            {t(`themeStyleControl.descriptions.${selectedTheme.id}`)}
          </p>
        ) : null}
      </section>
      <Separator decorative />
      <section aria-labelledby={`${id}-display`} className={styles.section}>
        <h2 id={`${id}-display`}>{t('settings.display')}</h2>
        <SettingToggle
          label={t('settings.overlayArrows')}
          description={t('settings.showArrowsOnTooltipsAndPopupMenus')}
          checked={settings.showOverlayArrows}
          onChange={(showOverlayArrows) => onChange({ showOverlayArrows })}
        />
        <SettingToggle
          label={t('settings.breathingIndicator')}
          description={t('settings.animateTheWorkspaceStatusDot')}
          checked={settings.breathe}
          onChange={(breathe) => onChange({ breathe })}
        />
        <div className={styles.width}>
          <p id={`${id}-notification-indicator`} className={styles.controlLabel}>
            {t('settings.notificationIndicator')}
          </p>
          <SegmentedControl
            aria-labelledby={`${id}-notification-indicator`}
            motion="slide"
            value={settings.notificationIndicator}
            onValueChange={(value) => {
              if (value === 'dot' || value === 'count' || value === 'none')
                onChange({ notificationIndicator: value });
            }}
            className={styles.segments!}
            size="medium"
          >
            <SegmentedControl.Item value="dot">{t('settings.dot')}</SegmentedControl.Item>
            <SegmentedControl.Item value="count">{t('settings.number')}</SegmentedControl.Item>
            <SegmentedControl.Item value="none">{t('settings.none')}</SegmentedControl.Item>
          </SegmentedControl>
        </div>
      </section>
    </>
  );
}
