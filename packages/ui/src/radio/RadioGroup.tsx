import { RadioGroup as PrimitiveRadioGroup } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Radio.module.scss';
import type { RadioGroupProps } from './Radio.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    appearance = 'radio',
    buttonStyle = 'outline',
    orientation = 'horizontal',
    className,
    ...props
  },
  forwardedRef,
) {
  return (
    <PrimitiveRadioGroup
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.group, className)}
      orientation={orientation}
      data-appearance={appearance}
      data-button-style={buttonStyle}
      data-orientation={orientation}
    />
  );
});

RadioGroup.displayName = 'RadioGroup';
