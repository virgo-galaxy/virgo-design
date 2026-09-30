import { Toast, type ToastIntent } from '@virgo-design/ui';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import styles from './feedback-toast.module.scss';

export function FeedbackToast({
  message,
  intent = 'success',
  duration = 1800,
  onOpenChange,
}: {
  message: string;
  intent?: ToastIntent;
  duration?: number;
  onOpenChange?: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  return (
    <Toast.Provider hotkey={[]}>
      <Toast.Root
        appearance="compact"
        intent={intent}
        duration={duration}
        {...(onOpenChange ? { onOpenChange } : {})}
      >
        <Toast.Title>{message}</Toast.Title>
      </Toast.Root>
      {typeof document !== 'undefined' &&
        createPortal(
          <Toast.Viewport
            placement="top-center"
            aria-label={t('shared.controls.notifications')}
            className={styles.viewport}
          />,
          document.body,
        )}
    </Toast.Provider>
  );
}
