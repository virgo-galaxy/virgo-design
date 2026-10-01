import { Combobox, Field } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ComboboxBasicExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <Field className={styles.root!}>
      <Field.Label>{t('examples.combobox.copy.project')}</Field.Label>
      <Combobox name="project">
        <Combobox.Input placeholder={t('examples.combobox.copy.search')} />
        <Combobox.Clear />
        <Combobox.Content>
          <Combobox.Option value="design" textValue="Virgo Design">
            Virgo Design
          </Combobox.Option>
          <Combobox.Option value="pro" textValue="Virgo Pro">
            Virgo Pro
          </Combobox.Option>
          <Combobox.Option value="legacy" textValue="Legacy" disabled>
            {t('examples.combobox.copy.unavailable')}
          </Combobox.Option>
          <Combobox.Empty>{t('examples.combobox.copy.empty')}</Combobox.Empty>
        </Combobox.Content>
      </Combobox>
      <Field.Description>{t('examples.combobox.copy.hint')}</Field.Description>
    </Field>
  );
}
