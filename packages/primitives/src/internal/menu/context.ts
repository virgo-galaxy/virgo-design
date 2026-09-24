import type { MutableRefObject } from 'react';
import { createContext, useContext } from 'react';

import type { OverlayLayer } from '../overlay/layers';
import type { FocusIntent, MenuCollection } from './collection';

export type BarEntry = { node: HTMLButtonElement; open: (intent: FocusIntent) => void };
export type BarContextValue = {
  value: string | null;
  setValue: (value: string | null) => void;
  focused: string | null;
  setFocused: (value: string) => void;
  register: (value: string, entry: BarEntry) => () => void;
  move: (value: string, direction: number | 'first' | 'last', open: boolean) => void;
};
export const BarContext = createContext<BarContextValue | null>(null);
export type MenuContextValue = {
  id: string;
  open: boolean;
  disabled: boolean;
  mode: 'menu' | 'context' | 'submenu' | 'menubar';
  triggerId: string;
  contentId: string;
  triggerRef: MutableRefObject<HTMLElement | null>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  intentRef: MutableRefObject<FocusIntent>;
  collection: MenuCollection;
  layer: OverlayLayer;
  parent: MenuContextValue | null;
  bar: BarContextValue | null;
  barValue: string | undefined;
  activeChild: string | null;
  setActiveChild: (id: string | null) => void;
  registerChild: (id: string, close: () => void) => () => void;
  requestOpen: (intent: FocusIntent) => void;
  close: (restore?: boolean) => void;
  closeAll: (restore?: boolean) => void;
  cancelClose: () => void;
  scheduleClose: () => void;
  point: { left: number; top: number; width: number; height: number } | undefined;
  setPoint: (
    point: { left: number; top: number; width: number; height: number } | undefined,
  ) => void;
};
export const MenuContext = createContext<MenuContextValue | null>(null);
export function useMenu() {
  const context = useContext(MenuContext);
  if (!context)
    throw new Error('Menu parts must be used inside Menu, ContextMenu or Menubar.Menu.');
  return context;
}
