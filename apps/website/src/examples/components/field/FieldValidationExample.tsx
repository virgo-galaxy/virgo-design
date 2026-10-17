import { Button, Field, Form, Input } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './FieldValidationExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const descriptionId = useId();
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
          aria-describedby={descriptionId}
        />
        <Field.Description id={descriptionId}>
          {t('examples.field.copy.private')}
        </Field.Description>
        {invalid ? <Field.Message>{t('examples.field.copy.error')}</Field.Message> : null}
      </Field>
      <Button type="submit">{t('examples.field.copy.validate')}</Button>
    </Form>
  );
}
