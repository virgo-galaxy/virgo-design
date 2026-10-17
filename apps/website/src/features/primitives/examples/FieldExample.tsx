import { Field, Input } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function FieldExample() {
  const { t } = useTranslation();

  return (
    <Field data-docs-primitive="field" required>
      <Field.Label>{t('primitives.examples.displayName')}</Field.Label>
      <Input />
      <Field.Description>{t('primitives.examples.headlessByDefault')}</Field.Description>
    </Field>
  );
}
