import { Button, Field, Form, Input } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './FieldValidationExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [invalid, setInvalid] = useState(false);
  return (
    <Form
      className={styles.root!}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setInvalid(!email.includes('@'));
      }}
    >
      <Field invalid={invalid} required>
        <Field.Label>{t('examples.field.copy.email')}</Field.Label>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby="validation-note"
        />
        <Field.Description id="validation-note">
          {t('examples.field.copy.private')}
        </Field.Description>
        {invalid ? <Field.Message>{t('examples.field.copy.error')}</Field.Message> : null}
      </Field>
      <Button type="submit">{t('examples.field.copy.validate')}</Button>
    </Form>
  );
}
