export const healthIntent = {
  'At risk': 'warning',
  'On track': 'success',
  Planning: 'neutral',
} as const;

export const projectHealthLabelNames = {
  'At risk': 'atRisk',
  'On track': 'onTrack',
  Planning: 'planning',
} as const;

export function formatProjectDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date + 'T00:00:00Z'));
}
