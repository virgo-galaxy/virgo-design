import { CloseIcon } from '@virgo-design/icons';
import { Combobox as PrimitiveCombobox } from '@virgo-design/primitives';
import { createContext, forwardRef, useContext } from 'react';

import { useControlLabels } from '../../shared/control-labels';
import styles from './Combobox.module.scss';
import type {
  ComboboxClearProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxOptionProps,
  ComboboxProps,
} from './Combobox.types';
const SizeContext = createContext<ComboboxProps['size']>('medium');
export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(function Combobox(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <SizeContext.Provider value={size}>
      <PrimitiveCombobox
        {...props}
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(' ')}
        data-size={size}
      />
    </SizeContext.Provider>
  );
});
export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput({ className, ...props }, ref) {
    return (
      <PrimitiveCombobox.Input
        {...props}
        ref={ref}
        className={[styles.input, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxContent({ className, ...props }, ref) {
    const size = useContext(SizeContext);
    return (
      <PrimitiveCombobox.Content
        {...props}
        ref={ref}
        data-size={size}
        className={[styles.content, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const ComboboxOption = forwardRef<HTMLDivElement, ComboboxOptionProps>(
  function ComboboxOption({ className, ...props }, ref) {
    return (
      <PrimitiveCombobox.Option
        {...props}
        ref={ref}
        className={[styles.option, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(function ComboboxEmpty(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCombobox.Empty
      {...props}
      ref={ref}
      className={[styles.empty, className].filter(Boolean).join(' ')}
    />
  );
});
export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(function ComboboxGroup(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCombobox.Group
      {...props}
      ref={ref}
      className={[styles.group, className].filter(Boolean).join(' ')}
    />
  );
});
export const ComboboxClear = forwardRef<HTMLButtonElement, ComboboxClearProps>(
  function ComboboxClear({ children, className, 'aria-label': label, ...props }, ref) {
    const labels = useControlLabels();
    return (
      <PrimitiveCombobox.Clear
        {...props}
        ref={ref}
        aria-label={label ?? labels.clearInput}
        className={[styles.clear, className].filter(Boolean).join(' ')}
      >
        {children ?? <CloseIcon size={16} />}
      </PrimitiveCombobox.Clear>
    );
  },
);
