import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const container = style({
  minWidth: 0,
  containerType: 'inline-size',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  overflow: 'hidden',
  '@container': {
    '(max-width: 1000px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '(max-width: 480px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const metric = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-24'],
  minWidth: 0,
  minHeight: '148px',
  padding: 'var(--vd-spacing-24) var(--vd-spacing-32)',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      insetInlineEnd: 0,
      top: '50%',
      width: 'var(--vd-stroke-width, var(--vd-border-width-1))',
      height: '64px',
      background: tokens['--vd-border-subtle'],
      transform: 'translateY(-50%)',
      '@container': {
        '(max-width: 480px)': {
          display: 'none',
        },
      },
    },
    '&:last-child::after': {
      display: 'none',
    },
    '&:nth-child(2)::after': {
      '@container': {
        '(max-width: 1000px)': {
          display: 'none',
        },
      },
    },
    '&:nth-child(-n+2)': {
      '@container': {
        '(max-width: 1000px)': {
          borderBottom:
            'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
        },
      },
    },
    '&:not(:last-child)': {
      '@container': {
        '(max-width: 480px)': {
          borderBottom:
            'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
        },
      },
    },
  },
  '@container': {
    '(max-width: 480px)': {
      minHeight: '120px',
      padding: 'var(--vd-spacing-16) var(--vd-spacing-24)',
      gap: tokens['--vd-spacing-20'],
    },
  },
});

export const artwork = style({
  display: 'block',
  width: '56px',
  height: '56px',
  flex: 'none',
  '@container': {
    '(max-width: 480px)': {
      width: '48px',
      height: '48px',
    },
  },
});

export const content = style({
  minWidth: 0,
  overflowWrap: 'anywhere',
});

globalStyle(`${content} [data-slot=description]`, {
  lineHeight: 1.5,
});
