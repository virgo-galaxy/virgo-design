import { Tabs as PrimitiveTabs } from '@virgo-design/primitives';
import { forwardRef, useMemo } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import type { TabsProps } from './Tabs.types';
import { TabsVisualContext } from './TabsContext';

import styles from './Tabs.module.scss';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    variant = 'line',
    align = 'start',
    addable = false,
    onAdd,
    addLabel: addLabelProp,
    className,
    ...props
  },
  forwardedRef,
) {
  const locale = useLocale();
  const addLabel = addLabelProp ?? locale.tabs.add;

  const contextValue = useMemo(
    () => ({ variant, align, addable, onAdd, addLabel }),
    [addLabel, addable, align, onAdd, variant],
  );

  return (
    <TabsVisualContext.Provider value={contextValue}>
      <PrimitiveTabs
        {...props}
        ref={forwardedRef}
        className={joinClassNames(styles.root, className)}
        data-align={align}
        data-variant={variant}
      />
    </TabsVisualContext.Provider>
  );
});

Tabs.displayName = 'Tabs';
