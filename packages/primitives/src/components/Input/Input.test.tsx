import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('renders a native text input by default', () => {
    render(<Input aria-label="Name" />);

    const input = screen.getByRole('textbox', { name: 'Name' });

    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('supports an explicit input type', () => {
    render(<Input aria-label="Email" type="email" />);

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'email');
  });

  it('forwards its ref to the native input', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} aria-label="Name" />);

    expect(ref.current).toBe(screen.getByRole('textbox', { name: 'Name' }));
  });

  it('supports native disabled and read-only behavior', () => {
    const { rerender } = render(<Input disabled aria-label="Name" />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled();

    rerender(<Input readOnly aria-label="Name" />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('readonly');
  });

  it('forwards native props and change events', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Input
        aria-label="Item name"
        autoComplete="off"
        data-testid="project-input"
        name="project"
        onChange={onChange}
        placeholder="Example"
      />,
    );

    const input = screen.getByTestId('project-input');

    expect(input).toHaveAttribute('name', 'project');
    expect(input).toHaveAttribute('autocomplete', 'off');
    expect(input).toHaveAttribute('placeholder', 'Example');

    await user.type(input, 'Design');

    expect(onChange).toHaveBeenCalled();
  });
});
