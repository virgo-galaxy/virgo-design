import { Combobox } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ComboboxGroupsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Combobox className={styles.root!} size="small">
      <Combobox.Input aria-label={t('examples.combobox.copy.project')} />
      <Combobox.Content>
        <Combobox.Group label={t('examples.combobox.copy.current')}>
          <Combobox.Option value="design" textValue="Item A">
            Item A
          </Combobox.Option>
        </Combobox.Group>
        <Combobox.Group label={t('examples.combobox.copy.future')}>
          <Combobox.Option value="pro" textValue="Item B">
            Item B
          </Combobox.Option>
        </Combobox.Group>
        <Combobox.Empty>{t('examples.combobox.copy.empty')}</Combobox.Empty>
      </Combobox.Content>
      <Combobox.Clear />
    </Combobox>
  );
}
