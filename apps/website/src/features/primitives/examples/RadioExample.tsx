import { Radio } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function RadioExample() {
  const { t } = useTranslation();

  return (
    <Radio.Group
      defaultValue="comfortable"
      name="primitive-density"
      aria-label={t('primitives.examples.density')}
      data-docs-primitive="radio"
    >
      <label>
        <Radio value="compact" /> {t('primitives.examples.compact')}
      </label>{' '}
      <label>
        <Radio value="comfortable" /> {t('primitives.examples.comfortable')}
      </label>
    </Radio.Group>
  );
}
