import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Field, Form, TimePicker } from '../../index';
describe('TimePicker native time contract', () => {
  it('associates the field and preserves native time constraints and FormData', () => {
    const change = vi.fn();
    render(
      <Form>
        <Field required>
          <Field.Label>Start</Field.Label>
          <TimePicker
            name="start"
            defaultValue="09:30"
            min="09:00"
            max="18:00"
            step={900}
            onValueChange={change}
          />
          <Field.Description>Hours</Field.Description>
        </Field>
      </Form>,
    );
    const input = screen.getByLabelText(/^Start/);
    expect(input).toHaveAttribute('type', 'time');
    expect(input).toHaveAttribute('aria-describedby');
    expect(new FormData(input.closest('form')!).get('start')).toBe('09:30');
    fireEvent.change(input, { target: { value: '10:00' } });
    expect(change).toHaveBeenCalledWith('10:00');
    fireEvent.change(input, { target: { value: '20:00' } });
    expect((input as HTMLInputElement).validity.rangeOverflow).toBe(true);
  });
  it('respects controlled and inherited read-only states', () => {
    const change = vi.fn();
    const { rerender } = render(
      <TimePicker aria-label="Time" value="09:30" onValueChange={change} />,
    );
    const input = screen.getByLabelText('Time');
    fireEvent.change(input, { target: { value: '10:00' } });
    expect(change).toHaveBeenCalledWith('10:00');
    expect(input).toHaveValue('09:30');
    rerender(
      <Field readOnly>
        <TimePicker aria-label="Time" value="09:30" onValueChange={change} />
      </Field>,
    );
    change.mockClear();
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '11:00' } });
    expect(change).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Time')).toHaveAttribute('readonly');
  });
});
