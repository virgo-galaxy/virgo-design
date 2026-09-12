import { createPortal } from 'react-dom';

import type { CopyToastState } from '@/shared/hooks/use-copy-toast';

import styles from './copy-toast.module.scss';

interface CopyToastProps {
  toast: CopyToastState | null;
}

export function CopyToast({ toast }: CopyToastProps) {
  if (!toast || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M4 8.2 6.7 11 12 5.5" />
        </svg>
      </span>

      <span>{toast.message}</span>
    </div>,
    document.body,
  );
}
