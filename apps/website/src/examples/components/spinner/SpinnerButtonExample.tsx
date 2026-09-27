import { Button, Spinner } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './SpinnerButtonExample.module.scss';

export default function App() {
  const [saving, setSaving] = useState(false);
  return (
    <div className={styles.root!}>
      <Button
        disabled={saving}
        aria-busy={saving}
        leadingIcon={saving ? <Spinner size="sm" /> : undefined}
        onClick={() => setSaving(true)}
      >
        {saving ? 'Saving' : 'Save changes'}
      </Button>
      {saving ? (
        <Button variant="text" onClick={() => setSaving(false)}>
          Finish demo task
        </Button>
      ) : null}
    </div>
  );
}
