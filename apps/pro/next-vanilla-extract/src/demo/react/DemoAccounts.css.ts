import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const demo = style({
  borderTop: '1px solid var(--vd-border-subtle)',
  marginTop: '28px',
  paddingTop: '24px',
});

export const demoTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '13px',
});

export const demoHint = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '12px',
  flexWrap: 'wrap',
  fontSize: '12px',
  color: tokens['--vd-text-secondary'],
});

export const identity = style({});

globalStyle(`${demo} > p`, {
  color: tokens['--vd-text-secondary'],
  fontSize: '12px',
  lineHeight: 1.7,
  margin: '10px 0 16px',
});

globalStyle(`${demoHint} code`, {
  color: tokens['--vd-text-primary'],
  background: tokens['--vd-surface-background'],
  padding: '4px 6px',
  borderRadius: '4px',
});

globalStyle(`${demoHint} > button`, {
  marginLeft: 'auto',
});

globalStyle(`${demo} ${identity}`, {
  marginBottom: 0,
});
