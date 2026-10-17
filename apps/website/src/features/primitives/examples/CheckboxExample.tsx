import { Checkbox } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function CheckboxExample() {
  const { t } = useTranslation();

  return (
    <Checkbox.Group
      defaultValue={['weekly']}
      name="primitive-frequency"
      aria-label={t('primitives.examples.frequency')}
      data-docs-primitive="checkbox"
    >
      <label>
        <Checkbox value="daily" /> {t('primitives.examples.daily')}
      </label>{' '}
      <label>
        <Checkbox value="weekly" /> {t('primitives.examples.weekly')}
      </label>
    </Checkbox.Group>
  );
}
