import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const page = style({
  display: 'grid',
  gap: '20px',
  minWidth: 0,
});

export const back = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: tokens['--vd-brand-primary'],
  fontSize: '13px',
  textDecoration: 'none',
  width: 'fit-content',
});

export const body = style({
  padding: '24px',
  '@media': {
    '(max-width: 1000px)': {
      padding: '20px',
    },
  },
});

export const columns = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.8fr) minmax(280px, 1fr)',
  gap: '20px',
  alignItems: 'start',
  '@media': {
    '(max-width: 1000px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const stack = style({
  display: 'grid',
  gap: '20px',
  minWidth: 0,
});

export const workflowActions = style({
  marginTop: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  '@media': {
    '(max-width: 1000px)': {
      alignItems: 'start',
      flexDirection: 'column',
    },
  },
});

export const description = style({
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  padding: '24px',
  fontSize: '14px',
  lineHeight: 1.8,
});

export const metadata = style({
  display: 'grid',
  gap: '20px',
  padding: '24px',
  margin: 0,
});

export const note = style({
  fontSize: '12px',
  color: tokens['--vd-text-tertiary'],
  margin: 0,
});

export const adminStatus = style({
  marginTop: '20px',
  maxWidth: '240px',
});

export const stepsViewport = style({
  overflowX: 'auto',
});

export const progressSteps = style({
  minWidth: '550px',
});

globalStyle(`${back} svg`, {
  width: '16px',
  height: '16px',
});

globalStyle(`${workflowActions} p`, {
  margin: 0,
  color: tokens['--vd-text-secondary'],
  fontSize: '13px',
});

globalStyle(`${metadata} div`, {
  display: 'grid',
  gap: '8px',
});

globalStyle(`${metadata} dt`, {
  fontSize: '12px',
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${metadata} dd`, {
  fontSize: '13px',
  margin: 0,
  overflowWrap: 'anywhere',
});

globalStyle(`${metadata} a`, {
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${progressSteps} > [data-slot=item]`, {
  position: 'relative',
  fontSize: '13px',
});

globalStyle(`${progressSteps} [data-slot=indicator]`, {
  display: 'grid',
  placeItems: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  background: tokens['--vd-surface-secondary'],
  border: '1px solid var(--vd-border-default)',
});

globalStyle(`${progressSteps} [data-status=current] [data-slot=indicator]`, {
  color: tokens['--vd-brand-foreground'],
  background: tokens['--vd-brand-primary'],
  borderColor: tokens['--vd-brand-primary'],
});

globalStyle(`${progressSteps} [data-status=complete] [data-slot=indicator]`, {
  color: tokens['--vd-brand-foreground'],
  background: tokens['--vd-brand-primary'],
  borderColor: tokens['--vd-brand-primary'],
});

globalStyle(`${progressSteps} > [data-slot=item]:not(:last-child)::after`, {
  content: '""',
  position: 'absolute',
  top: '14px',
  left: '40px',
  right: '8px',
  height: '1px',
  background: tokens['--vd-border-default'],
});
