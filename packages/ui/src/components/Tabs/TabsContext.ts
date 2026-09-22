import { createContext, useContext } from 'react';

import type { TabsAlign, TabsVariant } from './Tabs.types';

export type TabsVisualContextValue = {
  variant: TabsVariant;
  align: TabsAlign;
  addable: boolean;
  addLabel: string;
  onAdd: (() => void) | undefined;
};

export const TabsVisualContext = createContext<TabsVisualContextValue | null>(null);

export function useTabsVisualContext(componentName: string) {
  const context = useContext(TabsVisualContext);

  if (context === null) {
    throw new Error(`${componentName} must be used inside Tabs.`);
  }

  return context;
}
