import { Field, Form, Input } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function FormExample() {
  const { t } = useTranslation();

  return (
    <Form data-docs-primitive="form" onSubmit={(event) => event.preventDefault()}>
      <Field>
        <Field.Label>{t('primitives.examples.displayName')}</Field.Label>
        <Input />
      </Field>
      <button type="submit">{t('primitives.examples.save')}</button>
    </Form>
  );
}
