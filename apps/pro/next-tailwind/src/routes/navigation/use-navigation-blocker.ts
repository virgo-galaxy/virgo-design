'use client';

import { useLayoutEffect, useRef } from 'react';

import { type NavigationPredicate, useNavigationContext } from './context';

export function useNavigationBlocker(predicate: NavigationPredicate) {
  const { register, blocked, reset, proceed } = useNavigationContext();
  const latest = useRef(predicate);
  useLayoutEffect(() => {
    latest.current = predicate;
  });
  useLayoutEffect(() => register((locations) => latest.current(locations)), [register]);
  return { state: blocked ? ('blocked' as const) : ('unblocked' as const), reset, proceed };
}
