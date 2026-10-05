import { useContext, useEffect, useLayoutEffect, useRef } from 'react';

import { isEventOutsideLayerTree, isTopLayer, type OverlayLayer } from './layers';
import { PortalContainerContext } from './Portal';

type DismissReason = 'pointer' | 'focus' | 'escape';

export function useDismiss({
  open,
  layer,
  onDismiss,
  outsideFocus = true,
  escape = true,
}: {
  open: boolean;
  layer: OverlayLayer;
  onDismiss: (reason: DismissReason, event: PointerEvent | FocusEvent | KeyboardEvent) => void;
  outsideFocus?: boolean;
  escape?: boolean;
}) {
  const containerRef = useContext(PortalContainerContext);
  const callback = useRef(onDismiss);
  useLayoutEffect(() => {
    callback.current = onDismiss;
  }, [onDismiss]);
  useEffect(() => {
    if (!open) return;
    const doc = layer.contentRef.current?.ownerDocument ?? layer.triggerRef.current?.ownerDocument;
    if (!doc) return;
    const pointer = (event: PointerEvent) => {
      if (
        containerRef?.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      )
        return;
      if (isEventOutsideLayerTree(layer, event)) callback.current('pointer', event);
    };
    const focus = (event: FocusEvent) => {
      if (
        containerRef?.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      )
        return;
      if (outsideFocus && isEventOutsideLayerTree(layer, event)) callback.current('focus', event);
    };
    const key = (event: KeyboardEvent) => {
      if (
        containerRef?.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      )
        return;
      if (escape && isTopLayer(layer) && event.key === 'Escape' && !event.defaultPrevented) {
        event.stopPropagation();
        callback.current('escape', event);
        event.preventDefault();
      }
    };
    doc.addEventListener('pointerdown', pointer);
    doc.addEventListener('focusin', focus);
    doc.addEventListener('keydown', key);
    return () => {
      doc.removeEventListener('pointerdown', pointer);
      doc.removeEventListener('focusin', focus);
      doc.removeEventListener('keydown', key);
    };
  }, [open, outsideFocus, escape, layer, containerRef]);
}
