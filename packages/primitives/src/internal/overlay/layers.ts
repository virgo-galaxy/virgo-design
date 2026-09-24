import { createContext, type RefObject, useContext, useLayoutEffect, useMemo } from 'react';

export type OverlayLayer = {
  parent: OverlayLayer | null;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  branches: Set<HTMLElement>;
};

export const LayerScope = createContext<OverlayLayer | null>(null);

const layersByDocument = new WeakMap<Document, OverlayLayer[]>();
const listenersByDocument = new WeakMap<Document, Set<() => void>>();

export function isDescendantLayer(layer: OverlayLayer, parent: OverlayLayer): boolean {
  return (
    layer.parent !== null && (layer.parent === parent || isDescendantLayer(layer.parent, parent))
  );
}

function getLayerDocument(layer: OverlayLayer) {
  return layer.contentRef.current?.ownerDocument ?? layer.triggerRef.current?.ownerDocument ?? null;
}

function notifyLayerChange(doc: Document) {
  for (const listener of listenersByDocument.get(doc) ?? []) listener();
}

export function subscribeToLayerChanges(doc: Document, listener: () => void) {
  const listeners = listenersByDocument.get(doc) ?? new Set();
  listenersByDocument.set(doc, listeners);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) listenersByDocument.delete(doc);
  };
}

export function useOverlayLayer(
  triggerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
) {
  const parent = useContext(LayerScope);
  return useMemo<OverlayLayer>(
    () => ({ parent, triggerRef, contentRef, branches: new Set() }),
    [parent, triggerRef, contentRef],
  );
}

export function useLayerRegistration(layer: OverlayLayer, active: boolean) {
  useLayoutEffect(() => {
    if (!active) return;
    const doc = getLayerDocument(layer);
    if (!doc) return;
    const layers = layersByDocument.get(doc) ?? [];
    layersByDocument.set(doc, layers);
    // Descendant effects can mount before parent effects. Keep descendants above their parent.
    const childIndex = layers.findIndex((candidate) => isDescendantLayer(candidate, layer));
    layers.splice(childIndex < 0 ? layers.length : childIndex, 0, layer);
    notifyLayerChange(doc);
    return () => {
      const index = layers.indexOf(layer);
      if (index !== -1) layers.splice(index, 1);
      if (!layers.length) layersByDocument.delete(doc);
      notifyLayerChange(doc);
    };
  }, [active, layer]);
}

export function useLayerBranch(
  layer: OverlayLayer,
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!active || !node) return;
    layer.branches.add(node);
    const doc = node.ownerDocument;
    notifyLayerChange(doc);
    return () => {
      layer.branches.delete(node);
      notifyLayerChange(doc);
    };
  }, [active, layer, ref]);
}

function layersInTree(layer: OverlayLayer) {
  const doc = getLayerDocument(layer);
  const layers = doc ? (layersByDocument.get(doc) ?? []) : [];
  return [layer, ...layers.filter((candidate) => isDescendantLayer(candidate, layer))];
}

export function isTopLayer(layer: OverlayLayer) {
  const doc = getLayerDocument(layer);
  return Boolean(doc && layersByDocument.get(doc)?.at(-1) === layer);
}

export function isEventOutsideLayerTree(layer: OverlayLayer, event: Event) {
  if (!(event.target instanceof Node)) return false;
  const path = event.composedPath();
  return !layersInTree(layer).some((candidate) =>
    [candidate.triggerRef.current, candidate.contentRef.current].some(
      (node) => node && (node.contains(event.target as Node) || path.includes(node)),
    ),
  );
}

export function hasLayerFocus(layer: OverlayLayer) {
  const doc = getLayerDocument(layer);
  if (!doc) return false;
  return layersInTree(layer).some((candidate) =>
    [candidate.triggerRef.current, candidate.contentRef.current].some((node) =>
      node?.contains(doc.activeElement),
    ),
  );
}

export function containsFocusInLayerContentTree(layer: OverlayLayer, node: Node | null) {
  return Boolean(
    node && layersInTree(layer).some((candidate) => candidate.contentRef.current?.contains(node)),
  );
}

export function getLayerBranches(layer: OverlayLayer) {
  return layersInTree(layer).flatMap((candidate) => [
    ...(candidate.contentRef.current ? [candidate.contentRef.current] : []),
    ...candidate.branches,
  ]);
}
