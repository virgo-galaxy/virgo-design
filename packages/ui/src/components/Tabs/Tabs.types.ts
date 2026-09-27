import type {
  TabListProps as PrimitiveTabListProps,
  TabPanelProps as PrimitiveTabPanelProps,
  TabProps as PrimitiveTabProps,
  TabsProps as PrimitiveTabsProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type TabsVariant = 'line' | 'plain' | 'card';
export type TabsAlign = 'start' | 'center';

interface TabsSharedProps extends Omit<PrimitiveTabsProps, 'className'> {
  /** Visual treatment for the tab list. */
  variant?: TabsVariant;

  /** Horizontal alignment of the tabs within the list. */
  align?: TabsAlign;

  /** Consumer class applied to the Tabs root. */
  className?: string;
}

interface TabsWithoutAddAction {
  addable?: false;
  onAdd?: never;
  addLabel?: never;
}

interface TabsWithAddAction {
  /** Adds a trailing action beside the tablist for editable card tabs. */
  addable: true;

  /** Called when the add-tab action is activated. */
  onAdd: () => void;

  /** Accessible name for the icon-only add action. */
  addLabel?: string;
}

export type TabsProps = TabsSharedProps & (TabsWithoutAddAction | TabsWithAddAction);

export interface TabListProps extends Omit<PrimitiveTabListProps, 'className'> {
  /** Consumer class applied to the TabList root. */
  className?: string;
}

interface TabSharedProps extends Omit<PrimitiveTabProps, 'children' | 'className'> {
  /** Visible tab label. */
  children: ReactNode;

  /** Optional decorative icon before the tab label. */
  icon?: ReactNode;

  /** Consumer class applied to the tab item wrapper. */
  className?: string;
}

interface StandardTabProps {
  closable?: false;
  onClose?: never;
  closeLabel?: never;
}

interface ClosableTabProps {
  /** Shows a pointer close action and enables the Delete key for a card tab. */
  closable: true;

  /** Called with this tab's value when its close action is activated. */
  onClose: (value: string) => void;

  /** Accessible name for the icon-only close action. */
  closeLabel?: string;
}

export type TabProps = TabSharedProps & (StandardTabProps | ClosableTabProps);

export interface TabPanelProps extends Omit<PrimitiveTabPanelProps, 'className'> {
  /** Consumer class applied to the TabPanel root. */
  className?: string;
}
