export const statusColorFamilies = ['success', 'warning', 'danger', 'info'] as const;

// Accent/foreground is the theme-adaptive indicator pair. Solid/onSolid is the
// strong surface pair, with light content and normal-text contrast in both themes.
export const statusColorRoles = [
  'accent',
  'foreground',
  'solid',
  'onSolid',
  'subtle',
  'border',
  'text',
] as const;

export const statusColorTokens = {
  success: {
    accent: 'status.success.accent',
    foreground: 'status.success.foreground',
    solid: 'status.success.solid',
    onSolid: 'status.success.onSolid',
    subtle: 'status.success.subtle',
    border: 'status.success.border',
    text: 'status.success.text',
  },
  warning: {
    accent: 'status.warning.accent',
    foreground: 'status.warning.foreground',
    solid: 'status.warning.solid',
    onSolid: 'status.warning.onSolid',
    subtle: 'status.warning.subtle',
    border: 'status.warning.border',
    text: 'status.warning.text',
  },
  danger: {
    accent: 'status.danger.accent',
    foreground: 'status.danger.foreground',
    solid: 'status.danger.solid',
    onSolid: 'status.danger.onSolid',
    subtle: 'status.danger.subtle',
    border: 'status.danger.border',
    text: 'status.danger.text',
  },
  info: {
    accent: 'status.info.accent',
    foreground: 'status.info.foreground',
    solid: 'status.info.solid',
    onSolid: 'status.info.onSolid',
    subtle: 'status.info.subtle',
    border: 'status.info.border',
    text: 'status.info.text',
  },
} as const;

export type StatusColorFamily = (typeof statusColorFamilies)[number];
export type StatusColorRole = (typeof statusColorRoles)[number];
