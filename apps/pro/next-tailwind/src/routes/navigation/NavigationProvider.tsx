'use client';

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { NavigationContext, type NavigationLocation, type NavigationPredicate } from './context';

const indexKey = '__virgoNavigationIndex';
function location(url: string): NavigationLocation {
  const parsed = new URL(url, window.location.href);
  return { pathname: parsed.pathname, search: parsed.search };
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const predicate = useRef<NavigationPredicate | undefined>(undefined);
  const pending = useRef<(() => void) | undefined>(undefined);
  const [blocked, setBlocked] = useState(false);
  const register = useCallback((next: NavigationPredicate) => {
    predicate.current = next;
    return () => {
      if (predicate.current === next) predicate.current = undefined;
    };
  }, []);
  const request = useCallback((url: string, action: () => void) => {
    if (
      predicate.current?.({
        currentLocation: location(window.location.href),
        nextLocation: location(url),
      })
    ) {
      pending.current = action;
      setBlocked(true);
    } else action();
  }, []);
  const reset = useCallback(() => {
    pending.current = undefined;
    setBlocked(false);
  }, []);
  const proceed = useCallback(() => {
    const action = pending.current;
    pending.current = undefined;
    setBlocked(false);
    action?.();
  }, []);

  useEffect(() => {
    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;
    let currentIndex = Number(window.history.state?.[indexKey] ?? 0);
    let currentUrl = window.location.href;
    let restoring = false;
    let allowPop = false;
    originalReplace.call(
      window.history,
      { ...window.history.state, [indexKey]: currentIndex },
      '',
      currentUrl,
    );
    const push: History['pushState'] = function (this: History, data, unused, url) {
      currentIndex += 1;
      originalPush.call(this, { ...data, [indexKey]: currentIndex }, unused, url);
      currentUrl = window.location.href;
    };
    const replace: History['replaceState'] = function (this: History, data, unused, url) {
      originalReplace.call(this, { ...data, [indexKey]: currentIndex }, unused, url);
      currentUrl = window.location.href;
    };
    window.history.pushState = push;
    window.history.replaceState = replace;
    const onPop = (event: PopStateEvent) => {
      const nextIndex = Number(event.state?.[indexKey] ?? currentIndex);
      if (restoring) {
        restoring = false;
        event.stopImmediatePropagation();
        return;
      }
      const shouldBlock =
        !allowPop &&
        predicate.current?.({
          currentLocation: location(currentUrl),
          nextLocation: location(window.location.href),
        });
      allowPop = false;
      if (shouldBlock && nextIndex !== currentIndex) {
        event.stopImmediatePropagation();
        const delta = nextIndex - currentIndex;
        restoring = true;
        window.history.go(-delta);
        pending.current = () => {
          allowPop = true;
          window.history.go(delta);
        };
        setBlocked(true);
      } else {
        currentIndex = nextIndex;
        currentUrl = window.location.href;
      }
    };
    const onTraverse = (event: Event) => onPop((event as CustomEvent<PopStateEvent>).detail);
    window.addEventListener('virgo-pro:before-traverse', onTraverse);
    return () => {
      window.removeEventListener('virgo-pro:before-traverse', onTraverse);
      if (window.history.pushState === push) window.history.pushState = originalPush;
      if (window.history.replaceState === replace) window.history.replaceState = originalReplace;
    };
  }, []);
  return (
    <NavigationContext value={{ request, register, blocked, reset, proceed }}>
      {children}
    </NavigationContext>
  );
}
