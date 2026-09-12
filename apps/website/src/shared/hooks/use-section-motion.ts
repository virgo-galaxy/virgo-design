import { type RefObject, useEffect, useState } from 'react';

export type SectionMotionMode = 'standard' | 'sticky';

export interface SectionMotion {
  enter: number;
  exit: number;
  presence: number;
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useSectionMotion(
  ref: RefObject<HTMLElement | null>,
  mode: SectionMotionMode = 'standard',
): SectionMotion {
  const [motion, setMotion] = useState<SectionMotion>({
    enter: 1,
    exit: 0,
    presence: 1,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setMotion({
        enter: 1,
        exit: 0,
        presence: 1,
      });
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
      const viewportHeight = Math.max(window.innerHeight, 1);

      const enter = clamp(
        (viewportHeight - rect.top) / (viewportHeight * (mode === 'sticky' ? 0.9 : 0.72)),
      );

      const exit =
        mode === 'sticky'
          ? clamp((viewportHeight * 1.2 - rect.bottom) / (viewportHeight * 0.2))
          : clamp((viewportHeight - rect.bottom) / (viewportHeight * 0.72));

      const presence = clamp(Math.min(enter, 1 - exit));

      setMotion((current) => {
        if (
          Math.abs(current.enter - enter) < 0.001 &&
          Math.abs(current.exit - exit) < 0.001 &&
          Math.abs(current.presence - presence) < 0.001
        ) {
          return current;
        }

        return {
          enter,
          exit,
          presence,
        };
      });
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
  }, [mode, ref]);

  return motion;
}
