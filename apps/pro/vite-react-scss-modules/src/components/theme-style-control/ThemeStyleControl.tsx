import { ShirtIcon } from '@virgo-design/icons';
import { themePresets } from '@virgo-design/themes';
import { Dropdown, Tooltip } from '@virgo-design/ui';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePreferencesStore } from '@/preferences';

import styles from './ThemeStyleControl.module.scss';

export function ThemeStyleControl() {
  const { t } = useTranslation();
  const id = useId();
  const selected = usePreferencesStore((state) => state.preferences.theme);
  const updatePreferences = usePreferencesStore((state) => state.updatePreferences);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipSuppressed = useRef(false);

  return (
    <Dropdown
      trigger="click"
      open={menuOpen}
      onOpenChange={(open) => {
        tooltipSuppressed.current = true;
        setTooltipOpen(false);
        setMenuOpen(open);
      }}
    >
      <Tooltip
        open={!menuOpen && tooltipOpen}
        onOpenChange={(open) => setTooltipOpen(open && !menuOpen && !tooltipSuppressed.current)}
      >
        <Tooltip.Trigger
          onPointerEnter={() => {
            if (!menuOpen) tooltipSuppressed.current = false;
          }}
          onBlur={() => {
            if (!menuOpen) tooltipSuppressed.current = false;
            setTooltipOpen(false);
          }}
          render={(triggerProps) => (
            <Dropdown.Trigger
              {...triggerProps}
              iconOnly
              variant="text"
              aria-label={t('themeStyleControl.label')}
            >
              <ShirtIcon />
            </Dropdown.Trigger>
          )}
        />
        <Tooltip.Content placement="bottom">{t('themeStyleControl.label')}</Tooltip.Content>
      </Tooltip>
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
    </Dropdown>
  );
}
