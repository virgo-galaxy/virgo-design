import { type CSSProperties, type RefObject, useContext, useLayoutEffect, useState } from 'react';

import { LayerScope } from './layers';
import { PortalContainerContext } from './Portal';
import {
  observePortalEnvironment,
  type PortalEnvironment,
  readPortalEnvironment,
  samePortalEnvironment,
} from './portalEnvironment';
import { getArrowInset, type OverlayPlacement, positionOverlay } from './positioning';

export function useFloatingPosition({
  active,
  triggerRef,
  contentRef,
  placement,
  offset,
  anchorRect,
}: {
  active: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  placement: OverlayPlacement;
  offset: number;
  /** Optional virtual anchor; the trigger still supplies theme, direction and document. */
  anchorRect?: { left: number; top: number; width: number; height: number };
}) {
  const layer = useContext(LayerScope);
  const containerRef = useContext(PortalContainerContext);

  let depth = 0;
  for (let current = layer?.parent; current; current = current.parent) depth++;

  const [position, setPosition] = useState<ReturnType<typeof positionOverlay> | null>(null);
  const [environment, setEnvironment] = useState<PortalEnvironment>({
    theme: undefined,
    themeStyle: undefined,
    direction: 'ltr',
  });
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
      const nextEnvironment = readPortalEnvironment(anchor);
      setEnvironment((previous) =>
        samePortalEnvironment(previous, nextEnvironment) ? previous : nextEnvironment,
      );

      const container = containerRef?.current;
      const bounds = container?.getBoundingClientRect();
      const scaleX = container && bounds ? bounds.width / container.offsetWidth || 1 : 1;
      const scaleY = container && bounds ? bounds.height / container.offsetHeight || 1 : 1;
      const reference = anchorRect ?? anchor.getBoundingClientRect();
      const referenceRect =
        container && bounds
          ? {
              left:
                (reference.left - bounds.left) / scaleX +
                container.scrollLeft -
                container.clientLeft,
              top:
                (reference.top - bounds.top) / scaleY + container.scrollTop - container.clientTop,
              width: reference.width / scaleX,
              height: reference.height / scaleY,
            }
          : reference;

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

      const arrow = content.querySelector<HTMLElement>(':scope > [data-slot="arrow"]');
      const panelStyle = getComputedStyle(content);
      const cornerRadius = Math.max(
        ...[
          panelStyle.borderTopLeftRadius,
          panelStyle.borderTopRightRadius,
          panelStyle.borderBottomLeftRadius,
          panelStyle.borderBottomRightRadius,
        ].map((radius) => Number.parseFloat(radius) || 0),
      );
      const borderWidth = Math.max(
        ...[
          panelStyle.borderTopWidth,
          panelStyle.borderRightWidth,
          panelStyle.borderBottomWidth,
          panelStyle.borderLeftWidth,
        ].map((border) => Number.parseFloat(border) || 0),
      );

      let arrowInset = 20;
      if (arrow) {
        const arrowSize = Math.max(arrow.offsetWidth, arrow.offsetHeight);
        const arrowStyle = getComputedStyle(arrow);
        const horizontal = placement.startsWith('left') || placement.startsWith('right');
        const rootDepthScale = horizontal
          ? Number.parseFloat(
              arrowStyle.getPropertyValue('--overlay-arrow-inline-root-depth-scale'),
            ) || 0
          : 0;
        const rootHalfSizeScale = horizontal
          ? Number.parseFloat(
              arrowStyle.getPropertyValue('--overlay-arrow-inline-root-half-size-scale'),
            ) || 0
          : 0;
        arrowInset = getArrowInset(
          cornerRadius,
          borderWidth,
          arrowSize * (rootHalfSizeScale || 0.5),
          arrowSize * rootDepthScale,
        );
      }

      const next = positionOverlay(
        referenceRect,
        { width, height, top: rect.top, left: rect.left },
        {
          width:
            container?.clientWidth || document.documentElement.clientWidth || window.innerWidth,
          height: container?.clientHeight || window.innerHeight,
        },
        placement,
        offset,
        nextEnvironment.direction,
        Boolean(arrow) && content.getAttribute('data-pointer-follow') !== 'true',
        arrowInset,
      );
      // Absolute arrow coordinates start inside the panel border, unlike viewport coordinates.
      next.arrowX -= content.clientLeft;
      next.arrowY -= content.clientTop;
      setTriggerWidth(referenceRect.width);
      setPosition((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    };

    update();

    const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
    resize?.observe(anchor);
    resize?.observe(content);
    if (containerRef?.current) resize?.observe(containerRef.current);
    const viewport = content.querySelector('[data-overlay-viewport]');
    if (viewport) resize?.observe(viewport);

    const stopObservingEnvironment = observePortalEnvironment(anchor, update);
    const contentsObserver = new MutationObserver(update);
    contentsObserver.observe(content, { childList: true, subtree: true, characterData: true });
    // An ancestor's slide-in transform moves an anchor without resizing it.
    const updateAfterMotion = (event: Event) => {
      if (event.target instanceof Element && event.target.contains(anchor)) update();
    };
    window.addEventListener('resize', update);
    document.addEventListener('scroll', update, true);
    document.addEventListener('animationend', updateAfterMotion, true);
    document.addEventListener('transitionend', updateAfterMotion, true);

    return () => {
      resize?.disconnect();
      stopObservingEnvironment();
      contentsObserver.disconnect();
      window.removeEventListener('resize', update);
      document.removeEventListener('scroll', update, true);
      document.removeEventListener('animationend', updateAfterMotion, true);
      document.removeEventListener('transitionend', updateAfterMotion, true);
    };
  }, [active, triggerRef, contentRef, placement, offset, anchorRect, containerRef]);

  const style = {
    position: containerRef ? 'absolute' : 'fixed',
    '--vd-overlay-layer': `calc(var(--vd-overlay-base-layer, 100) + ${depth})`,
    left: position?.left ?? 0,
    top: position?.top ?? 0,
    maxWidth: containerRef?.current
      ? `${containerRef.current.clientWidth - 16}px`
      : 'calc(100vw - 16px)',
    maxHeight: position?.maxHeight ?? 'calc(100vh - 16px)',
    visibility: position ? 'visible' : 'hidden',
    '--overlay-arrow-x': `${position?.arrowX ?? 0}px`,
    '--overlay-arrow-y': `${position?.arrowY ?? 0}px`,
    '--overlay-trigger-width': `${triggerWidth}px`,
  } as CSSProperties;

  return {
    style,
    ...environment,
    positioned: position !== null,
    referenceHidden: position?.referenceHidden ?? false,
    placement: position?.placement ?? placement,
    side: position?.side,
  };
}
