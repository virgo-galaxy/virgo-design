import { ArrowRightIcon, CircleCheckIcon, GaugeIcon, LayersIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { shortcuts } from '../config/shortcuts';

import styles from '../styles/workplace.module.scss';

const shortcutIcons = { tasks: CircleCheckIcon, projects: LayersIcon, analytics: GaugeIcon };

export function WorkplaceShortcut({ shortcut }: { shortcut: (typeof shortcuts)[number] }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const Icon = shortcutIcons[shortcut.icon];

  return (
    <Button
      variant="text"
      className={styles.shortcut}
      leadingIcon={<Icon />}
      trailingIcon={<ArrowRightIcon animated={hovered || focused ? 'always' : false} />}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => navigate(shortcut.path)}
    >
      <span className={styles.shortcutCopy}>
        <strong>{t(`workplace.shortcuts.${shortcut.icon}.label`)}</strong>
        <span>{t(`workplace.shortcuts.${shortcut.icon}.detail`)}</span>
      </span>
    </Button>
  );
}
