import { Combobox } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ComboboxControlledExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.root!}>
      <Combobox
        value={value}
        onValueChange={setValue}
        inputValue={query}
        onInputValueChange={setQuery}
        open={open}
        onOpenChange={setOpen}
      >
        <Combobox.Input aria-label={t('examples.combobox.copy.project')} />
        <Combobox.Content>
          <Combobox.Option value="design" textValue="Item A">
            Item A
          </Combobox.Option>
          <Combobox.Option value="pro" textValue="Item B">
            Item B
          </Combobox.Option>
          <Combobox.Empty>{t('examples.combobox.copy.empty')}</Combobox.Empty>
        </Combobox.Content>
        <Combobox.Clear />
      </Combobox>
      <p role="status">{t('examples.combobox.copy.selected', { value: value || '—' })}</p>
    </div>
  );
}
