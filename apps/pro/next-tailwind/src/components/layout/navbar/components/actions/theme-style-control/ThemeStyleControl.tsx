import { ShirtIcon } from '@virgo-design/icons';
import { themePresets } from '@virgo-design/themes';
import { Dropdown } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { MenuControl } from '@/components/controls/menu-control';
import { usePreferencesStore } from '@/preferences';

export function ThemeStyleControl() {
  const { t } = useTranslation();
  const id = useId();
  const selected = usePreferencesStore((state) => state.preferences.theme);
  const updatePreferences = usePreferencesStore((state) => state.updatePreferences);

  return (
    <MenuControl label={t('themeStyleControl.label')} icon={<ShirtIcon />}>
      <Dropdown.Content
        placement="bottomRight"
        arrow={false}
        aria-label={t('themeStyleControl.label')}
        className={[
          '[width:min(280px,_100vw_-_var(--vd-spacing-24))]',
          '[&_[data-dropdown-viewport]]:[grid-auto-rows:max-content]',
          '[&_[data-dropdown-viewport]]:[max-height:min(480px,_100dvh_-_var(--vd-sizing-80))]',
        ].join(' ')}
      >
        {themePresets.map(({ id: value }) => (
          <Dropdown.Item
            key={value}
            checked={selected === value}
            aria-label={t(`themeStyleControl.names.${value}`)}
            aria-describedby={`${id}-${value}`}
            onSelect={() => updatePreferences({ theme: value })}
          >
            <span className="grid gap-2 py-2">
              <span className="[font-weight:var(--vd-font-weight-500)]">
                {t(`themeStyleControl.names.${value}`)}
              </span>
              <span
                className="text-text-secondary [font-size:var(--vd-typography-ui-body-small-font-size)] [line-height:var(--vd-typography-ui-body-small-line-height)]"
                id={`${id}-${value}`}
              >
                {t(`themeStyleControl.descriptions.${value}`)}
              </span>
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </MenuControl>
  );
}
