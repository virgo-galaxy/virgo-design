import { Button, Spinner } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SpinnerButtonExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [saving, setSaving] = useState(false);
  return (
    <div className={styles.root!}>
      <Button
        disabled={saving}
        aria-busy={saving}
        leadingIcon={saving ? <Spinner size="sm" /> : undefined}
        onClick={() => setSaving(true)}
      >
        {saving ? t('examples.spinner.details.saving') : t('examples.spinner.details.saveChanges')}
      </Button>
      {saving ? (
        <Button variant="text" onClick={() => setSaving(false)}>
          {t('examples.spinner.copy.finishDemoTask')}
        </Button>
      ) : null}
    </div>
  );
}
