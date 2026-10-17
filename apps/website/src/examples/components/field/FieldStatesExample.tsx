import { Field, Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './FieldStatesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Field disabled>
        <Field.Label>{t('examples.field.copy.disabled')}</Field.Label>
        <Input defaultValue="Example" />
      </Field>
      <Field readOnly>
        <Field.Label>{t('examples.field.copy.readonly')}</Field.Label>
        <Input clearable defaultValue="Item A" />
      </Field>
      <Field invalid>
        <Field.Label>{t('examples.field.copy.custom')}</Field.Label>
        <Field.Control render={(props) => <Input {...props} />} />
        <Field.Message>{t('examples.field.copy.error')}</Field.Message>
      </Field>
    </div>
  );
}
