import type { TFunction } from 'i18next';
export function getActivityActionLabel(t: TFunction, id: string): string {
  switch (id) {
    case 'a1':
      return t('workplace.activityActions.a1');
    case 'a2':
      return t('workplace.activityActions.a2');
    case 'a3':
      return t('workplace.activityActions.a3');
    default:
      return t('workplace.activityUpdated');
  }
}
