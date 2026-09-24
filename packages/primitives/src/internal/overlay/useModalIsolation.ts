import { useLayoutEffect } from 'react';

import {
  getLayerBranches,
  isDescendantLayer,
  type OverlayLayer,
  subscribeToLayerChanges,
} from './layers';

type IsolationScope = { layer: OverlayLayer };
type IsolationManager = {
  scopes: IsolationScope[];
  originalInert: Map<HTMLElement, boolean>;
  observer: MutationObserver | null;
};

const managers = new WeakMap<Document, IsolationManager>();

function restore(manager: IsolationManager) {
  for (const [element, inert] of manager.originalInert) {
    if (inert) element.setAttribute('inert', '');
    else element.removeAttribute('inert');
  }
  manager.originalInert.clear();
}

function apply(doc: Document, manager: IsolationManager) {
  restore(manager);
  const scope = manager.scopes.at(-1);
  if (!scope) return;
  const allowed = getLayerBranches(scope.layer);
  for (const child of doc.body.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (allowed.some((node) => child === node || child.contains(node))) continue;
    manager.originalInert.set(child, child.hasAttribute('inert'));
    child.setAttribute('inert', '');
  }
}

export function useModalIsolation(layer: OverlayLayer, active: boolean) {
  useLayoutEffect(() => {
    const content = layer.contentRef.current;
    if (!active || !content) return;
    const doc = content.ownerDocument;
    const manager = managers.get(doc) ?? {
      scopes: [],
      originalInert: new Map<HTMLElement, boolean>(),
      observer: null,
    };
    managers.set(doc, manager);
    const scope = { layer };
    const childIndex = manager.scopes.findIndex((candidate) =>
      isDescendantLayer(candidate.layer, layer),
    );
    manager.scopes.splice(childIndex < 0 ? manager.scopes.length : childIndex, 0, scope);
    if (!manager.observer) {
      manager.observer = new MutationObserver(() => apply(doc, manager));
      manager.observer.observe(doc.body, { childList: true });
    }
    const unsubscribe = subscribeToLayerChanges(doc, () => apply(doc, manager));
    apply(doc, manager);
    return () => {
      unsubscribe();
      const index = manager.scopes.indexOf(scope);
      if (index !== -1) manager.scopes.splice(index, 1);
      apply(doc, manager);
      if (!manager.scopes.length) {
        manager.observer?.disconnect();
        manager.observer = null;
        restore(manager);
        managers.delete(doc);
      }
    };
  }, [active, layer]);
}
