import type { TFunction } from 'i18next';

import type { ActivityDto } from '@/api/analytics';
import { businessLabel } from '@/lib/demo/labels';

export function getActivityActionLabel(t: TFunction, event: ActivityDto, language: string): string {
  if (event.taskTitle && event.action)
    return t(`workplace.activityActions.${event.action}`, {
      title: businessLabel(event.taskTitle, language),
    });
  return t('workplace.activityUpdated');
}
