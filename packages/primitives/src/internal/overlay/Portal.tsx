import { createContext, type ReactNode, type RefObject, useContext } from 'react';
import { createPortal } from 'react-dom';

export const PortalContainerContext = createContext<RefObject<HTMLElement | null> | null>(null);

export type PortalProviderProps = {
  /** A positioned container for a self-contained workspace, including scaled windows. */
  containerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
};

export function PortalProvider({ containerRef, children }: PortalProviderProps) {
  return (
    <PortalContainerContext.Provider value={containerRef}>
      {children}
    </PortalContainerContext.Provider>
  );
}

export function Portal({ children }: { children: ReactNode }) {
  const container = useContext(PortalContainerContext);
  return typeof document === 'undefined'
    ? null
    : createPortal(children, container?.current ?? document.body);
}
