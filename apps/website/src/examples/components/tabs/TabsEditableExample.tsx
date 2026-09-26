import { Tabs } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
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
      addLabel="Add document tab"
      style={{ width: '100%' }}
    >
      <Tabs.List aria-label="Open documents">
        {tabs.map((tab) => (
          <Tabs.Tab
            closable
            key={tab.value}
            value={tab.value}
            closeLabel={`Close ${tab.label}`}
            onClose={closeTab}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value}>
          <p>Editable content for {tab.label}.</p>
        </Tabs.Panel>
      ))}
      {tabs.length === 0 ? <p>No documents are open. Use Add tab to create one.</p> : null}
    </Tabs>
  );
}
