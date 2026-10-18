'use client';

import { createContext, useContext } from 'react';

export interface NavigationLocation {
  pathname: string;
  search: string;
}
export type NavigationPredicate = (locations: {
  currentLocation: NavigationLocation;
  nextLocation: NavigationLocation;
}) => boolean;
export interface NavigationContextValue {
  request: (url: string, action: () => void) => void;
  register: (predicate: NavigationPredicate) => () => void;
  blocked: boolean;
  reset: () => void;
  proceed: () => void;
}
export const NavigationContext = createContext<NavigationContextValue | null>(null);
export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('NavigationProvider is required');
  return context;
}
