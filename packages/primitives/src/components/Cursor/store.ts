import type { CursorSnapshot } from './Cursor.types';

export function createPointerStore() {
  let snapshot: CursorSnapshot = {
    x: 0,
    y: 0,
    active: false,
    visible: false,
    pointerType: '',
    buttons: 0,
  };
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
    update: (next: CursorSnapshot) => {
      if (
        Object.keys(next).every(
          (key) => next[key as keyof CursorSnapshot] === snapshot[key as keyof CursorSnapshot],
        )
      )
        return;

      snapshot = next;
      listeners.forEach((listener) => listener());
    },
  };
}
