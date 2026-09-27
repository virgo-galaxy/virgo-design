import { Tabs } from '@virgo-design/ui';

import styles from './TabsBasicExample.module.scss';

export default function App() {
  return (
    <Tabs defaultValue="overview" className={styles.root!}>
      <Tabs.List aria-label="Project sections">
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
  );
}
