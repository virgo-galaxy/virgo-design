import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Field, Form, Slider } from '../../index';
describe('Slider native range contract', () => {
  it('uses field semantics and native bounds/step, and reports numeric changes', () => {
    const change = vi.fn();
    render(
      <Field required invalid>
        <Field.Label>Volume</Field.Label>
        <Slider defaultValue={4} min={0} max={10} step={2} name="volume" onValueChange={change} />
        <Field.Description>Help</Field.Description>
      </Field>,
    );
    const input = screen.getByRole('slider', { name: 'Volume' });
    expect(input).toHaveValue('4');
    expect(input).toHaveAttribute('step', '2');
    expect(input).toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    fireEvent.change(input, { target: { value: '6' } });
    expect(change).toHaveBeenCalledWith(6);
    expect(input).toHaveValue('6');
  });
  it('keeps controlled values authoritative and canceled changes inert', () => {
    const change = vi.fn();
    const { rerender } = render(<Slider aria-label="Value" value={20} onValueChange={change} />);
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '30' } });
    expect(change).toHaveBeenCalledWith(30);
    expect(input).toHaveValue('20');
    rerender(
      <Slider
        aria-label="Value"
        value={20}
        onChange={(e) => e.preventDefault()}
        onValueChange={change}
      />,
    );
    change.mockClear();
    fireEvent.change(input, { target: { value: '40' } });
    expect(change).not.toHaveBeenCalled();
  });
  it('inherits read-only and disabled state and preserves native form submission', () => {
    const change = vi.fn();
    render(
      <Form readOnly>
        <Field>
          <Field.Label>Volume</Field.Label>
          <Slider defaultValue={40} name="volume" onValueChange={change} />
        </Field>
        <Field disabled>
          <Field.Label>Locked</Field.Label>
          <Slider />
        </Field>
      </Form>,
    );
    const input = screen.getByRole('slider', { name: 'Volume' });
    fireEvent.change(input, { target: { value: '60' } });
    expect(input).toHaveValue('40');
    expect(change).not.toHaveBeenCalled();
    expect(fireEvent.keyDown(input, { key: 'ArrowRight' })).toBe(false);
    expect(screen.getByRole('slider', { name: 'Locked' })).toBeDisabled();
    expect(new FormData(input.closest('form')!).get('volume')).toBe('40');
  });
});
