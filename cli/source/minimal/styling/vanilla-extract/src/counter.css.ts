import { style } from '@vanilla-extract/css';

export const page = style({
  boxSizing: 'border-box',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  padding: '1.5rem',
});

export const heading = style({
  margin: 0,
  fontSize: '2.25rem',
  fontWeight: 600,
  lineHeight: '2.5rem',
});
export const counter = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});
export const stage = style({ paddingTop: '2rem' });
export const sprite = style({ display: 'block', width: '7rem', height: 72, overflow: 'visible' });
export const hint = style({
  margin: 0,
  color: 'var(--vd-text-secondary)',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
});

export const keycap = style({
  boxSizing: 'border-box',
  display: 'inline-flex',
  minWidth: '1.5rem',
  justifyContent: 'center',
  paddingInline: '0.375rem',
  border: '1px solid var(--vd-border-subtle)',
  borderBottomWidth: 2,
  borderRadius: '0.375rem',
  color: 'var(--vd-text-primary)',
  background: 'var(--vd-surface-elevated)',
  fontSize: '0.75rem',
  lineHeight: '1.25rem',
});
