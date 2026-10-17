import { Field, Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './FieldBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Field className={styles.root!} required>
      <Field.Label>{t('examples.field.copy.email')}</Field.Label>
      <Input type="email" />
      <Field.Description>{t('examples.field.copy.private')}</Field.Description>
    </Field>
  );
}
