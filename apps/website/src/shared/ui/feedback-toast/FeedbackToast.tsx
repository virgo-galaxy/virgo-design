import { Toast, type ToastIntent } from '@virgo-design/ui';

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
      <Toast.Viewport placement="top-center" className={styles.viewport} />
    </Toast.Provider>
  );
}
