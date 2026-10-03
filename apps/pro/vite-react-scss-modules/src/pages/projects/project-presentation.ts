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
