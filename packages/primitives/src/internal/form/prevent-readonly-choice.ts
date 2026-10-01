import type { MouseEvent } from 'react';
/** Native checkbox/radio activation precedes click handlers. Restore after React's controlled reset and the browser's canceled activation. */
export function preventReadOnlyChoice(
  event: MouseEvent<HTMLInputElement>,
  checked: boolean | undefined,
) {
  const control = event.currentTarget;
  const previous = checked ?? !control.checked;
  event.preventDefault();
  queueMicrotask(() => {
    if (control.isConnected) control.checked = previous;
  });
}
