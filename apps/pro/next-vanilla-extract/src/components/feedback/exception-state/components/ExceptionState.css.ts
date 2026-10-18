import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const canvas = style({
  display: 'grid',
  minWidth: 0,
  minHeight: 'min-content',
  placeItems: 'center',
});

export const state = style({
  selectors: {
    '&[data-size=md]': {
      vars: {
        '--result-gap': tokens['--vd-spacing-20'],
        '--result-padding': tokens['--vd-spacing-32'],
      },
      '@media': {
        '(max-width: 640px)': {
          vars: {
            '--result-padding': 'var(--vd-spacing-24) var(--vd-spacing-16)',
          },
        },
      },
    },
  },
});

export const illustration = style({
  vars: {
    '--art-halo': tokens['--vd-brand-subtle'],
    '--art-line': tokens['--vd-brand-subtle-hover'],
    '--art-ink': tokens['--vd-text-secondary'],
    '--art-paper': tokens['--vd-surface-default'],
    '--art-brand': tokens['--vd-brand-primary'],
    '--art-on-brand': tokens['--vd-brand-foreground'],
    '--art-warning': tokens['--vd-status-warning-solid'],
  },
  width: '160px',
  height: '134px',
});

globalStyle(`${illustration} > span`, {
  display: 'block',
  width: '100%',
  height: '100%',
});

globalStyle(`${illustration} svg`, {
  display: 'block',
  width: '100%',
  height: '100%',
});
