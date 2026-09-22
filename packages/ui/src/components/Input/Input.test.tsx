import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
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
