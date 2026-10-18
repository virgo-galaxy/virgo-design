import { CloseIcon } from '@virgo-design/icons';
import { Combobox as PrimitiveCombobox } from '@virgo-design/primitives';
import { createContext, forwardRef, useContext } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import type {
  ComboboxClearProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxOptionProps,
  ComboboxProps,
} from './Combobox.types';

import styles from './Combobox.module.scss';

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
  function ComboboxInput({ className, prefix, ...props }, ref) {
    return (
      <div className={styles.inputFrame} data-slot="input-frame">
        {prefix !== undefined ? (
          <span className={styles.prefix} aria-hidden="true" data-slot="prefix">
            {prefix}
          </span>
        ) : null}
        <PrimitiveCombobox.Input
          {...props}
          ref={ref}
          className={[styles.input, className].filter(Boolean).join(' ')}
        />
      </div>
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
    const labels = useLocale().input;

    return (
      <PrimitiveCombobox.Clear
        {...props}
        ref={ref}
        aria-label={label ?? labels.clearInput}
        className={[styles.clear, className].filter(Boolean).join(' ')}
      >
        {children ?? <CloseIcon size={12} aria-hidden="true" />}
      </PrimitiveCombobox.Clear>
    );
  },
);
