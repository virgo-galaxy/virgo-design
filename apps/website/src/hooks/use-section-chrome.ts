import { useEffect, useState } from 'react';

interface SectionChromeState {
  activeSection: string;
  opacity: number;
}

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

function visibilityToOpacity(visibility: number): number {
  /*
   * During the hand-off between two
   * full-screen sections both are roughly
   * 50% visible. Chrome fades almost fully
   * away there, then returns once the next
   * section dominates the viewport.
   */
  return clamp((visibility - 0.48) / (0.82 - 0.48));
}

export function useSectionChrome(sectionIds: readonly string[]): SectionChromeState {
  const [state, setState] = useState<SectionChromeState>({
    activeSection: sectionIds[0] ?? '',
    opacity: 1,
  });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const viewportHeight = window.innerHeight;

      let bestSection = sectionIds[0] ?? '';

      let bestVisibility = 0;

      for (const id of sectionIds) {
        const element = document.getElementById(id);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();

        const visibleTop = Math.max(0, rect.top);

        const visibleBottom = Math.min(viewportHeight, rect.bottom);

        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        const referenceHeight = Math.min(rect.height, viewportHeight);

        const visibility = referenceHeight > 0 ? visibleHeight / referenceHeight : 0;

        if (visibility > bestVisibility) {
          bestVisibility = visibility;

          bestSection = id;
        }
      }

      setState({
        activeSection: bestSection,
        opacity: visibilityToOpacity(bestVisibility),
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
  }, [sectionIds]);

  return state;
}
