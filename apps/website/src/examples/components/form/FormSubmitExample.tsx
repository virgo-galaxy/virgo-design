import { Button, Field, Form, Input } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './FormSubmitExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  return (
    <Form
      className={styles.root!}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmail(String(data.get('email') ?? ''));
      }}
    >
      <Field required>
        <Field.Label>{t('examples.form.copy.email')}</Field.Label>
        <Input name="email" type="email" defaultValue="team@virgo.design" />
      </Field>
      <Button type="submit">{t('examples.form.copy.save')}</Button>
      <p role="status">
        {email ? t('examples.form.copy.saved', { email }) : t('examples.form.copy.ready')}
      </p>
    </Form>
  );
}
