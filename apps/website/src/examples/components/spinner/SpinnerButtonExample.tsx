import { Button, Spinner } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [saving, setSaving] = useState(false);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
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
