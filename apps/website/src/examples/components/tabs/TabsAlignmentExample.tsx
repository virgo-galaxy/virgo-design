import { Tabs } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24, width: '100%' }}>
      {(['start', 'center'] as const).map((align) => (
        <Tabs key={align} align={align} defaultValue="overview">
          <Tabs.List aria-label={`${align} project sections`}>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="api">API</Tabs.Tab>
            <Tabs.Tab value="accessibility">Accessibility</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">
            <p>A concise summary of the current project.</p>
          </Tabs.Panel>
          <Tabs.Panel value="api">
            <p>Public component props and composition guidance.</p>
          </Tabs.Panel>
          <Tabs.Panel value="accessibility">
            <p>Keyboard and assistive technology behavior.</p>
          </Tabs.Panel>
        </Tabs>
      ))}
    </div>
  );
}
