import { Button, Toast } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ToastUndoExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [archived, setArchived] = useState(false);
  return (
    <Toast.Provider hotkey={[]}>
      <div className={styles.root!}>
        <Button
          onClick={() => {
            setArchived(true);
            setOpen(true);
          }}
        >
          {t('examples.toast.copy.archiveWithUndo')}
        </Button>
        <span role="status">
          {archived
            ? t('examples.toast.details.documentIsArchived')
            : t('examples.toast.details.documentIsInYourWorkspace')}
        </span>
        <Toast.Viewport
          aria-label={t('examples.toast.copy.archiveNotifications')}
          className={styles.viewport!}
        />
      </div>
      <Toast.Root open={open} onOpenChange={setOpen} intent="success" duration={5000}>
        <Toast.Title>{t('examples.toast.copy.documentArchived')}</Toast.Title>
        <Toast.Description>{t('examples.toast.copy.youCanUndoThisAction')}</Toast.Description>
        <Toast.Action onClick={() => setArchived(false)}>
          {t('examples.toast.copy.undo')}
        </Toast.Action>
        <Toast.Close aria-label={t('examples.toast.copy.dismissNotification')} />
      </Toast.Root>
    </Toast.Provider>
  );
}
