import { ShirtIcon } from '@virgo-design/icons';
import { themePresets } from '@virgo-design/themes';
import { Dropdown } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { MenuControl } from '@/components/controls/menu-control';
import { usePreferencesStore } from '@/preferences';

import styles from './ThemeStyleControl.module.scss';

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
        className={styles.menu}
      >
        {themePresets.map(({ id: value }) => (
          <Dropdown.Item
            key={value}
            checked={selected === value}
            aria-label={t(`themeStyleControl.names.${value}`)}
            aria-describedby={`${id}-${value}`}
            onSelect={() => updatePreferences({ theme: value })}
          >
            <span className={styles.copy}>
              <span className={styles.name}>{t(`themeStyleControl.names.${value}`)}</span>
              <span className={styles.description} id={`${id}-${value}`}>
                {t(`themeStyleControl.descriptions.${value}`)}
              </span>
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </MenuControl>
  );
}
