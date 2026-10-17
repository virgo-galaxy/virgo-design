import type { Ref } from 'react';

function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') return ref(node);
  if (ref) ref.current = node;
}

export function composeRefs<T>(first: Ref<T> | undefined, second: Ref<T> | undefined) {
  return (node: T | null) => {
    const firstCleanup = assignRef(first, node);
    const secondCleanup = assignRef(second, node);

    if (typeof firstCleanup === 'function' || typeof secondCleanup === 'function') {
      return () => {
        if (typeof firstCleanup === 'function') firstCleanup();
        else assignRef(first, null);

        if (typeof secondCleanup === 'function') secondCleanup();
        else assignRef(second, null);
      };
    }
  };
}
