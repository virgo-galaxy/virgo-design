import './BreadcrumbIconsExample.module.scss';

import { SearchIcon, SettingsIcon, UserIcon } from '@virgo-design/icons';
import { Breadcrumb } from '@virgo-design/ui';

export default function App() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item icon={<UserIcon />} href="#home">
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item icon={<SettingsIcon />} href="#application-center">
        Application Center
      </Breadcrumb.Item>
      <Breadcrumb.Item icon={<SearchIcon />} href="#application-list">
        Application List
      </Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
