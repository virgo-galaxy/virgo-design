import { Combobox } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ComboboxAutocompleteExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  return (
    <div className={styles.root!}>
      <Combobox inputValue={query} onInputValueChange={setQuery} shouldFilter={false}>
        <Combobox.Input aria-label={t('examples.combobox.copy.search')} />
        <Combobox.Content>
          {['option-a.example.test', 'option-b.example.test', 'option-c.example.test']
            .filter((text) => text.includes(query.toLowerCase()))
            .map((text) => (
              <Combobox.Option key={text} value={text} textValue={text}>
                {text}
              </Combobox.Option>
            ))}
          <Combobox.Empty>{t('examples.combobox.copy.empty')}</Combobox.Empty>
        </Combobox.Content>
        <Combobox.Clear />
      </Combobox>
    </div>
  );
}
