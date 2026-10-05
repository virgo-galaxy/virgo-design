import { type RefObject, useContext, useLayoutEffect, useRef } from 'react';

import { focusFirst, getTabbables } from './focus';
import { containsFocusInLayerContentTree, isDescendantLayer, type OverlayLayer } from './layers';
import { PortalContainerContext } from './Portal';

type FocusScope = {
  layer: OverlayLayer;
  contentRef: RefObject<HTMLElement | null>;
  trappedRef: RefObject<boolean>;
};

const scopesByDocument = new WeakMap<Document, FocusScope[]>();

function createAutoFocusEvent(type: string) {
  return new Event(type, { cancelable: true });
}

export function useFocusScope({
  active,
  trapped,
  layer,
  contentRef,
  restoreFocus,
  onOpenAutoFocus,
  onCloseAutoFocus,
}: {
  active: boolean;
  trapped: boolean;
  layer: OverlayLayer;
  contentRef: RefObject<HTMLElement | null>;
  restoreFocus: () => HTMLElement | null | false;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
}) {
  const containerRef = useContext(PortalContainerContext);
  const callbacks = useRef({ restoreFocus, onOpenAutoFocus, onCloseAutoFocus });
  const trappedRef = useRef(trapped);
  useLayoutEffect(() => {
    callbacks.current = { restoreFocus, onOpenAutoFocus, onCloseAutoFocus };
    trappedRef.current = trapped;
  });

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!active || !content) return;
    const doc = content.ownerDocument;
    const previouslyFocused = doc.activeElement instanceof HTMLElement ? doc.activeElement : null;
    const scope = { layer, contentRef, trappedRef };
    const scopes = scopesByDocument.get(doc) ?? [];
    scopesByDocument.set(doc, scopes);
    const childIndex = scopes.findIndex((candidate) => isDescendantLayer(candidate.layer, layer));
    scopes.splice(childIndex < 0 ? scopes.length : childIndex, 0, scope);
    const isTopTrappedScope = () => {
      for (let index = scopes.length - 1; index >= 0; index -= 1) {
        const candidate = scopes[index];
        if (candidate?.trappedRef.current) return candidate === scope;
      }
      return false;
    };
    let lastFocused = content;
    let pendingFocusCheck = false;

    const openEvent = createAutoFocusEvent('dialog.openAutoFocus');
    callbacks.current.onOpenAutoFocus?.(openEvent);
    if (!openEvent.defaultPrevented) focusFirst(content);
    if (containsFocusInLayerContentTree(layer, doc.activeElement))
      lastFocused = doc.activeElement as HTMLElement;

    const focus = (event: FocusEvent) => {
      if (!trappedRef.current || !isTopTrappedScope() || !(event.target instanceof Node)) return;
      if (containerRef?.current && !containerRef.current.contains(event.target)) return;
      if (containsFocusInLayerContentTree(layer, event.target)) {
        lastFocused = event.target as HTMLElement;
        return;
      }
      // A portalled child can focus itself before its layer layout effect registers.
      if (pendingFocusCheck) return;
      pendingFocusCheck = true;
      queueMicrotask(() => {
        pendingFocusCheck = false;
        if (
          isTopTrappedScope() &&
          !containsFocusInLayerContentTree(layer, doc.activeElement) &&
          (!containerRef?.current || containerRef.current.contains(doc.activeElement))
        ) {
          if (lastFocused.isConnected) lastFocused.focus({ preventScroll: true });
          else focusFirst(contentRef.current);
        }
      });
    };
    const key = (event: KeyboardEvent) => {
      if (
        !trappedRef.current ||
        !isTopTrappedScope() ||
        event.defaultPrevented ||
        event.key !== 'Tab' ||
        !(event.target instanceof Node) ||
        !content.contains(event.target)
      )
        return;
      const tabbables = getTabbables(content);
      if (!tabbables.length) {
        event.preventDefault();
        content.focus({ preventScroll: true });
        return;
      }
      const first = tabbables[0]!;
      const last = tabbables.at(-1)!;
      if (event.shiftKey && (doc.activeElement === first || doc.activeElement === content)) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };
    doc.addEventListener('focusin', focus);
    doc.addEventListener('keydown', key);
    return () => {
      const index = scopes.indexOf(scope);
      if (index !== -1) scopes.splice(index, 1);
      if (!scopes.length) scopesByDocument.delete(doc);
      doc.removeEventListener('focusin', focus);
      doc.removeEventListener('keydown', key);
      const closeEvent = createAutoFocusEvent('dialog.closeAutoFocus');
      callbacks.current.onCloseAutoFocus?.(closeEvent);
      if (!closeEvent.defaultPrevented) {
        const restoreTarget = callbacks.current.restoreFocus();
        const target = restoreTarget === false ? null : (restoreTarget ?? previouslyFocused);
        if (target?.isConnected) target.focus({ preventScroll: true });
      }
    };
  }, [active, layer, contentRef, containerRef]);
}
