export const statusColorFamilies = ['success', 'warning', 'danger', 'info'] as const;

export const statusColorRoles = ['accent', 'foreground', 'subtle', 'border', 'text'] as const;

export const statusColorTokens = {
  success: {
    accent: 'status.success.accent',
    foreground: 'status.success.foreground',
    subtle: 'status.success.subtle',
    border: 'status.success.border',
    text: 'status.success.text',
  },
  warning: {
    accent: 'status.warning.accent',
    foreground: 'status.warning.foreground',
    subtle: 'status.warning.subtle',
    border: 'status.warning.border',
    text: 'status.warning.text',
  },
  danger: {
    accent: 'status.danger.accent',
    foreground: 'status.danger.foreground',
    subtle: 'status.danger.subtle',
    border: 'status.danger.border',
    text: 'status.danger.text',
  },
  info: {
    accent: 'status.info.accent',
    foreground: 'status.info.foreground',
    subtle: 'status.info.subtle',
    border: 'status.info.border',
    text: 'status.info.text',
  },
} as const;

export type StatusColorFamily = (typeof statusColorFamilies)[number];
export type StatusColorRole = (typeof statusColorRoles)[number];
