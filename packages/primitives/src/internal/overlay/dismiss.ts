import {
  createContext,
  type RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

type Layer = {
  parent: Layer | null;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
};
type DismissReason = 'pointer' | 'focus' | 'escape';
export const DismissScope = createContext<Layer | null>(null);
const layersByDocument = new WeakMap<Document, Layer[]>();

function descendsFrom(layer: Layer, parent: Layer): boolean {
  return layer.parent !== null && (layer.parent === parent || descendsFrom(layer.parent, parent));
}

export function hasLayerFocus(layer: Layer) {
  const doc = layer.triggerRef.current?.ownerDocument;
  if (!doc) return false;
  if (layer.contentRef.current?.contains(doc.activeElement)) return true;
  return (layersByDocument.get(doc) ?? []).some(
    (child) =>
      descendsFrom(child, layer) &&
      [child.triggerRef.current, child.contentRef.current].some((node) =>
        node?.contains(doc.activeElement),
      ),
  );
}

export function useDismiss({
  open,
  triggerRef,
  contentRef,
  onDismiss,
  outsideFocus = true,
  escape = true,
}: {
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  onDismiss: (reason: DismissReason) => void;
  outsideFocus?: boolean;
  escape?: boolean;
}) {
  const parent = useContext(DismissScope);
  const layer = useMemo(
    () => ({ parent, triggerRef, contentRef }),
    [parent, triggerRef, contentRef],
  );
  const callback = useRef(onDismiss);
  useLayoutEffect(() => {
    callback.current = onDismiss;
  }, [onDismiss]);
  useEffect(() => {
    if (!open) return;
    const doc = triggerRef.current?.ownerDocument ?? document;
    const layers = layersByDocument.get(doc) ?? [];
    layersByDocument.set(doc, layers);
    // Child effects can mount first. Keep descendants above their parent regardless of effect order.
    const childIndex = layers.findIndex((candidate) => descendsFrom(candidate, layer));
    layers.splice(childIndex < 0 ? layers.length : childIndex, 0, layer);
    const isTop = () => layers.at(-1) === layer;
    const outside = (event: Event) => {
      if (!(event.target instanceof Node)) return false;
      const path = event.composedPath();
      // Portalled descendants belong to the parent's interaction area. An outside click can
      // dismiss all affected ancestors, while Escape is reserved for the topmost layer.
      return !layers.some(
        (candidate) =>
          (candidate === layer || descendsFrom(candidate, layer)) &&
          [candidate.triggerRef.current, candidate.contentRef.current].some(
            (node) => node && (node.contains(event.target as Node) || path.includes(node)),
          ),
      );
    };
    const pointer = (event: PointerEvent) => {
      if (outside(event)) callback.current('pointer');
    };
    const focus = (event: FocusEvent) => {
      if (outsideFocus && outside(event)) callback.current('focus');
    };
    const key = (event: KeyboardEvent) => {
      if (escape && isTop() && event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        event.stopPropagation();
        callback.current('escape');
      }
    };
    doc.addEventListener('pointerdown', pointer);
    doc.addEventListener('focusin', focus);
    doc.addEventListener('keydown', key);
    return () => {
      const index = layers.indexOf(layer);
      if (index !== -1) layers.splice(index, 1);
      doc.removeEventListener('pointerdown', pointer);
      doc.removeEventListener('focusin', focus);
      doc.removeEventListener('keydown', key);
      if (!layers.length) layersByDocument.delete(doc);
    };
  }, [open, triggerRef, contentRef, outsideFocus, escape, layer]);
  return layer;
}
