import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Field } from '../Field';
import { TimePicker } from './index';
describe('TimePicker visual contract', () => {
  it.each(['small', 'medium', 'large'] as const)(
    'retains %s density and semantic composition',
    (size) => {
      render(<TimePicker size={size} aria-label="Time" defaultValue="09:30" className="custom" />);
      const root = screen.getByLabelText('Time');
      expect(root).toHaveClass('custom');
      expect(root).toHaveAttribute('data-size', size);
    },
  );
  it('keeps the labelled native input and its ref while adding a decorative clock', () => {
    const ref = createRef<HTMLInputElement>();
    const { rerender } = render(
      <Field disabled required>
        <Field.Label>Start time</Field.Label>
        <TimePicker ref={ref} name="start" defaultValue="09:30" />
      </Field>,
    );
    const input = screen.getByLabelText(/^Start time/);
    expect(input).toHaveAccessibleName('Start time');
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('type', 'time');
    expect(input).toHaveValue('09:30');
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input.parentElement!.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    rerender(
      <Field readOnly>
        <Field.Label>Start time</Field.Label>
        <TimePicker ref={ref} name="start" defaultValue="09:30" />
      </Field>,
    );
    expect(ref.current).toBe(screen.getByLabelText('Start time'));
    expect(ref.current).toHaveAttribute('readonly');
    expect(ref.current).not.toBeDisabled();
  });
});
