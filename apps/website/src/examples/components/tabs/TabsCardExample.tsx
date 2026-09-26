import { Tabs } from '@virgo-design/ui';

export default function App() {
  return (
    <Tabs variant="card" defaultValue="document-1" style={{ width: '100%' }}>
      <Tabs.List aria-label="Documents">
        <Tabs.Tab value="document-1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="document-2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="document-3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="document-1">
        <p>Content for the first tab.</p>
      </Tabs.Panel>
      <Tabs.Panel value="document-2">
        <p>Content for the second tab.</p>
      </Tabs.Panel>
      <Tabs.Panel value="document-3">
        <p>Content for the third tab.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
