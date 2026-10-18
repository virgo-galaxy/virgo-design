import { Checkbox as PrimitiveCheckbox } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import type { CheckboxGroupProps } from './Checkbox.types';

import styles from './Checkbox.module.scss';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveCheckbox.Group
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.group, className)}
    />
  );
});

CheckboxGroup.displayName = 'Checkbox.Group';
