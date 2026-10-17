import { TimePicker } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function TimePickerExample() {
  const { t } = useTranslation();

  return (
    <TimePicker
      data-docs-primitive="time-picker"
      aria-label={t('examples.timePicker.copy.label')}
      defaultValue="09:30"
    />
  );
}
