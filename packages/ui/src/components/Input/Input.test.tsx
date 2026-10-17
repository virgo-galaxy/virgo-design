import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { LocaleProvider, zhCN } from '../../locale';
import { Input } from './Input';
import type { InputSize } from './Input.types';

describe('Input', () => {
  it('uses the default medium size', () => {
    render(<Input aria-label="Name" />);

    const input = screen.getByRole('textbox', { name: 'Name' });

    expect(input.parentElement).toHaveAttribute('data-size', 'medium');
  });

  it.each<InputSize>(['mini', 'small', 'medium', 'large'])('supports the %s size', (size) => {
    render(<Input aria-label={`${size} input`} size={size} />);

    expect(screen.getByRole('textbox', { name: `${size} input` }).parentElement).toHaveAttribute(
      'data-size',
      size,
    );
  });

  it('renders prefix and suffix without taking focus from the input', () => {
    render(
      <Input
        aria-label="Email"
        prefix={<svg data-testid="prefix" />}
        suffix={<svg data-testid="suffix" />}
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Email' });
    const prefix = screen.getByTestId('prefix').parentElement;
    const suffix = screen.getByTestId('suffix').parentElement;

    expect(prefix).toHaveAttribute('data-slot', 'prefix');
    expect(prefix).toHaveAttribute('aria-hidden', 'true');
    expect(suffix).toHaveAttribute('data-slot', 'suffix');
    expect(suffix).toHaveAttribute('aria-hidden', 'true');
    expect(prefix).not.toHaveAttribute('tabindex');
    expect(suffix).not.toHaveAttribute('tabindex');

    input.focus();
    suffix?.click();
    expect(input).toHaveFocus();
  });

  it('clears an uncontrolled value, emits onChange, and keeps focus', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Input clearable aria-label="Item" defaultValue="Example" onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: 'Item' });
    await user.click(screen.getByRole('button', { name: 'Clear input' }));

    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('button', { name: 'Clear input' })).not.toBeInTheDocument();
  });

  it('requests a controlled value change through onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function ControlledInput() {
      const [value, setValue] = useState('Example');

      return (
        <Input
          clearable
          aria-label="Item"
          value={value}
          onChange={(event) => {
            onChange(event.currentTarget.value);
            setValue(event.currentTarget.value);
          }}
        />
      );
    }

    render(<ControlledInput />);

    const input = screen.getByRole('textbox', { name: 'Item' });
    await user.click(screen.getByRole('button', { name: 'Clear input' }));

    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('preserves native disabled and read-only states', () => {
    const { rerender } = render(<Input disabled aria-label="Name" />);

    let input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toBeDisabled();
    expect(input.parentElement).toHaveAttribute('data-disabled', 'true');

    rerender(<Input readOnly aria-label="Name" />);

    input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAttribute('readonly');
    expect(input.parentElement).toHaveAttribute('data-readonly', 'true');
  });

  it('maps the invalid prop to visual state and aria-invalid', () => {
    render(<Input invalid aria-label="Slug" />);

    const input = screen.getByRole('textbox', { name: 'Slug' });

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.parentElement).toHaveAttribute('data-invalid', 'true');
  });

  it('honors an explicit aria-invalid value for the visual state', () => {
    render(<Input aria-invalid="spelling" aria-label="Slug" />);

    const input = screen.getByRole('textbox', { name: 'Slug' });

    expect(input).toHaveAttribute('aria-invalid', 'spelling');
    expect(input.parentElement).toHaveAttribute('data-invalid', 'true');
  });

  it('forwards native props, className, events, and refs through the primitive', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();

    render(
      <Input
        ref={ref}
        aria-label="Item name"
        className="consumer-input"
        name="project"
        onChange={onChange}
        placeholder="Example"
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Item name' });

    expect(input).toHaveClass('consumer-input');
    expect(input).toHaveAttribute('name', 'project');
    expect(input).toHaveAttribute('placeholder', 'Example');
    expect(ref.current).toBe(input);

    await user.type(input, 'Design');

    expect(onChange).toHaveBeenCalled();
  });

  it('releases resources returned by a consumer ref when the input unmounts', () => {
    const release = vi.fn();
    const attach = vi.fn(() => release);
    const { unmount } = render(<Input ref={attach} aria-label="Observed input" />);

    expect(attach).toHaveBeenCalledWith(screen.getByRole('textbox'));

    unmount();

    expect(release).toHaveBeenCalledOnce();
    expect(attach).toHaveBeenCalledOnce();
  });
});

