import { PaletteIcon } from '@virgo-design/icons';
import { Dropdown, Tooltip } from '@virgo-design/ui';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ThemeStyleControl.module.scss';

const themeStyles = [
  { value: 'virgo', name: 'Virgo' },
  { value: 'minimal', name: 'Minimal' },
  { value: 'soft', name: 'Soft' },
  { value: 'glass', name: 'Glass' },
  { value: 'utility', name: 'Utility' },
  { value: 'highContrast', name: 'High Contrast' },
] as const;

type ThemeStyle = (typeof themeStyles)[number]['value'];

export function ThemeStyleControl() {
  const { t } = useTranslation();
  const id = useId();
  // Selection is UI-only until the theme styles are implemented.
  const [selected, setSelected] = useState<ThemeStyle>('virgo');
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
              <PaletteIcon />
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
        {themeStyles.map(({ value, name }) => (
          <Dropdown.Item
            key={value}
            checked={selected === value}
            aria-label={name}
            aria-describedby={`${id}-${value}`}
            onSelect={() => setSelected(value)}
          >
            <span className={styles.copy}>
              <span className={styles.name}>{name}</span>
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
