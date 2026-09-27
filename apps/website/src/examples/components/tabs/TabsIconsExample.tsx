import { CircleInfoIcon, SearchIcon, SettingsIcon, UserIcon } from '@virgo-design/icons';
import { Tabs } from '@virgo-design/ui';

import styles from './TabsIconsExample.module.scss';

export default function App() {
  return (
    <Tabs defaultValue="account" className={styles.root!}>
      <Tabs.List aria-label="Settings sections">
        <Tabs.Tab value="account" icon={<UserIcon />}>
          Account
        </Tabs.Tab>
        <Tabs.Tab value="preferences" icon={<SettingsIcon />}>
          Preferences
        </Tabs.Tab>
        <Tabs.Tab value="about" icon={<CircleInfoIcon />}>
          About
        </Tabs.Tab>
        <Tabs.Tab value="search" icon={<SearchIcon />}>
          Search
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">
        <p>Profile and identity preferences.</p>
      </Tabs.Panel>
      <Tabs.Panel value="preferences">
        <p>Workspace-level configuration.</p>
      </Tabs.Panel>
      <Tabs.Panel value="about">
        <p>Product and version information.</p>
      </Tabs.Panel>
      <Tabs.Panel value="search">
        <p>Search configuration.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
