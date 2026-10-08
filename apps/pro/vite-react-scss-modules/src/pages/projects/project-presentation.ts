import type { TFunction } from 'i18next';

import type { Project } from '@/data/projects';
export const healthIntent = {
  'At risk': 'warning',
  'On track': 'success',
  Planning: 'neutral',
} as const;

const healthKeys = {
  'At risk': 'projects.atRisk',
  'On track': 'projects.onTrack',
  Planning: 'projects.planning',
} as const;
export function getProjectHealthLabel(t: TFunction, health: Project['health']) {
  return t(healthKeys[health]);
}

export function formatProjectDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date + 'T00:00:00Z'));
}
