import { LayoutIcon } from '@virgo-design/icons';
import { Button, Empty } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './EmptyActionExample.module.scss';

export default function App() {
  const [created, setCreated] = useState(false);
  return created ? (
    <div className={styles.root!}>
      <p role="status">Document created.</p>
      <Button variant="outline" onClick={() => setCreated(false)}>
        Reset example
      </Button>
    </div>
  ) : (
    <Empty aria-label="Documents empty state">
      <Empty.Icon>
        <LayoutIcon />
      </Empty.Icon>
      <Empty.Title>No documents</Empty.Title>
      <Empty.Description>Create your first document to get started.</Empty.Description>
      <Empty.Action>
        <Button onClick={() => setCreated(true)}>Create document</Button>
      </Empty.Action>
    </Empty>
  );
}
