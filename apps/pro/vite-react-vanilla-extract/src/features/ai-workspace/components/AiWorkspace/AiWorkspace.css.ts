import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

const previewGlow = keyframes({
  '0%, 100%': {
    opacity: 0.35,
  },
  '50%': {
    opacity: 1,
  },
});

export const root = style({
  position: 'fixed',
  inset: 0,
  overflow: 'hidden',
  isolation: 'isolate',
  color: tokens['--vd-text-primary'],
  background: tokens['--vd-surface-background'],
});

export const workbench = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  overflow: 'hidden',
  transformOrigin: 'top left',
});

export const stage = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  visibility: 'hidden',
  opacity: 0,
  outline: 'none',
  background:
    'radial-gradient(ellipse at 50% 48%, color-mix(in srgb, var(--vd-brand-primary) 6%, transparent), transparent 65%), var(--vd-surface-background)',
});

export const agentContent = style({
  flex: '1',
  minHeight: 0,
  display: 'grid',
  placeItems: 'center',
  padding: '24px',
  '@media': {
    '(max-width: 640px)': {
      padding: '20px',
    },
  },
});

export const stageFooter = style({
  flexShrink: 0,
  userSelect: 'none',
  padding: '12px 24px 16px',
  textAlign: 'center',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

export const voiceSpace = style({
  width: 'min(700px, 100%)',
  textAlign: 'center',
});

export const aiMark = style({
  display: 'inline-grid',
  placeItems: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '20px',
  color: tokens['--vd-brand-primary'],
  background: 'color-mix(in srgb, var(--vd-brand-primary) 9%, var(--vd-surface-default))',
});

export const previewFrame = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 'var(--preview-width)',
  height: 'var(--preview-height)',
  zIndex: 2,
  visibility: 'hidden',
  opacity: 0,
  pointerEvents: 'none',
});

export const preview = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  padding: 0,
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: '14px',
  background: 'transparent',
  color: tokens['--vd-text-secondary'],
  boxShadow: 'var(--vd-panel-shadow, 0 12px 36px rgba(0, 0, 0, 0.14))',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: '-1px',
      borderRadius: 'inherit',
      pointerEvents: 'none',
      opacity: 0,
      boxShadow:
        '0 0 10px color-mix(in srgb, var(--vd-brand-primary) 40%, transparent), 0 0 30px color-mix(in srgb, var(--vd-brand-primary) 24%, transparent), 0 0 56px color-mix(in srgb, var(--vd-brand-primary) 14%, transparent)',
    },
  },
});

export const previewCaption = style({
  position: 'absolute',
  top: 'calc(100% + 10px)',
  right: 0,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: 0,
  border: 0,
  background: 'transparent',
  color: tokens['--vd-text-secondary'],
  whiteSpace: 'nowrap',
  font: 'inherit',
  fontSize: '12px',
  pointerEvents: 'auto',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      color: tokens['--vd-brand-primary'],
    },
    '&:focus-visible': {
      color: tokens['--vd-brand-primary'],
      outline: '2px solid var(--vd-brand-primary)',
      outlineOffset: '4px',
    },
    '&:disabled': {
      cursor: 'wait',
    },
  },
});

export const handleHint = style({
  position: 'absolute',
  left: '-10px',
  top: '-10px',
});

export const handle = style({
  display: 'inline-grid',
  placeItems: 'center',
  width: '32px',
  height: '32px',
  padding: 0,
  border: '1px solid color-mix(in srgb, var(--vd-border-subtle) 40%, transparent)',
  borderRadius: '6px',
  color: tokens['--vd-text-secondary'],
  background: 'color-mix(in srgb, var(--vd-surface-default) 70%, transparent)',
  boxShadow: 'var(--vd-panel-shadow, 0 1px 4px rgba(0, 0, 0, 0.04))',
  backdropFilter: 'blur(4px)',
  pointerEvents: 'auto',
  touchAction: 'none',
  cursor: 'grab',
  selectors: {
    '&:focus-visible': {
      outline: '2px solid var(--vd-text-secondary)',
      outlineOffset: '2px',
    },
    '&[data-dragging]': {
      cursor: 'grabbing',
    },
  },
});

