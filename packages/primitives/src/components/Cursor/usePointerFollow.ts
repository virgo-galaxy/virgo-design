import { type CSSProperties, type RefObject, useEffect, useLayoutEffect, useRef } from 'react';

import {
  applyPortalEnvironment,
  observePortalEnvironment,
  readPortalEnvironment,
} from '../../internal/overlay/portalEnvironment';
import { type OverlayPlacement, positionOverlay } from '../../internal/overlay/positioning';
import type { CursorPointer } from './Cursor.types';

export const pointerFollowStyle: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: 0,
  visibility: 'hidden',
  pointerEvents: 'none',
  maxWidth: 'calc(100vw - 16px)',
  maxHeight: 'calc(100vh - 16px)',
};

/** Shared geometry/lifecycle only. Consumers own all material and connector styling. */
export function usePointerFollow({
  pointer,
  active,
  contentRef,
  anchorRef,
  placement = 'bottomLeft',
  offset = 18,
  offsetX = 12,
  decorative = false,
}: {
  pointer: CursorPointer | null;
  active: boolean;
  contentRef: RefObject<HTMLElement | null>;
  anchorRef: RefObject<HTMLElement | null>;
  placement?: OverlayPlacement | undefined;
  offset?: number | undefined;
  offsetX?: number | undefined;
  decorative?: boolean;
}) {
  const updateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const element = contentRef.current;
    const anchor = anchorRef.current;
    if (!active || !pointer || !element || !anchor) return;

    const doc = anchor.ownerDocument;
    const win = doc.defaultView!;
    let width = 0;
    let height = 0;
    let direction: 'ltr' | 'rtl' = 'ltr';

    const update = () => {
      const state = pointer.getSnapshot();
      const visible =
        state.active && state.visible && state.pointerType === 'mouse' && anchor.isConnected;
      element.style.visibility = visible ? 'visible' : 'hidden';
      element.setAttribute('aria-hidden', String(decorative || !visible));
      if (!visible) return;

      const result = positionOverlay(
        { left: state.x + offsetX, top: state.y, width: 0, height: 0 },
        { left: 0, top: 0, width, height },
        { width: doc.documentElement.clientWidth || win.innerWidth, height: win.innerHeight },
        placement,
        offset,
        direction,
      );
      // Individual translate composes with a consumer's enter/exit transform animation.
      element.style.translate = `${result.left}px ${result.top}px`;
      element.style.maxHeight = `${result.maxHeight}px`;
      element.style.setProperty('--overlay-arrow-x', `${result.arrowX}px`);
      element.style.setProperty('--overlay-arrow-y', `${result.arrowY}px`);
      element.style.setProperty('--pointer-anchor-x', `${state.x - result.left}px`);
      element.dataset.side = result.side;
      element.dataset.placement = result.placement;
    };

    const measure = () => {
      const rect = element.getBoundingClientRect();
      width = element.offsetWidth || rect.width;
      const viewport = element.querySelector<HTMLElement>('[data-overlay-viewport]');
      height = viewport
        ? Math.max(viewport.scrollHeight, viewport.offsetHeight) +
          (element.offsetHeight || rect.height) -
          viewport.offsetHeight
        : Math.max(element.scrollHeight, element.offsetHeight || rect.height);
      const environment = readPortalEnvironment(anchor);
      applyPortalEnvironment(element, environment);
      direction = environment.direction;
      update();
    };

    updateRef.current = measure;
    measure();

    const unsubscribe = pointer.subscribe(update);
    const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
    resize?.observe(element);
    const viewport = element.querySelector('[data-overlay-viewport]');
    if (viewport) resize?.observe(viewport);
    const contents = new MutationObserver(measure);
    contents.observe(element, { childList: true, subtree: true, characterData: true });
    const stopEnvironment = observePortalEnvironment(anchor, measure);
    win.addEventListener('resize', measure);

    return () => {
      updateRef.current = null;
      unsubscribe();
      resize?.disconnect();
      contents.disconnect();
      stopEnvironment();
      win.removeEventListener('resize', measure);
      element.style.removeProperty('translate');
      element.style.removeProperty('--pointer-anchor-x');
      element.style.visibility = 'hidden';
    };
  }, [pointer, active, contentRef, anchorRef, placement, offset, offsetX, decorative]);

  useLayoutEffect(() => {
    updateRef.current?.();
  });
}
