import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  minWidth: 0,
});

export const result = style({
  vars: {
    '--result-accent': tokens['--vd-status-success-accent'],
  },
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  minWidth: 0,
  width: '100%',
  boxShadow:
    'var(--vd-panel-shadow, 0 4px 18px color-mix(in srgb, var(--vd-text-primary) 4%, transparent))',
  selectors: {
    '&[data-outcome=error]': {
      vars: {
        '--result-accent': tokens['--vd-status-danger-accent'],
      },
    },
  },
});

export const resultHero = style({
  display: 'grid',
  gridTemplateColumns: '72px minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: '24px',
  padding: '36px 32px',
  textAlign: 'start',
  borderBottom: '1px solid var(--vd-border-subtle)',
  background:
    'linear-gradient(110deg, color-mix(in srgb, var(--result-accent) 5%, transparent), transparent 65%)',
  borderRadius: '12px 12px 0 0',
  '@media': {
    '(max-width: 1200px)': {
      gridTemplateColumns: '72px minmax(0, 1fr)',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
      padding: '24px 20px',
      gap: '20px',
    },
  },
});

export const heroCopy = style({
  display: 'grid',
  gap: '12px',
  justifyItems: 'start',
  minWidth: 0,
});

export const primaryActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start',
  gap: '12px',
  margin: 0,
  '@media': {
    '(max-width: 1200px)': {
      gridColumn: '2',
    },
    '(max-width: 640px)': {
      gridColumn: '1',
    },
  },
});

export const receiptBody = style({
  display: 'grid',
  flex: '1',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  gap: '24px',
  padding: '32px',
  '@media': {
    '(max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
    '(max-width: 640px)': {
      padding: '20px',
      gap: '20px',
    },
  },
});

export const metadataPanel = style({
  minWidth: 0,
  padding: '24px',
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: '12px',
  background: 'color-mix(in srgb, var(--vd-surface-secondary) 30%, var(--vd-surface-default))',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '@media': {
    '(max-width: 640px)': {
      padding: '20px',
    },
  },
});

export const nextSteps = style({
  minWidth: 0,
  padding: '24px',
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: '12px',
  background: 'color-mix(in srgb, var(--vd-surface-secondary) 30%, var(--vd-surface-default))',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gap: '24px',
  '@media': {
    '(max-width: 640px)': {
      padding: '20px',
    },
  },
});

export const recovery = style({
  minWidth: 0,
  padding: '24px',
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: '12px',
  background: 'color-mix(in srgb, var(--vd-surface-secondary) 30%, var(--vd-surface-default))',
  display: 'grid',
  alignContent: 'start',
  gap: '20px',
  '@media': {
    '(max-width: 640px)': {
      padding: '20px',
    },
  },
});

export const receiptMetadata = style({
  margin: 0,
  display: 'grid',
  flex: '1',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '24px',
  alignContent: 'space-between',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
  },
});

export const scopeSection = style({
  borderTop: '1px solid var(--vd-border-subtle)',
  marginInline: '32px',
  padding: '24px 0 32px',
  '@media': {
    '(max-width: 640px)': {
      marginInline: '20px',
      paddingBlock: '20px',
    },
  },
});

export const taskHeading = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
});

export const taskContext = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  marginTop: 'auto',
  paddingTop: '16px',
  borderTop: '1px solid var(--vd-border-subtle)',
  color: tokens['--vd-text-secondary'],
  fontSize: '13px',
});

