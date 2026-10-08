import { Button, Toast, type ToastIntent } from '@virgo-design/ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ToastIntentsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [toasts, setToasts] = useState<Array<{ id: number; intent: ToastIntent }>>([]);
  const nextId = useRef(1);
  const addToast = (intent: ToastIntent) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, intent }]);
  };
  // This local demo opts out of the document-wide F8 shortcut.
  return (
    <Toast.Provider hotkey={[]}>
      <div className={styles.root!}>
        <div className={styles.stage!}>
          {(['default', 'success', 'warning', 'error', 'info'] as const).map((intent) => (
            <Button key={intent} variant="outline" onClick={() => addToast(intent)}>
              {t('examples.toast.copy.show')} {intent}
            </Button>
          ))}
        </div>
        <Toast.Viewport
          portal={false}
          aria-label={t('examples.toast.copy.statusNotifications')}
          className={styles.viewport!}
        />
      </div>
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          intent={toast.intent}
          duration={5000}
          onOpenChange={(open) => {
            if (!open) setToasts((current) => current.filter((item) => item.id !== toast.id));
          }}
        >
          <Toast.Title>
            {toast.intent === 'default' ? t('examples.toast.details.notification') : toast.intent}
          </Toast.Title>
          <Toast.Description>
            {t('examples.toast.copy.notification')} {toast.id}{' '}
            {t('examples.toast.copy.usesSemanticStatusTokens')}
          </Toast.Description>
          <Toast.Close aria-label={t('examples.toast.copy.dismissNotification')} />
        </Toast.Root>
      ))}
    </Toast.Provider>
  );
}
