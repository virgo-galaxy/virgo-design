import { Tabs } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './TabsEditableExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [tabs, setTabs] = useState([
    { value: 'document-1', label: 'Tab 1' },
    { value: 'document-2', label: 'Tab 2' },
    { value: 'document-3', label: 'Tab 3' },
  ]);
  const [value, setValue] = useState('document-1');
  const [nextNumber, setNextNumber] = useState(4);
  const addTab = () => {
    const nextValue = `document-${nextNumber}`;
    setTabs((current) => [...current, { value: nextValue, label: `Tab ${nextNumber}` }]);
    setValue(nextValue);
    setNextNumber((number) => number + 1);
  };
  const closeTab = (tabValue: string) => {
    setTabs((current) => current.filter((tab) => tab.value !== tabValue));
  };
  return (
    <Tabs
      addable
      variant="card"
      value={value}
      onValueChange={setValue}
      onAdd={addTab}
      addLabel={t('examples.tabs.details.addDocumentTab')}
      className={styles.root!}
    >
      <Tabs.List aria-label={t('examples.tabs.copy.openDocuments')}>
        {tabs.map((tab) => (
          <Tabs.Tab
            closable
            key={tab.value}
            value={tab.value}
            closeLabel={t('examples.tabs.details.closeValue', {
              v0: translateExampleText(t, 'tabs', String(tab.label)),
            })}
            onClose={closeTab}
          >
            {translateExampleText(t, 'tabs', tab.label)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value}>
          <p>
            {t('examples.tabs.copy.editableContentFor')}{' '}
            {translateExampleText(t, 'tabs', tab.label)}.
          </p>
        </Tabs.Panel>
      ))}
      {tabs.length === 0 ? (
        <p>{t('examples.tabs.copy.noDocumentsAreOpenUseAddTabToCreateOne')}</p>
      ) : null}
    </Tabs>
  );
}
