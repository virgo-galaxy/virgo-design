import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const tasksPage = style({
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
});

export const listActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-16'],
  padding: 'var(--vd-spacing-16) var(--vd-spacing-20)',
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const listPanel = style({
  vars: {
    '--task-panel-background': 'var(--vd-overlay-background, #fff)',
  },
  justifySelf: 'start',
  width: '100%',
  minWidth: 0,
  overflow: 'visible',
  background: 'var(--task-panel-background)',
  boxShadow:
    'var(--vd-panel-shadow, 0 4px 18px color-mix(in srgb, var(--vd-text-primary) 5%, transparent))',
  selectors: {
    '&[data-table-size=mini]': {
      vars: {
        '--task-table-font-size': tokens['--vd-font-size-11'],
      },
    },
    '&[data-table-size=small]': {
      vars: {
        '--task-table-font-size': tokens['--vd-font-size-12'],
      },
    },
    '&[data-table-size=medium]': {
      vars: {
        '--task-table-font-size': tokens['--vd-font-size-12'],
      },
    },
    '&[data-table-size=large]': {
      vars: {
        '--task-table-font-size': tokens['--vd-font-size-14'],
      },
    },
  },
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

export const bulkActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens['--vd-spacing-12'],
  marginInlineStart: 'auto',
});

export const viewControls = style({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  '@media': {
    '(max-width: 600px)': {
      flexWrap: 'wrap',
    },
  },
});

export const roleTitle = style({
  fontSize: '14px',
  fontWeight: 600,
});

globalStyle(`${listPanel} [data-pro-task-table]`, {
  vars: {
    '--table-body-background': 'var(--vd-table-body-background, var(--task-panel-background))',
    '--table-row-hover-background':
      'var(\n    --vd-table-hover-background,\n    color-mix(in srgb, var(--vd-brand-primary) 3%, var(--table-body-background))\n  )',
  },
});

globalStyle(`${listPanel} [data-pro-task-table][data-hoverable=true] tbody > tr[data-task-id]`, {
  transition:
    'box-shadow var(--vd-motion-state-duration, var(--vd-duration-180)) var(--vd-motion-easing-standard, var(--vd-easing-standard))',
});

globalStyle(
  `${listPanel} [data-pro-task-table][data-hoverable=true] tbody > tr[data-task-id]:is(:hover, :focus-within)`,
  {
    boxShadow:
      'var(--vd-panel-shadow, 0 3px 10px color-mix(in srgb, var(--vd-text-primary) 9%, transparent))',
  },
);

globalStyle(`[data-theme='dark'] ${listPanel}`, {
  vars: {
    '--task-panel-background': tokens['--vd-surface-elevated'],
  },
});

globalStyle(`${listPanel} [data-pro-task-table][data-hoverable=true] tbody > tr[data-task-id]`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

globalStyle(`${listPanel} [data-pro-task-table]`, {
  minWidth: 0,
});

globalStyle(`${listPanel} [data-pro-task-table]`, {
  fontSize: 'var(--task-table-font-size)',
});

globalStyle(`${listPanel} [data-pro-task-title]`, {
  fontSize: 'var(--task-table-font-size)',
});

globalStyle(`${listPanel}[data-table-size=mini] ${listActions}`, {
  paddingBlock: tokens['--vd-spacing-8'],
});

globalStyle(`${listPanel}[data-table-size=mini] [data-pro-task-footer]`, {
  paddingBlock: tokens['--vd-spacing-8'],
});

globalStyle(`${listPanel}[data-table-size=small] ${listActions}`, {
  paddingBlock: tokens['--vd-spacing-12'],
});

globalStyle(`${listPanel}[data-table-size=small] [data-pro-task-footer]`, {
  paddingBlock: tokens['--vd-spacing-12'],
});

globalStyle(`${listPanel}[data-table-size=large] ${listActions}`, {
  paddingBlock: tokens['--vd-spacing-20'],
});

globalStyle(`${listPanel}[data-table-size=large] [data-pro-task-footer]`, {
  paddingBlock: tokens['--vd-spacing-20'],
});
