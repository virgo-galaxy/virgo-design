import { forwardRef } from 'react';

import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, forwardedRef) {
    return <textarea ref={forwardedRef} {...props} />;
  },
);

Textarea.displayName = 'Textarea';
