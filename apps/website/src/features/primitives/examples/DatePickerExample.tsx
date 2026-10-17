import { DatePicker } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { useAppLocale } from '@/i18n';

import { portalProps } from './portal-props';

export function DatePickerExample() {
  const { t } = useTranslation();
  const locale = useAppLocale();

  return (
    <DatePicker data-docs-primitive="date-picker" defaultValue="2026-10-06">
      <DatePicker.Input aria-label={t('examples.datePicker.copy.label')} />
      <DatePicker.Trigger>{t('primitives.examples.chooseDate')}</DatePicker.Trigger>
      <DatePicker.Content {...portalProps}>
        <DatePicker.Calendar
          previousMonthLabel={t('primitives.examples.previousMonth')}
          nextMonthLabel={t('primitives.examples.nextMonth')}
          locale={locale}
        />
      </DatePicker.Content>
    </DatePicker>
  );
}
