import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const tableViewport = style({
  marginInline: tokens['--vd-spacing-20'],
  scrollbarWidth: 'thin',
  '@media': {
    '(max-width: 640px)': {
      marginInline: tokens['--vd-spacing-16'],
    },
  },
});

export const table = style({
  minWidth: '1300px',
  fontSize: tokens['--vd-font-size-12'],
});

export const taskIdentity = style({
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
});

export const taskId = style({
  fontFamily: tokens['--vd-font-family-mono'],
  fontSize: tokens['--vd-font-size-10'],
  color: tokens['--vd-text-tertiary'],
});

export const taskTitle = style({
  maxWidth: '340px',
  fontSize: tokens['--vd-font-size-12'],
  overflowWrap: 'anywhere',
});

export const projectName = style({
  whiteSpace: 'nowrap',
  color: tokens['--vd-text-secondary'],
});

export const person = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  whiteSpace: 'nowrap',
  color: tokens['--vd-text-secondary'],
});

export const avatar = style({
  fontFamily: tokens['--vd-font-family-mono'],
});

export const estimateHours = style({
  fontVariantNumeric: 'tabular-nums',
});

export const createdAt = style({
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-11'],
});

export const dueDate = style({
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
  whiteSpace: 'nowrap',
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-secondary'],
  selectors: {
    '&[data-overdue=true]': {
      color: tokens['--vd-status-danger-text'],
    },
  },
});

export const overdueLabel = style({
  fontSize: tokens['--vd-font-size-10'],
});

export const tableFooter = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  padding: 'var(--vd-spacing-16) var(--vd-spacing-20)',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
  alignItems: 'center',
  flexWrap: 'wrap',
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column',
      gap: tokens['--vd-spacing-4'],
    },
  },
});

export const pagination = style({
  width: '100%',
});

export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});

export const rowActions = style({
  display: 'inline-flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  gap: tokens['--vd-spacing-4'],
});

globalStyle(`${table} th`, {
  whiteSpace: 'nowrap',
});

globalStyle(`${pagination} [data-slot=total]`, {
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${rowActions} > button[data-variant=text]`, {
  paddingInline: tokens['--vd-spacing-8'],
});

globalStyle(`${table} [data-column-key=title]`, {
  overflowWrap: 'anywhere',
});

globalStyle(`${table} [data-column-key=actions] ${rowActions}`, {
  flexWrap: 'wrap',
  whiteSpace: 'normal',
});

globalStyle(`${table} th[draggable=true]`, {
  cursor: 'grab',
});
