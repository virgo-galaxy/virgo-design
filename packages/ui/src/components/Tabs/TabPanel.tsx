import { Tabs as PrimitiveTabs } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import type { TabPanelProps } from './Tabs.types';

import styles from './Tabs.module.scss';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveTabs.Panel
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.panel, className)}
    />
  );
});

TabPanel.displayName = 'Tabs.Panel';
