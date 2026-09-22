import { useCallback, useEffect, useRef } from 'react';

export function useHoverIntent(enabled: boolean, onClose: () => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const scheduleClose = () => {
    if (!enabled) return;
    cancelClose();
    timer.current = setTimeout(onClose, 150);
  };
  useEffect(() => cancelClose, [cancelClose]);
  useEffect(() => {
    if (!enabled) cancelClose();
  }, [enabled, cancelClose]);
  return { cancelClose, scheduleClose };
}
