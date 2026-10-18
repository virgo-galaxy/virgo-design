import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const bar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  padding: '20px 24px',
  textAlign: 'left',
  boxShadow:
    'var(--vd-panel-shadow, 0 8px 32px color-mix(in srgb, var(--vd-brand-primary) 7%, transparent))',
  '@media': {
    '(max-width: 640px)': {
      gap: '16px',
      padding: '16px 20px',
    },
  },
});

export const status = style({
  flex: '1',
  minWidth: 0,
});

export const statusText = style({
  color: tokens['--vd-text-secondary'],
  fontSize: '13px',
});

export const wave = style({
  display: 'flex',
  alignItems: 'center',
  height: '44px',
  gap: '5px',
  marginTop: '6px',
  color: tokens['--vd-brand-primary'],
  '@media': {
    '(max-width: 640px)': {
      gap: '4px',
    },
  },
});

export const microphone = style({
  selectors: {
    '&[data-variant]': {
      borderRadius: '50%',
    },
  },
});

export const hint = style({
  margin: '16px 0 0',
  color: tokens['--vd-text-tertiary'],
  fontSize: '12px',
});

export const error = style({
  margin: '16px 0 0',
  color: tokens['--vd-status-danger-solid'],
  fontSize: '13px',
});

export const recording = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '20px',
});

globalStyle(`${wave} span`, {
  width: '4px',
  height: 'var(--bar-height)',
  borderRadius: '4px',
  background: 'currentColor',
  transform: 'scaleY(var(--bar-scale))',
  transition: 'transform 100ms linear',
});

globalStyle(`${recording} audio`, {
  maxWidth: 'calc(100% - 36px)',
  height: '36px',
});

globalStyle(`${wave} span`, {
  '@media': {
    '(max-width: 640px)': {
      width: '3px',
    },
  },
});

globalStyle(`${wave} span`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});
