import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';

import type { TabListProps, TabPanelProps, TabProps, TabsProps } from './Tabs.types';

type RegisteredTab = {
  value: string;
  disabled: boolean;
};

type TabsContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
  registerTab: (tab: RegisteredTab) => () => void;
  firstEnabledValue: string | undefined;
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error(`${componentName} must be used inside Tabs.`);
  }

  return context;
}

function getValueId(value: string) {
  return encodeURIComponent(value);
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { id, value: controlledValue, defaultValue, onValueChange, children, ...props },
  forwardedRef,
) {
  const generatedId = useId();
  const baseId = id ?? `vd-tabs-${generatedId}`;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [registeredTabs, setRegisteredTabs] = useState<RegisteredTab[]>([]);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const firstEnabledValue = registeredTabs.find((tab) => !tab.disabled)?.value;

  const setValue = useCallback(
    (nextValue: string) => {
      const tab = registeredTabs.find((candidate) => candidate.value === nextValue);

      if (tab?.disabled || Object.is(nextValue, value)) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange, registeredTabs, value],
  );

  const registerTab = useCallback((tab: RegisteredTab) => {
    setRegisteredTabs((currentTabs) => {
      const existingIndex = currentTabs.findIndex((candidate) => candidate.value === tab.value);

      if (existingIndex < 0) {
        return [...currentTabs, tab];
      }

      const nextTabs = [...currentTabs];
      nextTabs[existingIndex] = tab;
      return nextTabs;
    });

    return () => {
      setRegisteredTabs((currentTabs) =>
        currentTabs.filter((candidate) => candidate.value !== tab.value),
      );
    };
  }, []);

  useEffect(() => {
    if (isControlled || !firstEnabledValue) {
      return;
    }

    const currentTab = registeredTabs.find((tab) => tab.value === uncontrolledValue);

    if (currentTab && !currentTab.disabled) {
      return;
    }

    setUncontrolledValue(firstEnabledValue);
  }, [firstEnabledValue, isControlled, registeredTabs, uncontrolledValue]);

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      value,
      setValue,
      registerTab,
      firstEnabledValue,
      getTabId: (tabValue) => `${baseId}-tab-${getValueId(tabValue)}`,
      getPanelId: (panelValue) => `${baseId}-panel-${getValueId(panelValue)}`,
    }),
    [baseId, firstEnabledValue, registerTab, setValue, value],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div {...props} ref={forwardedRef} id={id}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { role = 'tablist', ...props },
  forwardedRef,
) {
  useTabsContext('TabList');

  return <div {...props} ref={forwardedRef} role={role} aria-orientation="horizontal" />;
});

TabList.displayName = 'Tabs.List';

function getEnabledTabs(tabList: HTMLElement) {
  return Array.from(tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
}

function focusTabAtIndex(tabs: HTMLButtonElement[], index: number) {
  if (tabs.length === 0) {
    return;
  }

  const normalizedIndex = ((index % tabs.length) + tabs.length) % tabs.length;
  const tab = tabs[normalizedIndex];

  tab?.focus();
  tab?.click();
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled = false, onClick, onKeyDown, type = 'button', ...props },
  forwardedRef,
) {
  const context = useTabsContext('Tab');
  const { registerTab } = context;
  const isSelected = context.value === value;
  const isTabbable =
    isSelected || (context.value === undefined && context.firstEnabledValue === value);

  useEffect(() => registerTab({ value, disabled }), [disabled, registerTab, value]);

  return (
    <button
      {...props}
      ref={forwardedRef}
      id={context.getTabId(value)}
      type={type}
      role="tab"
      aria-controls={context.getPanelId(value)}
      aria-disabled={disabled || undefined}
      aria-selected={isSelected}
      data-state={isSelected ? 'active' : 'inactive'}
      disabled={disabled}
      tabIndex={isTabbable && !disabled ? 0 : -1}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented && !disabled) {
          context.setValue(value);
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        const tabList = event.currentTarget.closest<HTMLElement>('[role="tablist"]');

        if (!tabList) {
          return;
        }

        const tabs = getEnabledTabs(tabList);
        const currentIndex = tabs.indexOf(event.currentTarget);

        if (event.key === 'ArrowRight') {
          event.preventDefault();
          focusTabAtIndex(tabs, currentIndex + 1);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          focusTabAtIndex(tabs, currentIndex - 1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          focusTabAtIndex(tabs, 0);
        } else if (event.key === 'End') {
          event.preventDefault();
          focusTabAtIndex(tabs, tabs.length - 1);
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          context.setValue(value);
        }
      }}
    />
  );
});

Tab.displayName = 'Tabs.Tab';

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, tabIndex = 0, ...props },
  forwardedRef,
) {
  const context = useTabsContext('TabPanel');
  const isSelected = context.value === value;

  return (
    <div
      {...props}
      ref={forwardedRef}
      id={context.getPanelId(value)}
      role="tabpanel"
      aria-labelledby={context.getTabId(value)}
      data-state={isSelected ? 'active' : 'inactive'}
      hidden={!isSelected}
      tabIndex={tabIndex}
    />
  );
});

TabPanel.displayName = 'Tabs.Panel';
