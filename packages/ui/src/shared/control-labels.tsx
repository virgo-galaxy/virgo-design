import { createContext, type ReactNode, useContext } from 'react';

const defaultLabels = {
  expandSidebar: 'Expand sidebar',
  collapseSidebar: 'Collapse sidebar',
  clearInput: 'Clear input',
  hidePassword: 'Hide password',
  showPassword: 'Show password',
  resizeSidebar: 'Resize sidebar',
  dockControls: 'Dock controls',
  unlockDock: 'Unlock dock',
  lockDock: 'Lock dock',
  unlockMovement: 'Unlock movement',
  lockMovement: 'Lock movement',
  unpinDock: 'Unpin dock',
  pinDock: 'Pin dock',
  unpinViewport: 'Unpin from viewport',
  pinViewport: 'Pin to viewport',
};

type ControlLabels = typeof defaultLabels;
const ControlLabelsContext = createContext(defaultLabels);

export function UIControlLabelsProvider({
  labels,
  children,
}: {
  labels: Partial<ControlLabels>;
  children: ReactNode;
}) {
  return (
    <ControlLabelsContext.Provider value={{ ...defaultLabels, ...labels }}>
      {children}
    </ControlLabelsContext.Provider>
  );
}

export function useControlLabels() {
  return useContext(ControlLabelsContext);
}
