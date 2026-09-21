import { Tab, TabList, TabPanel, Tabs as TabsRoot } from './Tabs';

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab,
  Panel: TabPanel,
});
export type { TabListProps, TabPanelProps, TabProps, TabsProps } from './Tabs.types';
