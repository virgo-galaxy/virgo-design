import { ArrowRightIcon, CircleCheckIcon, GaugeIcon, LayersIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { shortcuts } from '../config/shortcuts';

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
      className={[
        'data-[variant=text]:w-full data-[variant=text]:justify-start data-[variant=text]:[height:auto] data-[variant=text]:p-8',
        'data-[variant=text]:whitespace-normal data-[variant=text]:text-start data-[variant=text]:gap-12',
        'data-[variant=text]:[--button-foreground:var(--vd-text-primary)]',
        'data-[variant=text]:[--button-background-hover:var(--vd-brand-subtle-hover)]',
        'data-[variant=text]:[--button-background-active:color-mix(_in_srgb,_var(--vd-brand-primary)_24%,_var(--vd-surface-default)_)]',
        "[&[data-variant='text']:hover_[data-slot='leading-icon']]:text-brand-link",
        "[&[data-variant='text']:hover_[data-slot='trailing-icon']]:text-brand-link",
        "[&[data-variant='text']:focus-visible_[data-slot='leading-icon']]:text-brand-link",
        "[&[data-variant='text']:focus-visible_[data-slot='trailing-icon']]:text-brand-link",
        "[&[data-variant='text']:hover_[data-slot='leading-icon']]:[background:color-mix(in_srgb,_var(--vd-brand-primary)_14%,_transparent)]",
        "[&[data-variant='text']:focus-visible_[data-slot='leading-icon']]:[background:color-mix(in_srgb,_var(--vd-brand-primary)_14%,_transparent)]",
        "[&[data-variant='text']:focus-visible]:[outline-offset:calc(-1_*_var(--vd-border-width-2))]",
        "[&[data-variant='text']_[data-slot='label']]:[flex:1] [&[data-variant='text']_[data-slot='label']]:min-w-0",
        "[&[data-variant='text']_[data-slot='trailing-icon']]:ms-auto [&[data-variant='text']_[data-slot='trailing-icon']]:text-icon-tertiary",
        "[&[data-variant='text']_[data-slot='leading-icon']]:me-0 [&[data-variant='text']_[data-slot='leading-icon']]:[width:var(--vd-sizing-32)]",
        "[&[data-variant='text']_[data-slot='leading-icon']]:[height:var(--vd-sizing-32)]",
        "[&[data-variant='text']_[data-slot='leading-icon']]:bg-surface-secondary",
        "[&[data-variant='text']_[data-slot='leading-icon']]:[border-radius:var(--vd-shape-radius-6,_var(--vd-radius-6))]",
        "[&[data-variant='text']_[data-slot='leading-icon']_svg]:[width:var(--vd-sizing-16)]",
        "[&[data-variant='text']_[data-slot='leading-icon']_svg]:[height:var(--vd-sizing-16)]",
      ].join(' ')}
      leadingIcon={<Icon />}
      trailingIcon={<ArrowRightIcon animated={hovered || focused ? 'always' : false} />}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => navigate(shortcut.path)}
    >
      <span
        className={[
          '[&_strong]:text-(length:--vd-font-size-12) [&_strong]:[font-weight:var(--vd-font-weight-500)] [&_>_span]:text-(length:--vd-font-size-10)',
          '[&_>_span]:text-text-tertiary [&_>_span]:[font-weight:var(--vd-font-weight-400)]',
          'grid gap-4',
        ].join(' ')}
      >
        <strong>{t(`workplace.shortcuts.${shortcut.icon}.label`)}</strong>
        <span>{t(`workplace.shortcuts.${shortcut.icon}.detail`)}</span>
      </span>
    </Button>
  );
}
