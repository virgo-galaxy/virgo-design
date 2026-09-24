import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

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

  it('renders leading and trailing icons as decorative content', () => {
    render(
      <Input
        aria-label="Search"
        leadingIcon={<svg data-testid="leading-icon" />}
        trailingIcon={<svg data-testid="trailing-icon" />}
      />,
    );

    expect(screen.getByTestId('leading-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('trailing-icon').parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
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

    render(<Input clearable aria-label="Project" defaultValue="Virgo" onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: 'Project' });
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
      const [value, setValue] = useState('Virgo');

      return (
        <Input
          clearable
          aria-label="Project"
          value={value}
          onChange={(event) => {
            onChange(event.currentTarget.value);
            setValue(event.currentTarget.value);
          }}
        />
      );
    }

    render(<ControlledInput />);

    const input = screen.getByRole('textbox', { name: 'Project' });
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
        aria-label="Project name"
        className="consumer-input"
        name="project"
        onChange={onChange}
        placeholder="Virgo"
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Project name' });

    expect(input).toHaveClass('consumer-input');
    expect(input).toHaveAttribute('name', 'project');
    expect(input).toHaveAttribute('placeholder', 'Virgo');
    expect(ref.current).toBe(input);

    await user.type(input, 'Design');

    expect(onChange).toHaveBeenCalled();
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
