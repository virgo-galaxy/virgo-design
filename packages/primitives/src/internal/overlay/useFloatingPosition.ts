import { type CSSProperties, type RefObject, useLayoutEffect, useState } from 'react';

import { type OverlayPlacement, positionOverlay } from './positioning';

export function useFloatingPosition({
  active,
  triggerRef,
  contentRef,
  placement,
  offset,
}: {
  active: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  placement: OverlayPlacement;
  offset: number;
}) {
  const [position, setPosition] = useState<ReturnType<typeof positionOverlay> | null>(null);
  const [theme, setTheme] = useState<string | undefined>();
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [triggerWidth, setTriggerWidth] = useState(0);
  useLayoutEffect(() => {
    if (!active) {
      setPosition(null);
      return;
    }
    const anchor = triggerRef.current;
    const content = contentRef.current;
    if (!anchor || !content) return;
    const update = () => {
      const dir = getComputedStyle(anchor).direction === 'rtl' ? 'rtl' : 'ltr';
      setDirection(dir);
      setTheme(anchor.closest('[data-theme]')?.getAttribute('data-theme') ?? undefined);
      const anchorRect = anchor.getBoundingClientRect();
      const rect = content.getBoundingClientRect();
      // Layout dimensions stay stable while a panel's enter/exit transform is scaling it.
      const width = content.offsetWidth || rect.width;
      const contentHeight = content.offsetHeight || rect.height;
      const viewport = content.querySelector<HTMLElement>('[data-overlay-viewport]');
      // Use natural content height to avoid flip/resize oscillation after constraining a tall panel.
      const height = viewport
        ? Math.min(
            Number.parseFloat(getComputedStyle(viewport).maxHeight) || Infinity,
            viewport.scrollHeight,
          ) +
          contentHeight -
          (viewport.offsetHeight || viewport.getBoundingClientRect().height)
        : Math.max(contentHeight, content.scrollHeight);
      const next = positionOverlay(
        anchorRect,
        { width, height, top: rect.top, left: rect.left },
        {
          width: document.documentElement.clientWidth || window.innerWidth,
          height: window.innerHeight,
        },
        placement,
        offset,
        dir,
      );
      setTriggerWidth(anchorRect.width);
      setPosition((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    };
    update();
    const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
    resize?.observe(anchor);
    resize?.observe(content);
    const viewport = content.querySelector('[data-overlay-viewport]');
    if (viewport) resize?.observe(viewport);
    const themeObserver = new MutationObserver(update);
    for (let node: HTMLElement | null = anchor; node; node = node.parentElement) {
      themeObserver.observe(node, {
        attributes: true,
        attributeFilter: ['data-theme', 'dir', 'class', 'style'],
      });
    }
    const contentsObserver = new MutationObserver(update);
    contentsObserver.observe(content, { childList: true, subtree: true, characterData: true });
    window.addEventListener('resize', update);
    document.addEventListener('scroll', update, true);
    return () => {
      resize?.disconnect();
      themeObserver.disconnect();
      contentsObserver.disconnect();
      window.removeEventListener('resize', update);
      document.removeEventListener('scroll', update, true);
    };
  }, [active, triggerRef, contentRef, placement, offset]);
  const style = {
    position: 'fixed',
    left: position?.left ?? 0,
    top: position?.top ?? 0,
    maxWidth: 'calc(100vw - 16px)',
    maxHeight: position?.maxHeight ?? 'calc(100vh - 16px)',
    visibility: position ? 'visible' : 'hidden',
    '--overlay-arrow-x': `${position?.arrowX ?? 0}px`,
    '--overlay-arrow-y': `${position?.arrowY ?? 0}px`,
    '--overlay-trigger-width': `${triggerWidth}px`,
  } as CSSProperties;
  return {
    style,
    theme,
    direction,
    positioned: position !== null,
    referenceHidden: position?.referenceHidden ?? false,
    placement: position?.placement ?? placement,
    side: position?.side,
  };
}
