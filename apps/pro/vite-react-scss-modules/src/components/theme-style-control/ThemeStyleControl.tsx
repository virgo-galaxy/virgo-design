import { ShirtIcon } from '@virgo-design/icons';
import { themePresets } from '@virgo-design/themes';
import { Dropdown, Tooltip } from '@virgo-design/ui';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useThemeStyle } from '@/lib/use-theme-style';

import styles from './ThemeStyleControl.module.scss';

export function ThemeStyleControl() {
  const { t } = useTranslation();
  const id = useId();
  const { theme: selected, setTheme } = useThemeStyle();
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
        {themePresets.map(({ id: value, name, descriptionKey }) => (
          <Dropdown.Item
            key={value}
            checked={selected === value}
            aria-label={name}
            aria-describedby={`${id}-${value}`}
            onSelect={() => setTheme(value)}
          >
            <span className={styles.copy}>
              <span className={styles.name}>{name}</span>
              <span className={styles.description} id={`${id}-${value}`}>
                {t(`themeStyleControl.descriptions.${descriptionKey}`)}
              </span>
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
