import { PlusIcon } from '@virgo-design/icons';
import { Tabs as PrimitiveTabs } from '@virgo-design/primitives';
import { forwardRef, useCallback, useLayoutEffect, useRef } from 'react';

import { useComposedRefs } from '../../internal/utils/composeRefs';
import styles from './Tabs.module.scss';
import type { TabListProps } from './Tabs.types';
import { useTabsVisualContext } from './TabsContext';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { className, children, ...props },
  forwardedRef,
) {
  const { variant, align, addable, addLabel, onAdd } = useTabsVisualContext('TabList');
  const listRef = useRef<HTMLDivElement | null>(null);

  const setListRef = useComposedRefs(forwardedRef, listRef);

  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    const selectedTab = list?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');

    if (!list || !selectedTab || variant !== 'line') {
      list?.removeAttribute('data-indicator-ready');
      return;
    }

    const listRect = list.getBoundingClientRect();
    const tabRect = selectedTab.getBoundingClientRect();
    const localWidth = Number.parseFloat(getComputedStyle(list).width);
    const scaleX = localWidth > 0 && listRect.width > 0 ? listRect.width / localWidth : 1;

    list.style.setProperty(
      '--tabs-indicator-x',
      `${(tabRect.left - listRect.left) / scaleX - list.clientLeft}px`,
    );
    list.style.setProperty('--tabs-indicator-width', `${tabRect.width / scaleX}px`);
    list.dataset.indicatorReady = 'true';
  }, [variant]);

  useLayoutEffect(() => {
    updateIndicator();

    const list = listRef.current;
    if (!list) {
      return undefined;
    }

    const mutationObserver = new MutationObserver(updateIndicator);
    mutationObserver.observe(list, {
      attributeFilter: ['aria-selected'],
      attributes: true,
      childList: true,
      subtree: true,
    });

    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        mutationObserver.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(list);
    list
      .querySelectorAll<HTMLElement>('[role="tab"]')
      .forEach((tab) => resizeObserver.observe(tab));

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [children, updateIndicator]);

  const tabList = (
    <PrimitiveTabs.List
      {...props}
      ref={setListRef}
      className={joinClassNames(styles.list, className)}
      data-align={align}
      data-variant={variant}
    >
      {children}
      <span aria-hidden="true" className={styles.indicator} data-slot="indicator" />
    </PrimitiveTabs.List>
  );

  if (variant !== 'card' || !addable) {
    return tabList;
  }

  return (
    <div className={styles.editableList} data-align={align} data-variant={variant}>
      {tabList}
      <button
        className={styles.addAction}
        type="button"
        aria-label={addLabel}
        data-slot="add-action"
        onClick={onAdd}
      >
        <PlusIcon aria-hidden="true" />
      </button>
    </div>
  );
});

TabList.displayName = 'Tabs.List';
