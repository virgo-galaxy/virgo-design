import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ColorPicker, Field, Form } from '../../index';
function Fixture(props: React.ComponentProps<typeof ColorPicker>) {
  return (
    <ColorPicker {...props}>
      <ColorPicker.Input aria-label="Color" />
      <ColorPicker.Swatch value="#1A5CFF" />
      <ColorPicker.Swatch value="#16a34a" />
      <ColorPicker.Preview data-testid="preview" />
    </ColorPicker>
  );
}
describe('ColorPicker composition', () => {
  it('normalizes selection, synchronizes native picking and swatches, and submits HEX', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Form>
        <Field>
          <Field.Label>Accent</Field.Label>
          <Fixture name="accent" onValueChange={change} />
        </Field>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: '#1A5CFF' }));
    expect(change).toHaveBeenCalledWith('#1a5cff');
    expect(screen.getByLabelText('Color')).toHaveValue('#1a5cff');
    expect(screen.getByRole('button', { name: '#1A5CFF' })).toHaveAttribute('aria-pressed', 'true');
    expect(new FormData(screen.getByLabelText('Color').closest('form')!).get('accent')).toBe(
      '#1a5cff',
    );
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '#16a34a' } });
    expect(screen.getByTestId('preview')).toHaveAttribute('data-color', '#16a34a');
  });
  it('keeps controlled selection stable and blocks inherited read-only picking', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(<Fixture value="#16a34a" onValueChange={change} />);
    await user.click(screen.getByRole('button', { name: '#1A5CFF' }));
    expect(change).toHaveBeenCalledWith('#1a5cff');
    expect(screen.getByLabelText('Color')).toHaveValue('#16a34a');
    rerender(
      <Field readOnly>
        <Fixture value="#16a34a" onValueChange={change} />
      </Field>,
    );
    change.mockClear();
    expect(fireEvent.click(screen.getByLabelText('Color'))).toBe(false);
    expect(screen.getByRole('button', { name: '#1A5CFF' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '#1a5cff' } });
    expect(change).not.toHaveBeenCalled();
  });
});
