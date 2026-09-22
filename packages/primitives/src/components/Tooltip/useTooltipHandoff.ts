import { type RefObject, useLayoutEffect, useRef, useState } from 'react';

const handoffEvent = 'virgo:tooltip-open';
const warmWindow = 300;
type Origin = { left: number; top: number };
type Handoff = { owner: symbol; smooth: boolean; from: Origin | null };
type Session = { users: number; active: symbol | null; closedAt: number; smooth: boolean };
const sessions = new WeakMap<Document, Session>();

function isWarm(doc: Document | undefined) {
  const session = doc && sessions.get(doc);
  return Boolean(
    session?.smooth && (session.active !== null || Date.now() - session.closedAt < warmWindow),
  );
}

/** A newly visible tooltip replaces others in the same document, including pending hover timers. */
export function useTooltipHandoff(
  open: boolean,
  smoothTransition: boolean,
  triggerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  onHandoff: (skipExit: boolean) => void,
) {
  const owner = useRef(Symbol('tooltip'));
  const callback = useRef(onHandoff);
  const [transition, setTransition] = useState<{ continuous: boolean; from: Origin | null }>({
    continuous: false,
    from: null,
  });
  useLayoutEffect(() => {
    callback.current = onHandoff;
  });
  useLayoutEffect(() => {
    const doc = triggerRef.current?.ownerDocument;
    if (!doc) return;
    const session = sessions.get(doc) ?? {
      users: 0,
      active: null,
      closedAt: -Infinity,
      smooth: false,
    };
    session.users++;
    sessions.set(doc, session);
    const handle = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail = event.detail as Handoff;
      if (detail.owner === owner.current) return;
      const content = contentRef.current;
      // Capture the current visual position, including an interrupted movement, before removal.
      if (
        smoothTransition &&
        detail.smooth &&
        content &&
        getComputedStyle(content).visibility !== 'hidden'
      ) {
        const { left, top } = content.getBoundingClientRect();
        detail.from = { left, top };
      }
      callback.current(smoothTransition && detail.smooth);
    };
    doc.addEventListener(handoffEvent, handle);
    return () => {
      doc.removeEventListener(handoffEvent, handle);
      if (--session.users === 0) sessions.delete(doc);
    };
  }, [triggerRef, contentRef, smoothTransition]);
  useLayoutEffect(() => {
    if (!open) return;
    const doc = triggerRef.current?.ownerDocument;
    const session = doc && sessions.get(doc);
    if (!doc || !session) return;
    const continuous = smoothTransition && isWarm(doc);
    const currentOwner = owner.current;
    session.active = currentOwner;
    session.smooth = smoothTransition;
    const detail: Handoff = { owner: currentOwner, smooth: smoothTransition, from: null };
    doc.dispatchEvent(new CustomEvent(handoffEvent, { detail }));
    setTransition({ continuous, from: detail.from });
    return () => {
      if (session.active === currentOwner) {
        session.active = null;
        session.closedAt = Date.now();
      }
    };
  }, [open, triggerRef, smoothTransition]);
  return {
    continuous: smoothTransition && transition.continuous,
    from: smoothTransition ? transition.from : null,
    isWarm: () => smoothTransition && isWarm(triggerRef.current?.ownerDocument),
  };
}
