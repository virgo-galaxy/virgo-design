import { CloseIcon } from '@virgo-design/icons';
import { Tabs as PrimitiveTabs } from '@virgo-design/primitives';
import { forwardRef, useCallback } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import type { TabProps } from './Tabs.types';
import { useTabsVisualContext } from './TabsContext';

import styles from './Tabs.module.scss';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  {
    value,
    icon,
    closable = false,
    onClose,
    closeLabel,
    disabled,
    children,
    className,
    tabClassName,
    labelClassName,
    onKeyDown,
    ...props
  },
  forwardedRef,
) {
  const locale = useLocale();
  const { variant } = useTabsVisualContext('Tab');
  const showsCloseAction = variant === 'card' && closable;

  const closeTab = useCallback(
    (currentTab: HTMLButtonElement | null) => {
      if (!currentTab) {
        return;
      }

      if (currentTab.getAttribute('aria-selected') === 'true') {
        const tabList = currentTab.closest<HTMLElement>('[role="tablist"]');
        const enabledTabs = Array.from(
          tabList?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
        );
        const currentIndex = enabledTabs.indexOf(currentTab);
        const adjacentTab = enabledTabs[currentIndex + 1] ?? enabledTabs[currentIndex - 1];

        adjacentTab?.click();
        adjacentTab?.focus();
      }

      onClose?.(value);
    },
    [onClose, value],
  );

  return (
    <div
      className={joinClassNames(styles.item, className)}
      data-slot="item"
      data-closable={showsCloseAction || undefined}
      data-disabled={disabled || undefined}
    >
      <PrimitiveTabs.Tab
        {...props}
        ref={forwardedRef}
        className={joinClassNames(styles.tab, tabClassName)}
        data-slot="tab"
        disabled={disabled}
        value={value}
        aria-keyshortcuts={showsCloseAction ? 'Delete' : props['aria-keyshortcuts']}
        onKeyDown={(event) => {
          onKeyDown?.(event);

          if (!event.defaultPrevented && !disabled && showsCloseAction && event.key === 'Delete') {
            event.preventDefault();
            closeTab(event.currentTarget);
          }
        }}
      >
        {icon !== undefined ? (
          <span aria-hidden="true" className={styles.icon} data-slot="icon">
            {icon}
          </span>
        ) : null}
        <span className={joinClassNames(styles.label, labelClassName)} data-slot="label">
          {children}
        </span>
      </PrimitiveTabs.Tab>

      {showsCloseAction ? (
        <button
          className={styles.closeAction}
          type="button"
          aria-label={closeLabel ?? locale.tabs.close}
          data-slot="close-action"
          disabled={disabled}
          tabIndex={-1}
          onClick={(event) => {
            event.stopPropagation();

            const item = event.currentTarget.parentElement;
            const currentTab = item?.querySelector<HTMLButtonElement>('[role="tab"]');
            closeTab(currentTab ?? null);
          }}
        >
          <CloseIcon aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});

Tab.displayName = 'Tabs.Tab';
