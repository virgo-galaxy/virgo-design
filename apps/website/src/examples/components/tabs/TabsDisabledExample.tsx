import { Tabs } from '@virgo-design/ui';

import styles from './TabsDisabledExample.module.scss';

export default function App() {
  return (
    <Tabs defaultValue="overview" className={styles.root!}>
      <Tabs.List aria-label="Sections with disabled tab">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="api" disabled>
          API
        </Tabs.Tab>
        <Tabs.Tab value="accessibility">Accessibility</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p>The API tab is currently unavailable.</p>
      </Tabs.Panel>
      <Tabs.Panel value="api">
        <p>Unavailable content.</p>
      </Tabs.Panel>
      <Tabs.Panel value="accessibility">
        <p>Disabled tabs are skipped.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
