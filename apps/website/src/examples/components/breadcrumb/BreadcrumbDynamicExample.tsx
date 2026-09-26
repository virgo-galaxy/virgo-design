import { Breadcrumb, Input } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [userId, setUserId] = useState('1');
  return (
    <div style={{ display: 'grid', gap: 24, width: '100%', maxWidth: 360 }}>
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
