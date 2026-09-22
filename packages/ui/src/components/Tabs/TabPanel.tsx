import { Tabs as PrimitiveTabs } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Tabs.module.scss';
import type { TabPanelProps } from './Tabs.types';

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
