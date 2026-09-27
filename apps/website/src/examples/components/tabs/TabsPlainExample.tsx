import { Tabs } from '@virgo-design/ui';

import styles from './TabsPlainExample.module.scss';

export default function App() {
  return (
    <Tabs variant="plain" defaultValue="overview" className={styles.root!}>
      <Tabs.List aria-label="Project views">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p>A concise summary of the current project.</p>
      </Tabs.Panel>
      <Tabs.Panel value="activity">
        <p>Recent changes and activity across the workspace.</p>
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <p>Project-level preferences and configuration.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
