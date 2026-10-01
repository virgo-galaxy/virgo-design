import { forwardRef } from 'react';

import { useFieldControl } from '../../internal/form/field-context';
import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, forwardedRef) {
    return <textarea ref={forwardedRef} {...useFieldControl(props)} />;
  },
);

Textarea.displayName = 'Textarea';
