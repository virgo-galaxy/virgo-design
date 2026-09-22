import { type RefObject, useLayoutEffect, useState } from 'react';

function milliseconds(duration: string) {
  return duration.endsWith('ms') ? Number.parseFloat(duration) : Number.parseFloat(duration) * 1000;
}

/** Keep closing content only for its CSS exit animation; reduced motion / unstyled content exits immediately. */
export function usePresence(open: boolean, ref: RefObject<HTMLElement | null>) {
  const [retained, setRetained] = useState(open);
  useLayoutEffect(() => {
    const content = ref.current;
    if (open) {
      content?.removeAttribute('inert');
      setRetained(true);
      return;
    }
    content?.setAttribute('inert', '');
    const style = content ? getComputedStyle(content) : null;
    const duration =
      style?.animationName && style.animationName !== 'none'
        ? Math.max(...style.animationDuration.split(',').map(milliseconds)) +
          Math.max(0, ...style.animationDelay.split(',').map(milliseconds))
        : 0;
    if (!duration || !Number.isFinite(duration)) {
      setRetained(false);
      return;
    }
    const timer = setTimeout(() => setRetained(false), duration);
    return () => clearTimeout(timer);
  }, [open, ref]);
  return open || retained;
}
