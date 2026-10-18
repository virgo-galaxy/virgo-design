import { useEffect, useRef, useState } from 'react';

export function useCopyFeedback(value: string) {
  const [feedback, setFeedback] = useState<{ value: string; state: 'copied' | 'error' } | null>(
    null,
  );
  const request = useRef(0);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const state = feedback?.value === value ? feedback.state : 'idle';

  useEffect(
    () => () => {
      request.current += 1;
      busy.current = false;
      clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    if (busy.current) return;

    busy.current = true;
    const id = ++request.current;
    clearTimeout(timer.current);
    setFeedback(null);

    let next: 'copied' | 'error';

    try {
      await navigator.clipboard.writeText(value);
      next = 'copied';
    } catch {
      next = 'error';
    }

    if (id !== request.current) return;

    busy.current = false;
    setFeedback({ value, state: next });
    timer.current = setTimeout(() => setFeedback(null), 2000);
  };

  return { state, copy };
}
