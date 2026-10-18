import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const page = style({
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  background: tokens['--vd-surface-background'],
  color: tokens['--vd-text-primary'],
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      width: '800px',
      height: '800px',
      borderRadius: '50%',
      background:
        'radial-gradient(circle, color-mix(in srgb, var(--vd-brand-primary) 7%, transparent), transparent 68%)',
      left: '-260px',
      top: '120px',
      pointerEvents: 'none',
    },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '28px clamp(24px, 6vw, 104px)',
  '@media': {
    '(max-width: 720px)': {
      padding: '20px',
    },
  },
});

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: 'inherit',
  fontSize: '18px',
});

export const layout = style({
  flex: '1',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 440px)',
  alignItems: 'center',
  gap: 'clamp(48px, 7vw, 120px)',
  width: 'min(1180px, 100% - 80px)',
  margin: '36px auto 52px',
  '@media': {
    '(max-width: 1000px)': {
      gridTemplateColumns: 'minmax(0, 1fr) minmax(340px, 410px)',
      gap: '32px',
      width: 'calc(100% - 48px)',
    },
    '(max-width: 720px)': {
      display: 'block',
      width: 'min(440px, 100% - 32px)',
      margin: '20px auto 40px',
    },
  },
});

export const story = style({
  '@media': {
    '(max-width: 720px)': {
      display: 'none',
    },
  },
});

export const intro = style({
  color: tokens['--vd-text-secondary'],
  fontSize: '16px',
  lineHeight: 1.8,
  maxWidth: '530px',
});

export const features = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  margin: '32px 0',
  '@media': {
    '(max-width: 1000px)': {
      gridTemplateColumns: '1fr',
      gap: '6px',
    },
  },
});

export const preview = style({
  padding: '24px',
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-12, var(--vd-radius-12))',
  background: tokens['--vd-surface-default'],
  boxShadow: tokens['--vd-elevation-1'],
  maxWidth: '570px',
  '@media': {
    '(max-width: 1000px)': {
      display: 'none',
    },
  },
});

export const previewHeading = style({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  fontSize: '13px',
});

export const liveDot = style({
  width: '7px',
  height: '7px',
  background: tokens['--vd-status-success-accent'],
  borderRadius: '50%',
});

export const metrics = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  margin: '24px 0',
});

export const previewRow = style({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  fontSize: '13px',
});

export const projectIcon = style({
  display: 'grid',
  placeItems: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '9px',
  background: 'color-mix(in srgb, var(--vd-brand-primary) 9%, transparent)',
  color: tokens['--vd-brand-primary'],
  fontSize: '12px',
});

export const progress = style({
  marginTop: tokens['--vd-spacing-20'],
});

export const previewNote = style({
  color: tokens['--vd-text-secondary'],
  fontSize: '12px',
  margin: '12px 0 0',
});

export const card = style({
  background: tokens['--vd-surface-default'],
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-12, var(--vd-radius-12))',
  padding: '36px',
  boxShadow: tokens['--vd-elevation-2'],
  '@media': {
    '(max-width: 1000px)': {
      padding: '28px',
    },
    '(max-width: 720px)': {
      padding: '28px 24px',
    },
  },
});

export const cardHeading = style({});

export const submit = style({
  width: '100%',
  marginTop: '4px',
});

export const error = style({
  color: tokens['--vd-status-danger-text'],
  fontSize: '13px',
  margin: 0,
});

export const notice = style({
  fontSize: '13px',
  color: tokens['--vd-text-secondary'],
  padding: '12px',
  background: tokens['--vd-surface-background'],
  borderRadius: '8px',
  marginBottom: '20px',
});

export const footer = style({
  userSelect: 'none',
  WebkitUserSelect: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  padding: '20px clamp(24px, 6vw, 104px)',
  color: tokens['--vd-text-secondary'],
  fontSize: '12px',
  '@media': {
    '(max-width: 720px)': {
      justifyContent: 'center',
      padding: '20px',
    },
  },
});

export const footerBrand = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
});

globalStyle(`${brand} img`, {
  width: '36px',
  height: '32px',
  objectFit: 'contain',
});

globalStyle(`${story} h2`, {
  fontSize: 'clamp(38px, 3.5vw, 52px)',
  lineHeight: 1.22,
  letterSpacing: '-1.5px',
  margin: '24px 0 20px',
  fontWeight: tokens['--vd-font-weight-600'],
});

globalStyle(`${story} h2 span`, {
  display: 'block',
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${features} svg`, {
  display: 'block',
  color: tokens['--vd-brand-primary'],
  width: '22px',
  height: '22px',
  marginBottom: '12px',
});

globalStyle(`${features} strong`, {
  fontSize: '14px',
});

globalStyle(`${features} p`, {
  color: tokens['--vd-text-secondary'],
  fontSize: '13px',
  lineHeight: 1.7,
  marginTop: '8px',
});

globalStyle(`${previewHeading} > span:last-child`, {
  marginLeft: 'auto',
  color: tokens['--vd-text-secondary'],
  fontSize: '12px',
});

globalStyle(`${metrics} > div`, {
  display: 'grid',
  gap: '5px',
  paddingLeft: '20px',
  borderLeft: '1px solid var(--vd-border-subtle)',
});

globalStyle(`${metrics} > div:first-child`, {
  paddingLeft: 0,
  borderLeft: 0,
});

globalStyle(`${metrics} strong`, {
  fontSize: '26px',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 600,
});

globalStyle(`${metrics} span`, {
  color: tokens['--vd-text-secondary'],
  fontSize: '12px',
});

globalStyle(`${previewRow} > div`, {
  flex: '1',
  display: 'grid',
  gap: '6px',
});

globalStyle(`${previewRow} > div > span`, {
  fontSize: '12px',
  color: tokens['--vd-text-secondary'],
});

globalStyle(`${cardHeading} h1`, {
  fontSize: '28px',
  fontWeight: 600,
  margin: '0 0 10px',
  letterSpacing: '-0.6px',
});

globalStyle(`${cardHeading} p`, {
  color: tokens['--vd-text-secondary'],
  fontSize: '14px',
  lineHeight: 1.6,
  margin: '0 0 28px',
});

globalStyle(`${card} form`, {
  display: 'grid',
  gap: '20px',
});

globalStyle(`${features} > div`, {
  '@media': {
    '(max-width: 1000px)': {
      display: 'grid',
      gridTemplateColumns: '24px 1fr',
      gap: '0 10px',
    },
  },
});

globalStyle(`${features} p`, {
  '@media': {
    '(max-width: 1000px)': {
      gridColumn: '2',
      margin: 0,
    },
  },
});

globalStyle(`${footer} > span:first-child`, {
  '@media': {
    '(max-width: 720px)': {
      display: 'none',
    },
  },
});