describe('Input numeric steppers', () => {
  it('steps a controlled value, emits native changes, keeps focus and disables at bounds', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function ControlledNumber() {
      const [value, setValue] = useState('64');
      return (
        <Input
          type="number"
          steppers
          aria-label="Height"
          min={63}
          max={65}
          value={value}
          onChange={(event) => {
            onChange(event.currentTarget.value);
            setValue(event.currentTarget.value);
          }}
          suffix="px"
        />
      );
    }
    render(<ControlledNumber />);
    const input = screen.getByRole('spinbutton', { name: 'Height' });
    const increase = screen.getByRole('button', { name: 'Increase value' });
    const decrease = screen.getByRole('button', { name: 'Decrease value' });
    await user.click(increase);
    expect(input).toHaveValue(65);
    expect(input).toHaveFocus();
    expect(onChange).toHaveBeenLastCalledWith('65');
    expect(increase).toBeDisabled();
    await user.click(increase);
    expect(onChange).toHaveBeenCalledTimes(1);
    await user.click(decrease);
    await user.click(decrease);
    expect(input).toHaveValue(63);
    expect(decrease).toBeDisabled();
    expect(increase).toBeEnabled();
  });
  it('honors fractional steps and native step alignment for uncontrolled fields', async () => {
    const user = userEvent.setup();
    render(
      <Input
        type="number"
        steppers
        aria-label="Amount"
        defaultValue={0.5}
        min={0.1}
        max={1.1}
        step={0.2}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Increase value' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(0.7);
    await user.click(screen.getByRole('button', { name: 'Decrease value' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(0.5);
  });
  it('initializes empty values using native numeric bounds and does not submit forms', async () => {
    const user = userEvent.setup();
    const submit = vi.fn((event) => event.preventDefault());
    render(
      <form onSubmit={submit}>
        <Input type="number" steppers aria-label="Height" min={48} max={96} />
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Increase value' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(48);
    expect(submit).not.toHaveBeenCalled();
  });
  it('disables stepping for disabled and read-only inputs', () => {
    const { rerender } = render(<Input type="number" steppers aria-label="Count" disabled />);
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled();
    rerender(<Input type="number" steppers aria-label="Count" readOnly />);
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled();
  });
  it('does not add step actions to text inputs or step="any"', () => {
    const { rerender } = render(<Input steppers aria-label="Name" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    rerender(<Input type="number" steppers step="any" aria-label="Amount" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
  it('supports localized labels and keyboard activation without changing input focus behavior', async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider locale={zhCN}>
        <Input type="number" steppers aria-label="高度" defaultValue={64} />
      </LocaleProvider>,
    );
    await user.tab();
    await user.tab();
    expect(screen.getByRole('button', { name: '增加数值' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('spinbutton')).toHaveValue(65);
    expect(screen.getByRole('spinbutton')).toHaveFocus();
  });
});

describe('Input held stepping', () => {
  it('steps immediately, waits for the delay, repeats, and stops on step C without a final extra click', () => {
    vi.useFakeTimers();
    try {
      render(<Input type="number" steppers aria-label="Count" defaultValue={4} max={20} />);
      const input = screen.getByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Increase value' });
      fireEvent.pointerDown(button, { button: 0 });
      expect(input).toHaveValue(5);
      act(() => vi.advanceTimersByTime(399));
      expect(input).toHaveValue(5);
      act(() => vi.advanceTimersByTime(161));
      expect(input).toHaveValue(8);
      fireEvent.pointerUp(window);
      fireEvent.click(button, { detail: 1 });
      act(() => vi.advanceTimersByTime(500));
      expect(input).toHaveValue(8);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
  it.each(['pointerCancel', 'pointerLeave', 'blur', 'unmount', 'disabled'] as const)(
    'stops pending repetition on %s',
    (reason) => {
      vi.useFakeTimers();
      try {
        const onChange = vi.fn();
        const { unmount, rerender } = render(
          <Input type="number" steppers aria-label="Count" defaultValue={10} onChange={onChange} />,
        );
        const button = screen.getByRole('button', { name: 'Decrease value' });
        fireEvent.pointerDown(button, { button: 0 });
        expect(onChange).toHaveBeenCalledTimes(1);
        if (reason === 'unmount') unmount();
        else if (reason === 'disabled')
          rerender(
            <Input
              type="number"
              steppers
              aria-label="Count"
              defaultValue={10}
              onChange={onChange}
              disabled
            />,
          );
        else if (reason === 'blur') fireEvent(window, new Event('blur'));
        else fireEvent[reason](button);
        act(() => vi.advanceTimersByTime(1000));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(vi.getTimerCount()).toBe(0);
      } finally {
        vi.useRealTimers();
      }
    },
  );
  it('honors configurable repeat timing and stops at native bounds', () => {
    vi.useFakeTimers();
    try {
      render(
        <Input
          type="number"
          steppers
          stepperRepeat={{ delay: 100, interval: 50 }}
          aria-label="Count"
          defaultValue={4}
          max={8}
        />,
      );
      fireEvent.pointerDown(screen.getByRole('button', { name: 'Increase value' }), { button: 0 });
      act(() => vi.advanceTimersByTime(99));
      expect(screen.getByRole('spinbutton')).toHaveValue(5);
      act(() => vi.advanceTimersByTime(1));
      expect(screen.getByRole('spinbutton')).toHaveValue(6);
      act(() => vi.advanceTimersByTime(500));
      expect(screen.getByRole('spinbutton')).toHaveValue(8);
      expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
  it('can disable repetition while preserving ordinary clicks', () => {
    vi.useFakeTimers();
    try {
      render(
        <Input type="number" steppers stepperRepeat={false} aria-label="Count" defaultValue={4} />,
      );
      const button = screen.getByRole('button', { name: 'Increase value' });
      fireEvent.pointerDown(button, { button: 0 });
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.getByRole('spinbutton')).toHaveValue(4);
      fireEvent.pointerUp(window);
      fireEvent.click(button, { detail: 1 });
      expect(screen.getByRole('spinbutton')).toHaveValue(5);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('Input reversed steppers', () => {
  it('reverses arrow actions, keyboard directions and accessible labels together', async () => {
    const user = userEvent.setup();
    render(
      <Input
        type="number"
        steppers
        stepperReverse
        aria-label="Height"
        defaultValue={64}
        min={63}
        max={65}
      />,
    );
    const input = screen.getByRole('spinbutton');
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAccessibleName('Decrease value');
    expect(buttons[1]).toHaveAccessibleName('Increase value');
    await user.click(buttons[0]!);
    expect(input).toHaveValue(63);
    expect(buttons[0]).toBeDisabled();
    await user.keyboard('{ArrowDown}');
    expect(input).toHaveValue(64);
    await user.keyboard('{ArrowUp}');
    expect(input).toHaveValue(63);
    await user.click(buttons[1]!);
    await user.click(buttons[1]!);
    expect(input).toHaveValue(65);
    expect(buttons[1]).toBeDisabled();
  });
  it('respects consumer key cancellation before reversed stepping', async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn((event) => event.preventDefault());
    render(
      <Input
        type="number"
        steppers
        stepperReverse
        aria-label="Height"
        defaultValue={64}
        onKeyDown={onKeyDown}
      />,
    );
    await user.click(screen.getByRole('spinbutton'));
    await user.keyboard('{ArrowUp}{ArrowDown}');
    expect(screen.getByRole('spinbutton')).toHaveValue(64);
    expect(onKeyDown).toHaveBeenCalledTimes(2);
  });
  it('reverses held repetition and cancels a hold when its direction changes', () => {
    vi.useFakeTimers();
    try {
      const { rerender } = render(
        <Input
          type="number"
          steppers
          stepperReverse
          stepperRepeat={{ delay: 50, interval: 20 }}
          aria-label="Height"
          defaultValue={64}
          min={61}
        />,
      );
      fireEvent.pointerDown(screen.getByRole('button', { name: 'Decrease value' }), { button: 0 });
      act(() => vi.advanceTimersByTime(200));
      expect(screen.getByRole('spinbutton')).toHaveValue(61);
      expect(vi.getTimerCount()).toBe(0);
      fireEvent.pointerDown(screen.getByRole('button', { name: 'Increase value' }), { button: 0 });
      expect(screen.getByRole('spinbutton')).toHaveValue(62);
      rerender(
        <Input
          type="number"
          steppers
          stepperReverse={false}
          stepperRepeat={{ delay: 50, interval: 20 }}
          aria-label="Height"
          defaultValue={64}
          min={61}
        />,
      );
      act(() => vi.advanceTimersByTime(200));
      expect(screen.getByRole('spinbutton')).toHaveValue(62);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('Input.Password', () => {
  it('hides the password by default and forwards native props', () => {
    render(
      <Input.Password
        aria-label="Password"
        autoComplete="current-password"
        defaultValue="mypassword"
      />,
    );

    const input = screen.getByLabelText('Password');

    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('autocomplete', 'current-password');
    expect(input).toHaveValue('mypassword');
    expect(screen.getByRole('button', { name: 'Show password' })).toContainElement(
      document.querySelector('[data-icon="eye-closed"]'),
    );
  });

  it('toggles visibility without changing the value or input focus', async () => {
    const user = userEvent.setup();

    render(<Input.Password aria-label="Password" defaultValue="mypassword" />);

    const input = screen.getByLabelText('Password');
    await user.click(input);
    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('mypassword');
    expect(input).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Hide password' })).toContainElement(
      document.querySelector('[data-icon="eye"]'),
    );
  });

  it('supports keyboard activation and updates the accessible label', async () => {
    const user = userEvent.setup();

    render(<Input.Password aria-label="Password" />);

    await user.tab();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Show password' })).toHaveFocus();

    await user.keyboard('{Enter}');

    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
  });
});

it('customizes the frame independently while forwarding native refs and field labels', async () => {
  const user = userEvent.setup();
  const ref = createRef<HTMLInputElement>();
  render(
    <Input ref={ref} aria-label="HEX" rootClassName="frame-style" className="control-style" />,
  );
  expect(ref.current).toHaveClass('control-style');
  expect(ref.current!.parentElement).toHaveClass('frame-style');
  await user.type(screen.getByRole('textbox', { name: 'HEX' }), '#123456');
  expect(ref.current).toHaveValue('#123456');
});
