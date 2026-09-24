import { useEffect, useLayoutEffect, useRef } from 'react';

import { isEventOutsideLayerTree, isTopLayer, type OverlayLayer } from './layers';

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
  const callback = useRef(onDismiss);
  useLayoutEffect(() => {
    callback.current = onDismiss;
  }, [onDismiss]);
  useEffect(() => {
    if (!open) return;
    const doc = layer.contentRef.current?.ownerDocument ?? layer.triggerRef.current?.ownerDocument;
    if (!doc) return;
    const pointer = (event: PointerEvent) => {
      if (isEventOutsideLayerTree(layer, event)) callback.current('pointer', event);
    };
    const focus = (event: FocusEvent) => {
      if (outsideFocus && isEventOutsideLayerTree(layer, event)) callback.current('focus', event);
    };
    const key = (event: KeyboardEvent) => {
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
  }, [open, outsideFocus, escape, layer]);
}
