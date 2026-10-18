import { MonitorIcon, MoonFilledIcon, SunFilledIcon } from '@virgo-design/icons';
import { themePresets } from '@virgo-design/themes';
import { SegmentedControl, Select, Separator } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import type { AppPreferences } from '@/preferences';

import { SettingToggle } from './SettingsFields';

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
      <section
        aria-labelledby={`${id}-appearance`}
        className="[&_h2]:m-0 [&_h2]:text-(length:--vd-font-size-14) [&_h2]:[font-weight:var(--vd-font-weight-600)] [&_h2]:text-text-primary flex flex-col gap-16"
      >
        <h2 id={`${id}-appearance`}>{t('settings.appearance')}</h2>
        <SegmentedControl
          aria-label={t('settings.appearance')}
          motion="slide"
          value={settings.appearance}
          onValueChange={(value) => {
            if (value === 'light' || value === 'dark' || value === 'system')
              onChange({ appearance: value });
          }}
          className="flex w-full [&_>_label]:[flex:1] [&_>_label]:justify-center"
          size="medium"
        >
          <SegmentedControl.Item value="light">
            <span className="[&_svg]:[width:var(--vd-sizing-16)] [&_svg]:[height:var(--vd-sizing-16)] inline-flex items-center gap-4 [vertical-align:middle]">
              <SunFilledIcon aria-hidden="true" />
              {t('settings.light')}
            </span>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="dark">
            <span className="[&_svg]:[width:var(--vd-sizing-16)] [&_svg]:[height:var(--vd-sizing-16)] inline-flex items-center gap-4 [vertical-align:middle]">
              <MoonFilledIcon aria-hidden="true" />
              {t('settings.dark')}
            </span>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="system">
            <span className="[&_svg]:[width:var(--vd-sizing-16)] [&_svg]:[height:var(--vd-sizing-16)] inline-flex items-center gap-4 [vertical-align:middle]">
              <MonitorIcon aria-hidden="true" />
              {t('settings.system')}
            </span>
          </SegmentedControl.Item>
        </SegmentedControl>
        <p className="m-0 text-text-tertiary text-(length:--vd-font-size-12) [line-height:var(--vd-line-height-4)]">
          {settings.appearance === 'system'
            ? t('settings.followingSystem', {
                theme: theme === 'dark' ? t('settings.dark') : t('settings.light'),
              })
            : t('settings.alsoAvailableFromTheHeaderAppearanceButton')}
        </p>
      </section>
      <Separator decorative />
      <section
        aria-labelledby={`${id}-theme-style`}
        className="[&_h2]:m-0 [&_h2]:text-(length:--vd-font-size-14) [&_h2]:[font-weight:var(--vd-font-weight-600)] [&_h2]:text-text-primary flex flex-col gap-16"
      >
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
          <p
            id={`${id}-theme-description`}
            className="m-0 text-text-tertiary text-(length:--vd-font-size-12) [line-height:var(--vd-line-height-4)]"
          >
            {t(`themeStyleControl.descriptions.${selectedTheme.id}`)}
          </p>
        ) : null}
      </section>
      <Separator decorative />
      <section
        aria-labelledby={`${id}-display`}
        className="[&_h2]:m-0 [&_h2]:text-(length:--vd-font-size-14) [&_h2]:[font-weight:var(--vd-font-weight-600)] [&_h2]:text-text-primary flex flex-col gap-16"
      >
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
        <div className="pro-settings-drawer-width flex flex-col gap-8">
          <p id={`${id}-notification-indicator`} className="m-0 text-text-primary">
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
            className="flex w-full [&_>_label]:[flex:1] [&_>_label]:justify-center"
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