export const taskTitle = style({
  width: 'fit-content',
  color: tokens['--vd-brand-primary'],
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: 1.6,
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const taskDescription = style({
  margin: 0,
  color: tokens['--vd-text-secondary'],
  fontSize: '13px',
  lineHeight: 1.8,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const resultFooter = style({
  padding: '20px 32px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
  justifyContent: 'space-between',
  borderTop: '1px solid var(--vd-border-subtle)',
  '@media': {
    '(max-width: 640px)': {
      padding: '20px',
    },
  },
});

globalStyle(`${resultHero} > [data-slot=icon]`, {
  width: '72px',
  height: '72px',
  borderRadius: '20px',
  background: 'color-mix(in srgb, var(--result-accent) 9%, var(--vd-surface-default))',
});

globalStyle(`${resultHero} > [data-slot=icon] svg`, {
  width: '40px',
  height: '40px',
});

globalStyle(`${resultHero} h1`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-24'],
  letterSpacing: '-0.5px',
});

globalStyle(`${resultHero} p`, {
  margin: 0,
  maxWidth: '70ch',
  color: tokens['--vd-text-secondary'],
  fontSize: '14px',
  lineHeight: 1.8,
});

globalStyle(`${metadataPanel} h2`, {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
});

globalStyle(`${metadataPanel} h3`, {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
});

globalStyle(`${nextSteps} h2`, {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
});

globalStyle(`${nextSteps} h3`, {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
});

globalStyle(`${recovery} h2`, {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
});

globalStyle(`${recovery} h3`, {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
});

globalStyle(`${receiptMetadata} > div`, {
  display: 'grid',
  gap: '8px',
  alignContent: 'start',
});

globalStyle(`${receiptMetadata} dt`, {
  fontSize: '13px',
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${receiptMetadata} dd`, {
  margin: 0,
  fontSize: '14px',
  lineHeight: 1.7,
  overflowWrap: 'anywhere',
});

globalStyle(`${nextSteps} > a`, {
  fontSize: '13px',
});

globalStyle(`${nextSteps} [data-slot=item]`, {
  gridTemplateColumns: '36px minmax(0, 1fr)',
  gridTemplateRows: 'auto auto',
  alignContent: 'start',
  gap: '8px 16px',
  paddingBlock: '8px',
});

globalStyle(`${nextSteps} [data-slot=indicator]`, {
  gridRow: '1/3',
  display: 'grid',
  placeItems: 'center',
  alignSelf: 'start',
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  background: tokens['--vd-surface-secondary'],
  font: '13px var(--vd-font-family-mono)',
});

globalStyle(`${nextSteps} [data-status=complete] [data-slot=indicator]`, {
  background: 'color-mix(in srgb, var(--vd-brand-primary) 8%, var(--vd-surface-default))',
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${nextSteps} [data-status=current] [data-slot=indicator]`, {
  background: 'color-mix(in srgb, var(--vd-brand-primary) 8%, var(--vd-surface-default))',
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${nextSteps} [data-slot=title]`, {
  fontSize: '14px',
});

globalStyle(`${nextSteps} [data-slot=description]`, {
  fontSize: '13px',
  lineHeight: 1.8,
});

globalStyle(`${recovery} > a`, {
  fontSize: '13px',
});

globalStyle(`${recovery} [data-slot=content]`, {
  fontSize: '14px',
  lineHeight: 1.8,
});

globalStyle(`${scopeSection} h3`, {
  margin: '0 0 8px',
  fontSize: '16px',
});

globalStyle(`${scopeSection} ul`, {
  listStyle: 'none',
  margin: '20px 0 0',
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '20px',
});

globalStyle(`${scopeSection} li`, {
  display: 'grid',
  gap: '16px',
  padding: '24px',
  minWidth: 0,
  border: '1px solid var(--vd-border-default)',
  borderRadius: '12px',
  background: tokens['--vd-surface-default'],
  fontSize: '14px',
});

globalStyle(`${scopeSection} li:only-child`, {
  gridColumn: '1/-1',
});

globalStyle(`${resultFooter} > a`, {
  fontSize: '13px',
});

globalStyle(`${scopeSection} ul`, {
  '@media': {
    '(max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${resultHero} h1`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: tokens['--vd-font-size-20'],
    },
  },
});

globalStyle(`${scopeSection} li`, {
  '@media': {
    '(max-width: 640px)': {
      padding: '20px',
    },
  },
});
