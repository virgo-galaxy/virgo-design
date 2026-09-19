import { CheckboxGroup as PrimitiveCheckboxGroup } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Checkbox.module.scss';
import type { CheckboxGroupProps } from './Checkbox.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveCheckboxGroup
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.group, className)}
    />
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';
