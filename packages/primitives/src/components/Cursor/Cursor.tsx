import { forwardRef, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Portal } from '../../internal/overlay/Portal';
import {
  applyPortalEnvironment,
  observePortalEnvironment,
  readPortalEnvironment,
} from '../../internal/overlay/portalEnvironment';
import { composeRefs } from '../../internal/utils/composeRefs';
import { CursorContext, useCursorPointer } from './context';
import type { CursorFollowerProps, CursorProviderProps, CursorSnapshot } from './Cursor.types';
import { createPointerStore } from './store';
import { pointerFollowStyle, usePointerFollow } from './usePointerFollow';

export const CursorProvider = forwardRef<HTMLDivElement, CursorProviderProps>(
  function CursorProvider(
    { children, cursor, follow, disabled = false, resetKey, hotspot, visualClassName, ...props },
    ref,
  ) {
    const scopeRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const [store] = useState(createPointerStore);
    const frame = useRef<number | null>(null);

    const reset = useCallback(() => {
      const win = scopeRef.current?.ownerDocument.defaultView;
      if (frame.current !== null) win?.cancelAnimationFrame(frame.current);
      frame.current = null;
      store.update({ ...store.getSnapshot(), active: false, visible: false, buttons: 0 });
    }, [store]);

    const pointer = useMemo(
      () => ({
        getSnapshot: store.getSnapshot,
        subscribe: store.subscribe,
        reset,
        scopeRef,
        follow: { tooltip: !disabled && (follow?.tooltip ?? false) },
      }),
      [store, reset, follow?.tooltip, disabled],
    );
    const hotspotX = hotspot?.x ?? 0;
    const hotspotY = hotspot?.y ?? 0;
    const hasVisual = cursor !== null && cursor !== undefined && cursor !== false;

    useLayoutEffect(() => {
      const scope = scopeRef.current;
      if (!scope) return;
      const doc = scope.ownerDocument;
      const win = doc.defaultView!;
      let target: Element | null = null;
      let pending: CursorSnapshot | null = null;

      const paint = () => {
        const state = store.getSnapshot();
        const visible = state.visible && hasVisual;
        scope.dataset.cursorActive = String(visible);
        const visual = visualRef.current;
        if (visual) {
          visual.style.visibility = visible ? 'visible' : 'hidden';
          visual.style.transform = `translate3d(${state.x - hotspotX}px, ${state.y - hotspotY}px, 0)`;
          visual.dataset.pressed = String(state.buttons !== 0);
          applyPortalEnvironment(visual, readPortalEnvironment(target ?? scope));
        }
      };

      const stop = () => {
        pending = null;
        target = null;
        reset();
      };

      const track = (event: PointerEvent) => {
        const element = event.target instanceof Element ? event.target : null;
        if (
          disabled ||
          event.pointerType !== 'mouse' ||
          element?.closest('[data-cursor-scope]') !== scope
        ) {
          stop();
          if (event.pointerType && event.pointerType !== 'mouse') {
            store.update({ ...store.getSnapshot(), pointerType: event.pointerType });
          }
          return;
        }
        target = element;
        pending = {
          x: event.clientX,
          y: event.clientY,
          active: true,
          visible: true,
          pointerType: event.pointerType,
          buttons: event.buttons,
        };
        if (frame.current !== null) return;
        frame.current = win.requestAnimationFrame(() => {
          frame.current = null;
          if (pending) store.update(pending);
          pending = null;
        });
      };

      const leave = (event: PointerEvent) => {
        const next = event.relatedTarget;
        if (!(next instanceof Element) || next.closest('[data-cursor-scope]') !== scope) stop();
      };

      const key = (event: KeyboardEvent) => {
        if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) {
          stop();
          store.update({ ...store.getSnapshot(), pointerType: 'keyboard' });
        }
      };

      const navigate = (event: MouseEvent) => {
        if (event.target instanceof Element && event.target.closest('a[href]')) stop();
      };

      const stopEnvironment = observePortalEnvironment(
        scope,
        () => {
          if (target && !target.isConnected) stop();
          else paint();
        },
        true,
      );
      const unsubscribe = store.subscribe(paint);
      paint();

      for (const name of ['pointerover', 'pointermove', 'pointerdown', 'pointerup'] as const)
        doc.addEventListener(name, track, true);
      doc.addEventListener('pointerout', leave, true);
      doc.addEventListener('pointercancel', stop, true);
      doc.addEventListener('keydown', key, true);
      doc.addEventListener('click', navigate, true);
      doc.addEventListener('visibilitychange', stop);
      doc.addEventListener('scroll', stop, true);
      doc.addEventListener('dragstart', stop, true);
      win.addEventListener('blur', stop);
      win.addEventListener('pagehide', stop);
      win.addEventListener('popstate', stop);
      win.addEventListener('hashchange', stop);

      return () => {
        stop();
        unsubscribe();
        stopEnvironment();
        delete scope.dataset.cursorActive;
        for (const name of ['pointerover', 'pointermove', 'pointerdown', 'pointerup'] as const)
          doc.removeEventListener(name, track, true);
        doc.removeEventListener('pointerout', leave, true);
        doc.removeEventListener('pointercancel', stop, true);
        doc.removeEventListener('keydown', key, true);
        doc.removeEventListener('click', navigate, true);
        doc.removeEventListener('visibilitychange', stop);
        doc.removeEventListener('scroll', stop, true);
        doc.removeEventListener('dragstart', stop, true);
        win.removeEventListener('blur', stop);
        win.removeEventListener('pagehide', stop);
        win.removeEventListener('popstate', stop);
        win.removeEventListener('hashchange', stop);
      };
    }, [disabled, store, reset, hasVisual, hotspotX, hotspotY]);

    useLayoutEffect(() => {
      reset();
    }, [reset, resetKey]);

    return (
      <CursorContext.Provider value={pointer}>
        <div {...props} ref={composeRefs(ref, scopeRef)} data-cursor-scope="">
          {children}
        </div>
        {hasVisual && (
          <Portal>
            <div
              ref={visualRef}
              className={visualClassName}
              data-cursor-visual=""
              aria-hidden="true"
              inert
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                visibility: 'hidden',
                pointerEvents: 'none',
              }}
            >
              {cursor}
            </div>
          </Portal>
        )}
      </CursorContext.Provider>
    );
  },
);

export const CursorFollower = forwardRef<HTMLDivElement, CursorFollowerProps>(
  function CursorFollower({ placement, offset, offsetX, style, ...props }, ref) {
    const pointer = useCursorPointer();
    const contentRef = useRef<HTMLDivElement>(null);
    const fallbackRef = useRef<HTMLDivElement>(null);

    usePointerFollow({
      pointer,
      active: Boolean(pointer),
      contentRef,
      anchorRef: pointer?.scopeRef ?? fallbackRef,
      placement,
      offset,
      offsetX,
      decorative: true,
    });
    if (!pointer) return null;

    return (
      <Portal>
        <div
          {...props}
          ref={composeRefs(ref, contentRef)}
          data-cursor-follower=""
          inert
          aria-hidden="true"
          style={{ ...style, ...pointerFollowStyle }}
        />
      </Portal>
    );
  },
);
