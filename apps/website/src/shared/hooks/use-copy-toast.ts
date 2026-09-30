import type { ParseKeys } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { copyTextToClipboard } from '@/shared/lib/clipboard';

const TOAST_DURATION_MS = 1800;

export interface CopyToastState {
  id: number;
  message: string;
}

export function useCopyToast() {
  const { t } = useTranslation();
  const [message, setToast] = useState<{
    id: number;
    key: ParseKeys;
    values: Record<string, string>;
  } | null>(null);
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
    async (text: string, key: ParseKeys, values: Record<string, string>) => {
      await copyTextToClipboard(text);

      clearTimer();

      setToast({
        id: nextIdRef.current,
        key,
        values,
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
    toast: message ? { id: message.id, message: t(message.key as never, message.values) } : null,
    copy,
  };
}
