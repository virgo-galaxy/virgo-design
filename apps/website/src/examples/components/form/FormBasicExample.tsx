import { Checkbox, Field, Form, Input, Radio, Select, Switch, Textarea } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './FormBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Form className={styles.root!}>
      <Field required>
        <Field.Label>{t('examples.form.copy.email')}</Field.Label>
        <Input name="email" type="email" />
        <Field.Description>{t('examples.form.copy.private')}</Field.Description>
      </Field>
      <Field>
        <Field.Label>{t('examples.form.copy.project')}</Field.Label>
        <Select name="project">
          <Select.Trigger placeholder={t('examples.form.copy.choose')} />
          <Select.Content>
            <Select.Option value="design">Item A</Select.Option>
            <Select.Option value="pro">Item B</Select.Option>
          </Select.Content>
        </Select>
      </Field>
      <Field>
        <Field.Label>{t('examples.form.copy.notes')}</Field.Label>
        <Textarea name="notes" />
      </Field>
      <Field className={styles.choice!}>
        <Checkbox name="accept" />
        <Field.Label>{t('examples.form.copy.accept')}</Field.Label>
      </Field>
      <Field className={styles.choice!}>
        <Switch name="notify" />
        <Field.Label>{t('examples.form.copy.notify')}</Field.Label>
      </Field>
      <fieldset className={styles.group!}>
        <legend>{t('examples.form.copy.plan')}</legend>
        <Field className={styles.choice!}>
          <Radio name="plan" value="basic" defaultChecked />
          <Field.Label>{t('examples.form.copy.basic')}</Field.Label>
        </Field>
        <Field className={styles.choice!}>
          <Radio name="plan" value="pro" />
          <Field.Label>{t('examples.form.copy.pro')}</Field.Label>
        </Field>
      </fieldset>
    </Form>
  );
}
