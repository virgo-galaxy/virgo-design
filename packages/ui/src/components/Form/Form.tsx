import { Form as PrimitiveForm } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Form.module.scss';
import type { FormProps } from './Form.types';
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { layout = 'vertical', size = 'medium', className, ...props },
  ref,
) {
  return (
    <PrimitiveForm
      {...props}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-layout={layout}
      data-size={size}
    />
  );
});
