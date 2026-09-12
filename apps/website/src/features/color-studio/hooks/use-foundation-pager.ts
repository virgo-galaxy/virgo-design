import { type RefObject, useEffect, useRef } from 'react';

import type { FoundationPage } from '../model/types';

interface UseFoundationPagerOptions {
  ref: RefObject<HTMLElement | null>;
  page: FoundationPage;
  onPageChange: (page: FoundationPage) => void;
}

const HORIZONTAL_THRESHOLD = 72;
const RELEASE_DELAY = 260;

export function useFoundationPager({ ref, page, onPageChange }: UseFoundationPagerOptions) {
  const accumulated = useRef(0);
  const locked = useRef(false);
  const releaseTimer = useRef<number | null>(null);
  const pageRef = useRef(page);
  const onPageChangeRef = useRef(onPageChange);

  useEffect(() => {
    pageRef.current = page;
    onPageChangeRef.current = onPageChange;
  }, [onPageChange, page]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const release = () => {
      accumulated.current = 0;
      locked.current = false;
      releaseTimer.current = null;
    };

    const scheduleRelease = () => {
      if (releaseTimer.current !== null) {
        window.clearTimeout(releaseTimer.current);
      }

      releaseTimer.current = window.setTimeout(release, RELEASE_DELAY);
    };

    const onWheel = (event: WheelEvent) => {
      const deltaX = event.shiftKey && Math.abs(event.deltaX) < 1 ? event.deltaY : event.deltaX;
      const horizontal = Math.abs(deltaX);
      const vertical = Math.abs(event.deltaY);

      if (horizontal < 4 || horizontal <= vertical * 1.08) {
        return;
      }

      event.preventDefault();
      scheduleRelease();

      if (locked.current) {
        return;
      }

      accumulated.current += deltaX;

      if (Math.abs(accumulated.current) < HORIZONTAL_THRESHOLD) {
        return;
      }

      const nextPage: FoundationPage = accumulated.current > 0 ? 'brand-neutral' : 'chromatic';

      locked.current = true;

      if (nextPage !== pageRef.current) {
        onPageChangeRef.current(nextPage);
      }

      accumulated.current = 0;
    };

    element.addEventListener('wheel', onWheel, {
      passive: false,
    });

    return () => {
      element.removeEventListener('wheel', onWheel);

      if (releaseTimer.current !== null) {
        window.clearTimeout(releaseTimer.current);
      }

      accumulated.current = 0;
      locked.current = false;
      releaseTimer.current = null;
    };
  }, [ref]);
}
