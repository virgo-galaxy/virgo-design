import { useCallback, useEffect, useRef, useState } from 'react';

import type { CopyToastState } from '@/components/feedback/CopyToast';
import { copyTextToClipboard } from '@/lib/clipboard';

const TOAST_DURATION_MS = 1800;

export function useCopyToast() {
  const [toast, setToast] = useState<CopyToastState | null>(null);
  const timerRef = useRef<number | null>(null);
  const nextIdRef = useRef(1);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const copy = useCallback(
    async (text: string, message: string) => {
      await copyTextToClipboard(text);

      clearTimer();

      setToast({
        id: nextIdRef.current,
        message,
      });

      nextIdRef.current += 1;

      timerRef.current = window.setTimeout(() => {
        setToast(null);
        timerRef.current = null;
      }, TOAST_DURATION_MS);
    },
    [clearTimer],
  );

  return {
    toast,
    copy,
  };
}
