import { Field, Form, Input, Textarea } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './FormHorizontalExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Form layout="horizontal" size="large" className={styles.root!}>
      <Field>
        <Field.Label>{t('examples.form.copy.email')}</Field.Label>
        <Input />
      </Field>
      <Field>
        <Field.Label>{t('examples.form.copy.notes')}</Field.Label>
        <Textarea />
        <Field.Description>{t('examples.form.copy.private')}</Field.Description>
      </Field>
    </Form>
  );
}
