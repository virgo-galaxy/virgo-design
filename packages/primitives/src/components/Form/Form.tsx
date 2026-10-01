import { forwardRef } from 'react';

import { FormStateContext } from '../../internal/form/field-context';
import type { FormProps } from './Form.types';
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { disabled, readOnly, ...props },
  ref,
) {
  return (
    <FormStateContext.Provider value={{ disabled, readOnly }}>
      <form
        {...props}
        ref={ref}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      />
    </FormStateContext.Provider>
  );
});
