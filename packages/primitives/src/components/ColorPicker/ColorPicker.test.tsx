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
  it('preserves opacity through native, RGB and HSV edits and submits the alpha byte', () => {
    const { rerender } = render(
      <form>
        <ColorPicker defaultValue="#1664f980" name="color">
          <ColorPicker.Input aria-label="Color" />
          <ColorPicker.ChannelField channel="r" aria-label="Red" />
          <ColorPicker.Hue aria-label="Hue" />
          <ColorPicker.Opacity aria-label="Opacity" />
          <ColorPicker.AlphaField aria-label="Opacity percentage" />
          <ColorPicker.HexField includeAlpha={false} aria-label="HEX" />
          <ColorPicker.Value data-testid="value" />
        </ColorPicker>
      </form>,
    );
    expect(screen.getByLabelText('Color')).toHaveValue('#1664f9');
    expect(screen.getByLabelText('Opacity')).toHaveValue('50');
    fireEvent.change(screen.getByLabelText('Red'), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText('Hue'), { target: { value: '180' } });
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '#ff0000' } });
    expect(screen.getByTestId('value')).toHaveTextContent('#FF000080');
    fireEvent.change(screen.getByLabelText('HEX'), { target: { value: '#123456' } });
    fireEvent.blur(screen.getByLabelText('HEX'));
    expect(screen.getByTestId('value')).toHaveTextContent('#12345680');
    fireEvent.change(screen.getByLabelText('Opacity percentage'), { target: { value: '25' } });
    expect(screen.getByLabelText('Opacity')).toHaveValue('25');
    expect(new FormData(document.querySelector('form')!).get('color')).toBe('#12345640');
    fireEvent.change(screen.getByLabelText('Opacity'), { target: { value: '100' } });
    expect(screen.getByTestId('value')).toHaveTextContent('#123456');
    const change = vi.fn();
    rerender(
      <ColorPicker value="#1664f980" readOnly onValueChange={change}>
        <ColorPicker.Opacity aria-label="Opacity" />
        <ColorPicker.AlphaField aria-label="Opacity percentage" />
      </ColorPicker>,
    );
    fireEvent.change(screen.getByLabelText('Opacity'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Opacity percentage'), { target: { value: '75' } });
    expect(change).not.toHaveBeenCalled();
  });
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
