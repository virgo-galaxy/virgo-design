import { Textarea } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function TextareaExample() {
  const { t } = useTranslation();

  return (
    <label>
      {t('primitives.examples.notes')}{' '}
      <Textarea
        data-docs-primitive="textarea"
        defaultValue={t('primitives.examples.headlessByDefault')}
        rows={3}
      />
    </label>
  );
}
