import { type RefObject, useEffect, useState } from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function useGalleryProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const element = ref.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
       * 0: section is just below the viewport.
       * 1: section reaches the top of the viewport.
       */
      const nextProgress = clamp((viewportHeight - rect.top) / viewportHeight);

      setProgress(nextProgress);
    };

    const scheduleUpdate = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener('scroll', scheduleUpdate, {
      passive: true,
    });

    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [ref]);

  return progress;
}
