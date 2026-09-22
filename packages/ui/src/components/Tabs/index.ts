import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';
import { Tabs as TabsRoot } from './Tabs';

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab,
  Panel: TabPanel,
});
export type {
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsAlign,
  TabsProps,
  TabsVariant,
} from './Tabs.types';
