import { useEffect, useRef, useState } from 'react';

export type SourceCopyState = 'idle' | 'pending' | 'success' | 'error';

async function writeClipboard(source: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText)
    throw new Error('Clipboard is unavailable.');
  await navigator.clipboard.writeText(source);
}

export function useSourceCopy(source: string, write = writeClipboard) {
  const [state, setState] = useState<SourceCopyState>('idle');
  const mounted = useRef(true);
  const copying = useRef(false);
  const sequence = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);
  const reset = () => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
    sequence.current += 1;
    copying.current = false;
    setState('idle');
  };
  const copy = async () => {
    if (copying.current) return;
    copying.current = true;
    const current = ++sequence.current;
    if (timer.current !== null) clearTimeout(timer.current);
    setState('pending');
    try {
      await write(source);
      if (!mounted.current || current !== sequence.current) return;
      setState('success');
      timer.current = setTimeout(() => {
        timer.current = null;
        if (mounted.current) setState('idle');
      }, 2000);
    } catch {
      if (mounted.current && current === sequence.current) setState('error');
    } finally {
      if (current === sequence.current) copying.current = false;
    }
  };
  return { state, copy, reset };
}
