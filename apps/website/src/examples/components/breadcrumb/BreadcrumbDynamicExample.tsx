import { Breadcrumb, Input } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './BreadcrumbDynamicExample.module.scss';

export default function App() {
  const [userId, setUserId] = useState('1');
  return (
    <div className={styles.root!}>
      <Input
        aria-label="User identifier"
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
      />
      <Breadcrumb>
        <Breadcrumb.Item href="#users">Users</Breadcrumb.Item>
        <Breadcrumb.Item>{userId || 'New user'}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
