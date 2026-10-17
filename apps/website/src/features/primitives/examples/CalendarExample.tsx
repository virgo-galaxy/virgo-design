import { Calendar } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { useAppLocale } from '@/i18n';

export function CalendarExample() {
  const { t } = useTranslation();
  const locale = useAppLocale();

  return (
    <Calendar
      previousMonthLabel={t('primitives.examples.previousMonth')}
      nextMonthLabel={t('primitives.examples.nextMonth')}
      data-docs-primitive="calendar"
      locale={locale}
      defaultMonth="2026-10"
    />
  );
}
