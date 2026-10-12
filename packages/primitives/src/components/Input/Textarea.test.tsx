import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a native textarea', () => {
    render(<Textarea aria-label="Description" />);

    expect(screen.getByRole('textbox', { name: 'Description' }).tagName).toBe('TEXTAREA');
  });

  it('forwards its ref to the native textarea', () => {
    const ref = createRef<HTMLTextAreaElement>();

    render(<Textarea ref={ref} aria-label="Description" />);

    expect(ref.current).toBe(screen.getByRole('textbox', { name: 'Description' }));
  });

  it('supports native disabled and read-only behavior', () => {
    const { rerender } = render(<Textarea disabled aria-label="Description" />);

    expect(screen.getByRole('textbox', { name: 'Description' })).toBeDisabled();

    rerender(<Textarea readOnly aria-label="Description" />);

    expect(screen.getByRole('textbox', { name: 'Description' })).toHaveAttribute('readonly');
  });

  it('forwards native props and change events', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Textarea
        aria-label="Description"
        data-testid="description-textarea"
        name="description"
        onChange={onChange}
        placeholder="Describe the item"
        rows={4}
      />,
    );

    const textarea = screen.getByTestId('description-textarea');

    expect(textarea).toHaveAttribute('name', 'description');
    expect(textarea).toHaveAttribute('placeholder', 'Describe the item');
    expect(textarea).toHaveAttribute('rows', '4');

    await user.type(textarea, 'Example');

    expect(onChange).toHaveBeenCalled();
  });
});
