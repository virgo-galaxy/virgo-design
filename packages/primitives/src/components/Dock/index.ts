import { DockBoundary, DockContent, DockHandle, DockRoot } from './Dock';

export const Dock = Object.assign(DockRoot, {
  Root: DockRoot,
  Boundary: DockBoundary,
  Handle: DockHandle,
  Content: DockContent,
});

export type {
  DockBoundaryProps,
  DockContentProps,
  DockEdge,
  DockHandlePosition,
  DockHandleProps,
  DockOrientation,
  DockPersistenceStorage,
  DockPersistOptions,
  DockPlacement,
  DockRootProps,
  DockSnapDivisions,
  DockState,
} from './Dock.types';
