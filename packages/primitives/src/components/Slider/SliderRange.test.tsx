import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { Field, Form, Slider } from '../../index';

it('edits three ordered values without crossing neighbors and exposes each thumb limit', () => {
  render(
    <Slider.Range defaultValue={[20, 50, 80]} thumbLabels={['Minimum', 'Current', 'Maximum']} />,
  );
  const minimum = screen.getByRole('slider', { name: 'Minimum' });
  const current = screen.getByRole('slider', { name: 'Current' });
  const maximum = screen.getByRole('slider', { name: 'Maximum' });
  fireEvent.keyDown(current, { key: 'ArrowRight' });
  expect(current).toHaveAttribute('aria-valuenow', '51');
  expect(minimum).toHaveAttribute('aria-valuemax', '51');
  fireEvent.keyDown(minimum, { key: 'End' });
  expect(minimum).toHaveAttribute('aria-valuenow', '51');
  fireEvent.keyDown(current, { key: 'Home' });
  expect(current).toHaveAttribute('aria-valuenow', '51');
  fireEvent.keyDown(maximum, { key: 'Home' });
  expect(maximum).toHaveAttribute('aria-valuenow', '51');
  expect(screen.getAllByRole('slider').map((thumb) => thumb.getAttribute('aria-label'))).toEqual([
    'Minimum',
    'Current',
    'Maximum',
  ]);
});

it('keeps controlled values authoritative and respects canceled keyboard edits', () => {
  const change = vi.fn();
  const { rerender } = render(
    <Slider.Range value={[10, 30]} onValueChange={change} thumbLabels={['Start', 'End']} />,
  );
  fireEvent.keyDown(screen.getByRole('slider', { name: 'Start' }), { key: 'ArrowRight' });
  expect(change).toHaveBeenCalledWith([11, 30]);
  expect(screen.getByRole('slider', { name: 'Start' })).toHaveAttribute('aria-valuenow', '10');
  rerender(
    <Slider.Range
      value={[10, 30]}
      onValueChange={change}
      onKeyDown={(event) => event.preventDefault()}
      thumbLabels={['Start', 'End']}
    />,
  );
  change.mockClear();
  fireEvent.keyDown(screen.getByRole('slider', { name: 'Start' }), { key: 'End' });
  expect(change).not.toHaveBeenCalled();
});

it('inherits field state, submits ordered values and resets uncontrolled values with the form', () => {
  const { rerender } = render(
    <Form>
      <Field>
        <Slider.Range
          name="widths"
          defaultValue={[20, 50, 80]}
          thumbLabels={['Minimum', 'Current', 'Maximum']}
        />
      </Field>
    </Form>,
  );
  const current = screen.getByRole('slider', { name: 'Current' });
  const form = current.closest('form')!;
  fireEvent.keyDown(current, { key: 'ArrowRight' });
  expect(new FormData(form).getAll('widths')).toEqual(['20', '51', '80']);
  fireEvent.reset(form);
  expect(current).toHaveAttribute('aria-valuenow', '50');
  rerender(
    <Form readOnly>
      <Field>
        <Slider.Range
          name="widths"
          defaultValue={[20, 50, 80]}
          thumbLabels={['Minimum', 'Current', 'Maximum']}
        />
      </Field>
    </Form>,
  );
  fireEvent.keyDown(current, { key: 'End' });
  expect(current).toHaveAttribute('aria-readonly', 'true');
  expect(current).toHaveAttribute('aria-valuenow', '50');
  rerender(
    <Form disabled>
      <Field>
        <Slider.Range
          name="widths"
          defaultValue={[20, 50, 80]}
          thumbLabels={['Minimum', 'Current', 'Maximum']}
        />
      </Field>
    </Form>,
  );
  expect(current).toHaveAttribute('aria-disabled', 'true');
  expect(current).toHaveAttribute('tabindex', '-1');
  expect(new FormData(form).getAll('widths')).toEqual([]);
});

it('moves the nearest thumb on track clicks, constrains pointer dragging and restores canceled drags', () => {
  const thumbFocus = vi.fn();
  render(
    <Slider.Range
      defaultValue={[20, 50, 80]}
      aria-label="Width"
      thumbLabels={['Minimum', 'Current', 'Maximum']}
      onThumbFocus={thumbFocus}
    />,
  );
  const group = screen.getByRole('group', { name: 'Width' });
  vi.spyOn(group.querySelector('[data-slot="track"]')!, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    width: 100,
  } as DOMRect);
  const pointer = (
    type: 'pointerDown' | 'pointerMove' | 'pointerCancel' | 'pointerUp',
    target: HTMLElement,
    x: number,
  ) => {
    const event = createEvent[type](target);
    Object.defineProperties(event, {
      clientX: { value: x },
      button: { value: 0 },
      pointerId: { value: 1 },
    });
    fireEvent(target, event);
  };
  pointer('pointerDown', group, 55);
  const current = screen.getByRole('slider', { name: 'Current' });
  expect(thumbFocus).toHaveBeenLastCalledWith(1);
  expect(current).toHaveAttribute('aria-valuenow', '55');
  pointer('pointerMove', group, 99);
  expect(current).toHaveAttribute('aria-valuenow', '80');
  pointer('pointerCancel', group, 99);
  expect(current).toHaveAttribute('aria-valuenow', '50');
  pointer('pointerDown', screen.getByRole('slider', { name: 'Minimum' }), 0);
  pointer('pointerUp', group, 0);
  expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveAttribute('aria-valuenow', '0');
  expect(thumbFocus).toHaveBeenLastCalledWith(0);
  fireEvent.focus(screen.getByRole('slider', { name: 'Maximum' }));
  expect(thumbFocus).toHaveBeenLastCalledWith(2);
});
