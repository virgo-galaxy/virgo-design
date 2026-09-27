import './BreadcrumbBasicExample.module.scss';

import { Breadcrumb } from '@virgo-design/ui';

export default function App() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#home">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#application-center">Application Center</Breadcrumb.Item>
      <Breadcrumb.Item href="#application-list">Application List</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
