import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  EyeClosedIcon,
  EyeIcon,
} from '@virgo-design/icons';
import { Field as PrimitiveField, Input as PrimitiveInput } from '@virgo-design/primitives';
import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
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

function setNativeInputValue(input: HTMLInputElement, value: string) {
  const window = input.ownerDocument.defaultView;
  const valueSetter = window
    ? Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    : undefined;

  if (valueSetter) {
    valueSetter.call(input, value);
  } else {
    input.value = value;
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
    steppers = false,
    stepperRepeat = true,
    stepperReverse = false,
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
    onKeyDown,
    endAction,
    'aria-invalid': ariaInvalid,
    ...props
  },
  forwardedRef,
) {
  const labels = useControlLabels();
  const isInvalid = invalid || hasAriaInvalidValue(ariaInvalid);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;
  const [inputRef, composedRef] = useInputRef(forwardedRef);
  const resolvedPrefix = prefix ?? leadingIcon;
  const resolvedSuffix = suffix ?? trailingIcon;
  const showsClearAction = clearable && hasInputValue(currentValue) && !disabled && !readOnly;
  const showsSteppers = steppers && props.type === 'number' && props.step !== 'any';
  const upDirection = stepperReverse ? -1 : 1;
  const downDirection = stepperReverse ? 1 : -1;
  const numericValue = hasInputValue(currentValue) ? Number(currentValue) : NaN;
  const cannotIncrease =
    disabled ||
    readOnly ||
    (props.max !== undefined && numericValue >= parseFloat(String(props.max)));
  const cannotDecrease =
    disabled ||
    readOnly ||
    (props.min !== undefined && numericValue <= parseFloat(String(props.min)));
  const stepValue = (direction: 1 | -1) => {
    const input = inputRef.current;
    if (!input || input.disabled || input.readOnly) return false;
    input.focus({ preventScroll: true });
    const previous = input.value;
    if (direction === 1) input.stepUp();
    else input.stepDown();
    const next = input.value;
    if (next !== previous) setNativeInputValue(input, next);
    return next !== previous;
  };
  const repeats = showsSteppers && stepperRepeat !== false;
  const repeatOptions = typeof stepperRepeat === 'object' ? stepperRepeat : undefined;
  const repeatDelay = Number.isFinite(repeatOptions?.delay)
    ? Math.max(0, repeatOptions!.delay!)
    : 400;
  const repeatInterval = Number.isFinite(repeatOptions?.interval)
    ? Math.max(16, repeatOptions!.interval!)
    : 80;
  const repeatCleanup = useRef<() => void>(() => {});
  const stopRepeating = useCallback(() => repeatCleanup.current(), []);
  useEffect(() => {
    // Timers must also stop when the input is removed, disabled, or reconfigured.
    return stopRepeating;
  }, [repeats, repeatDelay, repeatInterval, stepperReverse, disabled, readOnly, stopRepeating]);
  const startRepeating = (direction: 1 | -1) => {
    stopRepeating();
    if (!repeats || !stepValue(direction)) return;
    const ownerWindow = inputRef.current!.ownerDocument.defaultView!;
    let timer: number;
    const stop = () => {
      ownerWindow.clearTimeout(timer);
      ownerWindow.removeEventListener('pointerup', stop, true);
      ownerWindow.removeEventListener('pointercancel', stop, true);
      ownerWindow.removeEventListener('blur', stop);
      repeatCleanup.current = () => {};
    };
    const tick = () => {
      if (!stepValue(direction)) {
        stop();
        return;
      }
      timer = ownerWindow.setTimeout(tick, repeatInterval);
    };
    repeatCleanup.current = stop;
    ownerWindow.addEventListener('pointerup', stop, true);
    ownerWindow.addEventListener('pointercancel', stop, true);
    ownerWindow.addEventListener('blur', stop);
    timer = ownerWindow.setTimeout(tick, repeatDelay);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(event.currentTarget.value);
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
      data-steppers={showsSteppers || undefined}
      data-stepper-reverse={(showsSteppers && stepperReverse) || undefined}
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
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || !showsSteppers || !stepperReverse || disabled || readOnly)
            return;
          if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            stepValue(event.key === 'ArrowUp' ? -1 : 1);
          }
        }}
        readOnly={readOnly}
        value={value}
        data-slot="control"
      />

      {showsSteppers ? (
        <span className={styles.steppers} data-slot="steppers">
          <button
            type="button"
            className={styles.stepper}
            data-slot={stepperReverse ? 'decrease-action' : 'increase-action'}
            aria-label={stepperReverse ? labels.decreaseValue : labels.increaseValue}
            aria-controls={props.id}
            disabled={stepperReverse ? cannotDecrease : cannotIncrease}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.preventDefault();
              startRepeating(upDirection);
            }}
            onPointerLeave={stopRepeating}
            onClick={(event) => {
              if (!repeats || event.detail === 0) stepValue(upDirection);
            }}
          >
            <ChevronUpIcon aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.stepper}
            data-slot={stepperReverse ? 'increase-action' : 'decrease-action'}
            aria-label={stepperReverse ? labels.increaseValue : labels.decreaseValue}
            aria-controls={props.id}
            disabled={stepperReverse ? cannotIncrease : cannotDecrease}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.preventDefault();
              startRepeating(downDirection);
            }}
            onPointerLeave={stopRepeating}
            onClick={(event) => {
              if (!repeats || event.detail === 0) stepValue(downDirection);
            }}
          >
            <ChevronDownIcon aria-hidden="true" />
          </button>
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
            setNativeInputValue(input, '');
          }}
        >
          <CloseIcon aria-hidden="true" />
        </button>
      ) : null}

      {resolvedSuffix !== undefined && resolvedSuffix !== null ? (
        <span
          className={styles.adornment}
          data-slot={suffix !== undefined ? 'suffix' : 'trailing-icon'}
          aria-hidden="true"
        >
          {resolvedSuffix}
        </span>
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
