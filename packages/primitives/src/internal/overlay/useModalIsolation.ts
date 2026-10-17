import { useContext, useLayoutEffect } from 'react';

import {
  getLayerBranches,
  isDescendantLayer,
  type OverlayLayer,
  subscribeToLayerChanges,
} from './layers';
import { PortalContainerContext } from './Portal';

type IsolationScope = { layer: OverlayLayer };
type IsolationManager = {
  scopes: IsolationScope[];
  originalInert: Map<HTMLElement, boolean>;
  observer: MutationObserver | null;
};

const managers = new WeakMap<HTMLElement, IsolationManager>();

function restore(manager: IsolationManager) {
  for (const [element, inert] of manager.originalInert) {
    if (inert) element.setAttribute('inert', '');
    else element.removeAttribute('inert');
  }

  manager.originalInert.clear();
}

function apply(container: HTMLElement, manager: IsolationManager) {
  restore(manager);

  const scope = manager.scopes.at(-1);
  if (!scope) return;

  const allowed = getLayerBranches(scope.layer);

  for (const child of container.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (allowed.some((node) => child === node || child.contains(node))) continue;
    manager.originalInert.set(child, child.hasAttribute('inert'));
    child.setAttribute('inert', '');
  }
}

export function useModalIsolation(layer: OverlayLayer, active: boolean) {
  const containerRef = useContext(PortalContainerContext);

  useLayoutEffect(() => {
    const content = layer.contentRef.current;

    if (!active || !content) return;

    const doc = content.ownerDocument;
    const container = containerRef?.current ?? doc.body;
    const manager = managers.get(container) ?? {
      scopes: [],
      originalInert: new Map<HTMLElement, boolean>(),
      observer: null,
    };
    managers.set(container, manager);

    const scope = { layer };
    const childIndex = manager.scopes.findIndex((candidate) =>
      isDescendantLayer(candidate.layer, layer),
    );
    manager.scopes.splice(childIndex < 0 ? manager.scopes.length : childIndex, 0, scope);

    if (!manager.observer) {
      manager.observer = new MutationObserver(() => apply(container, manager));
      manager.observer.observe(container, { childList: true });
    }

    const unsubscribe = subscribeToLayerChanges(doc, () => apply(container, manager));
    apply(container, manager);

    return () => {
      unsubscribe();

      const index = manager.scopes.indexOf(scope);
      if (index !== -1) manager.scopes.splice(index, 1);
      apply(container, manager);

      if (!manager.scopes.length) {
        manager.observer?.disconnect();
        manager.observer = null;
        restore(manager);
        managers.delete(container);
      }
    };
  }, [active, layer, containerRef]);
}
