import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const tasksCard = style({
  selectors: {
    '&[data-size=md]': {
      alignContent: 'start',
      vars: {
        '--card-padding': tokens['--vd-spacing-20'],
        '--card-title-font-size': tokens['--vd-font-size-14'],
        '--card-gap': tokens['--vd-spacing-20'],
      },
    },
  },
  containerType: 'inline-size',
  containerName: 'recent-tasks',
  vars: {
    '--card-gap': tokens['--vd-spacing-16'],
  },
});

export const panelHeader = style({
  flexWrap: 'wrap',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: tokens['--vd-spacing-12'],
  '@media': {
    '(max-width: 640px)': {
      flexWrap: 'wrap',
    },
  },
});

export const compactTaskHeading = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 96px 80px',
  columnGap: tokens['--vd-spacing-12'],
  alignItems: 'center',
  paddingBlockEnd: tokens['--vd-spacing-8'],
  borderBottom: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
  '@container': {
    'recent-tasks (max-width: 380px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      rowGap: tokens['--vd-spacing-4'],
    },
  },
});

export const compactTask = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 96px 80px',
  columnGap: tokens['--vd-spacing-12'],
  alignItems: 'center',
  paddingBlock: tokens['--vd-spacing-12'],
  borderBottom: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
  selectors: {
    '&:last-child': {
      border: 0,
    },
  },
  '@container': {
    'recent-tasks (max-width: 380px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      rowGap: tokens['--vd-spacing-4'],
    },
  },
});

export const compactTasks = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const compactTaskIdentity = style({
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
  minWidth: 0,
  '@container': {
    'recent-tasks (max-width: 380px)': {
      gridRow: '1/span 2',
    },
  },
});

export const compactTaskStatus = style({
  justifySelf: 'start',
  '@container': {
    'recent-tasks (max-width: 380px)': {
      gridColumn: '2',
      justifySelf: 'end',
    },
  },
});

export const compactTaskDue = style({
  whiteSpace: 'nowrap',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
  '@container': {
    'recent-tasks (max-width: 380px)': {
      gridColumn: '2',
      justifySelf: 'end',
    },
  },
});

export const compactTaskDateHeading = style({
  '@container': {
    'recent-tasks (max-width: 380px)': {
      display: 'none',
    },
  },
});

export const taskFooter = style({
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
  borderTop: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
  paddingBlockStart: tokens['--vd-spacing-12'],
  justifyContent: 'space-between',
});

export const emptyTasks = style({
  paddingBlock: tokens['--vd-spacing-24'],
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${compactTaskIdentity} strong`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle(`${compactTaskIdentity} span`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle(`${compactTaskIdentity} strong`, {
  whiteSpace: 'normal',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: tokens['--vd-font-size-12'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${compactTaskIdentity} span`, {
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${taskFooter} > span`, {
  flex: '1 1 160px',
  minWidth: 0,
});

globalStyle(`${taskFooter} > button`, {
  flex: 'none',
  marginInlineStart: 'auto',
});