export const resizeHint = style({
  position: 'absolute',
  right: 0,
  bottom: 0,
});

export const resizeHandle = style({
  display: 'inline-grid',
  placeItems: 'center',
  width: '24px',
  height: '24px',
  padding: 0,
  border: 0,
  borderRadius: '4px',
  color: tokens['--vd-text-secondary'],
  background: 'transparent',
  touchAction: 'none',
  cursor: 'nwse-resize',
  pointerEvents: 'auto',
  selectors: {
    '&:focus-visible': {
      outline: '2px solid var(--vd-text-secondary)',
      outlineOffset: '2px',
    },
  },
});

export const resizeMark = style({
  display: 'block',
});

export const error = style({});

globalStyle(`${root}[data-phase=entering] ${workbench}`, {
  pointerEvents: 'none',
});

globalStyle(`${root}[data-phase=leaving] ${workbench}`, {
  pointerEvents: 'none',
});

globalStyle(`${voiceSpace} h1`, {
  margin: '20px 0 8px',
  fontSize: '26px',
  fontWeight: 600,
  letterSpacing: '-0.6px',
});

globalStyle(`${voiceSpace} > p`, {
  margin: '0 0 28px',
  color: tokens['--vd-text-secondary'],
});

globalStyle(`${previewFrame}[data-hover] ${previewCaption}`, {
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${previewFrame}[data-focused] ${previewCaption}`, {
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${previewFrame}:hover ${previewCaption}`, {
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${previewFrame}[data-hover] ${preview}`, {
  borderColor: tokens['--vd-brand-primary'],
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${previewFrame}[data-focused] ${preview}`, {
  borderColor: tokens['--vd-brand-primary'],
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${previewFrame}:hover ${preview}`, {
  borderColor: tokens['--vd-brand-primary'],
  color: tokens['--vd-brand-primary'],
});

globalStyle(`${previewFrame}[data-hover] ${preview}::after`, {
  animation: `${previewGlow} 1.8s ease-in-out infinite`,
});

globalStyle(`${previewFrame}[data-focused] ${preview}::after`, {
  animation: `${previewGlow} 1.8s ease-in-out infinite`,
});

globalStyle(`${previewFrame}:hover ${preview}::after`, {
  animation: `${previewGlow} 1.8s ease-in-out infinite`,
});

globalStyle(`${previewFrame} ${preview}::after`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

globalStyle(`${previewFrame}[data-hover] ${preview}::after`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      opacity: 0.65,
    },
  },
});

globalStyle(`${previewFrame}[data-focused] ${preview}::after`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      opacity: 0.65,
    },
  },
});

globalStyle(`${previewFrame}:hover ${preview}::after`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      opacity: 0.65,
    },
  },
});

globalStyle(`${previewFrame}[data-corner$=left] ${previewCaption}`, {
  left: 0,
  right: 'auto',
});

globalStyle(`${previewFrame}[data-corner^=bottom] ${previewCaption}`, {
  top: 'auto',
  bottom: 'calc(100% + 10px)',
});

globalStyle(`${previewFrame}[data-corner=top-right] ${resizeHint}`, {
  left: 0,
  right: 'auto',
});

globalStyle(`${previewFrame}[data-corner=top-right] ${resizeHint} ${resizeHandle}`, {
  cursor: 'nesw-resize',
});

globalStyle(`${previewFrame}[data-corner=bottom-right] ${handleHint}`, {
  left: 'auto',
  right: '-10px',
});

globalStyle(`${previewFrame}[data-corner=bottom-right] ${resizeHint}`, {
  left: 0,
  top: 0,
  right: 'auto',
  bottom: 'auto',
});

globalStyle(`${previewFrame}[data-corner=bottom-left] ${resizeHint}`, {
  top: 0,
  bottom: 'auto',
});

globalStyle(`${previewFrame}[data-corner=bottom-left] ${resizeHint} ${resizeHandle}`, {
  cursor: 'nesw-resize',
});

globalStyle(`${voiceSpace} > ${error}`, {
  marginTop: '16px',
  color: tokens['--vd-status-danger-solid'],
});

globalStyle(`${voiceSpace} h1`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: '24px',
    },
  },
});
