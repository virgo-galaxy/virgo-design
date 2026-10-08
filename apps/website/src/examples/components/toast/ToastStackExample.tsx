import { Button, Toast } from '@virgo-design/ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ToastStackExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [toasts, setToasts] = useState<number[]>([]);
  const nextId = useRef(1);
  return (
    <Toast.Provider hotkey={[]}>
      <div className={styles.root!}>
        <Button
          onClick={() => {
            const first = nextId.current;
            nextId.current += 2;
            setToasts((current) => [...current, first, first + 1]);
          }}
        >
          {t('examples.toast.copy.addTwoToasts')}
        </Button>
        <Toast.Viewport
          portal={false}
          aria-label={t('examples.toast.copy.stackedNotifications')}
          className={styles.viewport!}
        />
      </div>
      {toasts.map((id) => (
        <Toast.Root
          key={id}
          intent={id % 2 ? 'info' : 'warning'}
          duration={5000}
          onOpenChange={(open) => {
            if (!open) setToasts((current) => current.filter((value) => value !== id));
          }}
        >
          <Toast.Title>
            {t('examples.toast.copy.notification')} {id}
          </Toast.Title>
          <Toast.Description>
            {t('examples.toast.copy.hoverOrFocusToPauseItsTimer')}
          </Toast.Description>
          <Toast.Close aria-label={t('examples.toast.copy.dismissNotification')} />
        </Toast.Root>
      ))}
    </Toast.Provider>
  );
}
