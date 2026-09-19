import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from './Textarea';
import type { TextareaSize } from './Textarea.types';

describe('Textarea', () => {
  it('uses the default medium size', () => {
    render(<Textarea aria-label="Description" />);

    expect(screen.getByRole('textbox', { name: 'Description' })).toHaveAttribute(
      'data-size',
      'medium',
    );
  });

  it.each<TextareaSize>(['mini', 'small', 'medium', 'large'])('supports the %s size', (size) => {
    render(<Textarea aria-label={`${size} textarea`} size={size} />);

    expect(screen.getByRole('textbox', { name: `${size} textarea` })).toHaveAttribute(
      'data-size',
      size,
    );
  });

  it('preserves native disabled and read-only states', () => {
    const { rerender } = render(<Textarea disabled aria-label="Description" />);

    let textarea = screen.getByRole('textbox', { name: 'Description' });
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('data-disabled', 'true');

    rerender(<Textarea readOnly aria-label="Description" />);

    textarea = screen.getByRole('textbox', { name: 'Description' });
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveAttribute('data-readonly', 'true');
  });

  it('maps the invalid prop to visual state and aria-invalid', () => {
    render(<Textarea invalid aria-label="Description" />);

    const textarea = screen.getByRole('textbox', { name: 'Description' });

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('data-invalid', 'true');
  });

  it('honors an explicit aria-invalid value for the visual state', () => {
    render(<Textarea aria-invalid="grammar" aria-label="Description" />);

    const textarea = screen.getByRole('textbox', { name: 'Description' });

    expect(textarea).toHaveAttribute('aria-invalid', 'grammar');
    expect(textarea).toHaveAttribute('data-invalid', 'true');
  });

  it('forwards native props, className, events, and refs through the primitive', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = createRef<HTMLTextAreaElement>();

    render(
      <Textarea
        ref={ref}
        aria-label="Description"
        className="consumer-textarea"
        name="description"
        onChange={onChange}
        placeholder="Describe the project"
        rows={4}
      />,
    );

    const textarea = screen.getByRole('textbox', { name: 'Description' });

    expect(textarea).toHaveClass('consumer-textarea');
    expect(textarea).toHaveAttribute('name', 'description');
    expect(textarea).toHaveAttribute('placeholder', 'Describe the project');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(ref.current).toBe(textarea);

    await user.type(textarea, 'Virgo');

    expect(onChange).toHaveBeenCalled();
  });
});
