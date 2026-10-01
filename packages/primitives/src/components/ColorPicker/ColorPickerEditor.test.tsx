import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ColorPicker, Field, Form } from '../../index';
function Editor(props: React.ComponentProps<typeof ColorPicker>) {
  return (
    <ColorPicker {...props}>
      <ColorPicker.HexField aria-label="HEX" />
      <ColorPicker.ChannelField channel="r" aria-label="Red" />
      <ColorPicker.Area saturationLabel="Saturation" brightnessLabel="Brightness" />
      <ColorPicker.Hue aria-label="Hue" />
      <ColorPicker.Preview data-testid="preview" />
    </ColorPicker>
  );
}
describe('ColorPicker editor contract', () => {
  it('shares canonical form values across HEX, RGB and HSV edits and restores invalid drafts', async () => {
    const user = userEvent.setup();
    render(
      <Form aria-label="Form">
        <Editor defaultValue="#ff0000" name="color" />
      </Form>,
    );
    const hex = screen.getByRole('textbox', { name: 'HEX' });
    await user.clear(hex);
    await user.type(hex, '#123456');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('spinbutton', { name: 'Red' })).toHaveValue(18);
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('color')).toBe('#123456');
    await user.clear(hex);
    await user.type(hex, 'invalid');
    await user.tab();
    expect(hex).toHaveValue('#123456');
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Red' }), { target: { value: '255' } });
    expect(hex).toHaveValue('#ff3456');
    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), { target: { value: '120' } });
    fireEvent.change(screen.getByRole('slider', { name: 'Saturation' }), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByRole('slider', { name: 'Brightness' }), {
      target: { value: '100' },
    });
    expect(hex).toHaveValue('#00ff00');
    expect(screen.getByTestId('preview')).toHaveAttribute('data-color', '#00ff00');
  });
  it('keeps hue and saturation while traversing black and neutral colors', () => {
    render(<Editor defaultValue="#ff0000" />);
    fireEvent.change(screen.getByRole('slider', { name: 'Brightness' }), {
      target: { value: '0' },
    });
    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), { target: { value: '240' } });
    fireEvent.change(screen.getByRole('slider', { name: 'Brightness' }), {
      target: { value: '100' },
    });
    expect(screen.getByRole('textbox')).toHaveValue('#0000ff');
    fireEvent.change(screen.getByRole('slider', { name: 'Saturation' }), {
      target: { value: '0' },
    });
    fireEvent.change(screen.getByRole('slider', { name: 'Saturation' }), {
      target: { value: '100' },
    });
    expect(screen.getByRole('textbox')).toHaveValue('#0000ff');
  });
  it('respects controlled updates, inherited readOnly and disabled form exclusion', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(<Editor value="#123456" onValueChange={change} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '200' } });
    expect(change).toHaveBeenCalledWith('#c83456');
    expect(screen.getByRole('textbox')).toHaveValue('#123456');
    rerender(<Editor value="#abcdef" />);
    expect(screen.getByRole('textbox')).toHaveValue('#abcdef');
    rerender(
      <Form readOnly>
        <Editor onValueChange={change} />
      </Form>,
    );
    change.mockClear();
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), { target: { value: '30' } });
    await user.click(screen.getByRole('textbox'));
    expect(change).not.toHaveBeenCalled();
    rerender(
      <Form aria-label="Form" disabled>
        <Editor name="color" />
      </Form>,
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).has('color')).toBe(false);
  });
  it('supports pointer geometry, cancellation, capture and ref forwarding', () => {
    const ref = createRef<HTMLDivElement>();
    const change = vi.fn();
    render(
      <ColorPicker defaultValue="#ff0000" onValueChange={change}>
        <ColorPicker.Area ref={ref} saturationLabel="S" brightnessLabel="V" />
      </ColorPicker>,
    );
    Object.defineProperty(ref.current!, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 100, height: 100 }),
    });
    fireEvent.pointerDown(ref.current!, { button: 0, clientX: 100, clientY: 50, pointerId: 1 });
    expect(change).toHaveBeenCalledWith('#800000');
  });
});

it('honors descendant Field associations and disabled/readOnly overrides in editor parts', () => {
  const change = vi.fn();
  render(
    <ColorPicker onValueChange={change}>
      <Field readOnly>
        <Field.Label>HEX value</Field.Label>
        <Field.Description>Opaque sRGB</Field.Description>
        <ColorPicker.HexField />
      </Field>
      <Field disabled>
        <Field.Label>Red channel</Field.Label>
        <ColorPicker.ChannelField channel="r" />
      </Field>
    </ColorPicker>,
  );
  const hex = screen.getByRole('textbox', { name: 'HEX value' });
  expect(hex).toHaveAttribute('readonly');
  expect(hex).toHaveAccessibleDescription('Opaque sRGB');
  expect(screen.getByRole('spinbutton', { name: 'Red channel' })).toBeDisabled();
  fireEvent.change(hex, { target: { value: '#123456' } });
  fireEvent.blur(hex);
  expect(change).not.toHaveBeenCalled();
});
