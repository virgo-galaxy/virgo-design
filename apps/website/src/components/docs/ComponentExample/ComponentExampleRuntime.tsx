import { Button } from '@virgo-design/ui';
import { type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import styles from './component-example.module.scss';
import {
  ComponentExampleRuntimeContext,
  type ComponentExampleRuntimeContextValue,
  type DisclosureUpdater,
} from './component-example-runtime-context';

export function ComponentExampleRuntimeProvider({ children }: { children: ReactNode }) {
  const [examples, setExamples] = useState<Record<string, boolean>>({});

  const register = useCallback((id: string) => {
    setExamples((current) => (Object.hasOwn(current, id) ? current : { ...current, [id]: false }));
  }, []);

  const unregister = useCallback((id: string) => {
    setExamples((current) => {
      if (!Object.hasOwn(current, id)) return current;
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);

  const setExampleOpen = useCallback((id: string, update: DisclosureUpdater) => {
    setExamples((current) => {
      // Ignore stale callbacks after an instance has unregistered.
      if (!Object.hasOwn(current, id)) return current;
      const previous = current[id]!;
      const nextValue = typeof update === 'function' ? update(previous) : update;

      if (current[id] === nextValue) return current;
      return { ...current, [id]: nextValue };
    });
  }, []);

  const setAllOpen = useCallback((open: boolean) => {
    setExamples((current) => {
      let changed = false;
      const next = Object.fromEntries(
        Object.entries(current).map(([id, value]) => {
          if (value !== open) changed = true;
          return [id, open];
        }),
      );
      return changed ? next : current;
    });
  }, []);

  const values = Object.values(examples);
  const count = values.length;
  const allOpen = count > 0 && values.every(Boolean);

  const value = useMemo<ComponentExampleRuntimeContextValue>(
    () => ({
      examples,
      register,
      unregister,
      setExampleOpen,
      setAllOpen,
      allOpen,
      count,
    }),
    [allOpen, count, examples, register, setAllOpen, setExampleOpen, unregister],
  );

  return (
    <ComponentExampleRuntimeContext.Provider value={value}>
      {children}
    </ComponentExampleRuntimeContext.Provider>
  );
}

export function ComponentExampleRuntimeControl() {
  const runtime = useContext(ComponentExampleRuntimeContext);

  if (!runtime) return null;

  const label = runtime.allOpen ? 'Collapse all' : 'Expand all';

  return (
    <Button
      className={styles.runtimeControl}
      data-example-runtime-control=""
      size="small"
      variant="text"
      type="button"
      aria-expanded={runtime.allOpen}
      disabled={runtime.count === 0}
      onClick={() => runtime.setAllOpen(!runtime.allOpen)}
    >
      {label}
    </Button>
  );
}
