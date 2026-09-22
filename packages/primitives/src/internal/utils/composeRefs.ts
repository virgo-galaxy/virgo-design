import type { ForwardedRef, MutableRefObject } from 'react';

export function composeRefs<T>(
  forwardedRef: ForwardedRef<T>,
  internalRef: MutableRefObject<T | null>,
) {
  return (node: T | null) => {
    internalRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };
}
