import { CloseIcon, EyeClosedIcon, EyeIcon } from '@virgo-design/icons';
import { Field as PrimitiveField, Input as PrimitiveInput } from '@virgo-design/primitives';
import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';

import { useControlLabels } from '../../shared/control-labels';
import styles from './Input.module.scss';
import type { InputPasswordProps, InputProps } from './Input.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function hasAriaInvalidValue(value: InputProps['aria-invalid']) {
  return value !== undefined && value !== false && value !== 'false';
}

function hasInputValue(value: InputProps['value'] | InputProps['defaultValue']) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== undefined && value !== null && String(value).length > 0;
}

function useInputRef(forwardedRef: ForwardedRef<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const composedRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  return [inputRef, composedRef] as const;
}

function clearNativeInput(input: HTMLInputElement) {
  const window = input.ownerDocument.defaultView;
  const valueSetter = window
    ? Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    : undefined;

  if (valueSetter) {
    valueSetter.call(input, '');
  } else {
    input.value = '';
  }

  input.dispatchEvent(new (window?.Event ?? Event)('input', { bubbles: true }));
}

interface InputCoreProps extends InputProps {
  endAction?: ReactNode;
}

const InputCore = forwardRef<HTMLInputElement, InputCoreProps>(function InputCore(
  {
    size = 'medium',
    prefix,
    suffix,
    clearable = false,
    leadingIcon,
    trailingIcon,
    invalid = false,
    disabled,
    readOnly,
    className,
    rootClassName,
    value,
    defaultValue,
    onChange,
    endAction,
    'aria-invalid': ariaInvalid,
    ...props
  },
  forwardedRef,
) {
  const labels = useControlLabels();
  const isInvalid = invalid || hasAriaInvalidValue(ariaInvalid);
  const isControlled = value !== undefined;
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(() =>
    hasInputValue(defaultValue),
  );
  const [inputRef, composedRef] = useInputRef(forwardedRef);
  const resolvedPrefix = prefix ?? leadingIcon;
  const resolvedSuffix = suffix ?? trailingIcon;
  const showsClearAction =
    clearable &&
    (isControlled ? hasInputValue(value) : uncontrolledHasValue) &&
    !disabled &&
    !readOnly;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledHasValue(hasInputValue(event.currentTarget.value));
    }

    onChange?.(event);
  };

  return (
    <span
      className={joinClassNames(styles.root, rootClassName)}
      data-slot="root"
      data-disabled={disabled || undefined}
      data-invalid={isInvalid || undefined}
      data-readonly={readOnly || undefined}
      data-size={size}
    >
      {resolvedPrefix !== undefined && resolvedPrefix !== null ? (
        <span
          className={styles.adornment}
          data-slot={prefix !== undefined ? 'prefix' : 'leading-icon'}
          aria-hidden="true"
        >
          {resolvedPrefix}
        </span>
      ) : null}

      <PrimitiveInput
        {...props}
        ref={composedRef}
        aria-invalid={invalid ? true : ariaInvalid}
        className={joinClassNames(styles.control, className)}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        readOnly={readOnly}
        value={value}
        data-slot="control"
      />

      {resolvedSuffix !== undefined && resolvedSuffix !== null ? (
        <span
          className={styles.adornment}
          data-slot={suffix !== undefined ? 'suffix' : 'trailing-icon'}
          aria-hidden="true"
        >
          {resolvedSuffix}
        </span>
      ) : null}

      {clearable ? (
        <button
          className={styles.action}
          type="button"
          aria-hidden={!showsClearAction || undefined}
          aria-label={labels.clearInput}
          data-slot="clear-action"
          data-visible={showsClearAction || undefined}
          disabled={!showsClearAction}
          tabIndex={showsClearAction ? 0 : -1}
          onPointerDown={(event) => event.preventDefault()}
          onClick={() => {
            const input = inputRef.current;

            if (!input || input.disabled || input.readOnly) {
              return;
            }

            input.focus({ preventScroll: true });
            clearNativeInput(input);
          }}
        >
          <CloseIcon aria-hidden="true" />
        </button>
      ) : null}

      {endAction}
    </span>
  );
});

InputCore.displayName = 'Input';

const InputRoot = forwardRef<HTMLInputElement, InputProps>(function Input(props, forwardedRef) {
  return (
    <PrimitiveField.Control
      render={(attributes) => (
        <InputCore
          {...attributes}
          {...props}
          ref={forwardedRef}
          disabled={props.disabled ?? attributes.disabled}
          readOnly={props.readOnly ?? attributes.readOnly}
          required={props.required ?? attributes.required}
          aria-invalid={props['aria-invalid'] ?? attributes['aria-invalid']}
        />
      )}
    />
  );
});

InputRoot.displayName = 'Input';

const InputPasswordCore = forwardRef<HTMLInputElement, InputPasswordProps>(function InputPassword(
  { disabled, ...props },
  forwardedRef,
) {
  const labels = useControlLabels();
  const [isVisible, setIsVisible] = useState(false);
  const [inputRef, composedRef] = useInputRef(forwardedRef);

  return (
    <InputCore
      {...props}
      ref={composedRef}
      disabled={disabled}
      type={isVisible ? 'text' : 'password'}
      endAction={
        <button
          className={styles.action}
          type="button"
          aria-label={isVisible ? labels.hidePassword : labels.showPassword}
          data-slot="password-action"
          disabled={disabled}
          onPointerDown={(event) => event.preventDefault()}
          onClick={() => {
            if (inputRef.current?.disabled) return;
            setIsVisible((visible) => !visible);
            inputRef.current?.focus({ preventScroll: true });
          }}
        >
          {isVisible ? (
            <EyeIcon aria-hidden="true" data-icon="eye" />
          ) : (
            <EyeClosedIcon aria-hidden="true" data-icon="eye-closed" />
          )}
        </button>
      }
    />
  );
});

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  function InputPassword(props, ref) {
    return (
      <PrimitiveField.Control
        render={(attributes) => (
          <InputPasswordCore
            {...attributes}
            {...props}
            ref={ref}
            disabled={props.disabled ?? attributes.disabled}
            readOnly={props.readOnly ?? attributes.readOnly}
            required={props.required ?? attributes.required}
            aria-invalid={props['aria-invalid'] ?? attributes['aria-invalid']}
          />
        )}
      />
    );
  },
);
InputPassword.displayName = 'Input.Password';

export const Input = Object.assign(InputRoot, {
  Password: InputPassword,
});
