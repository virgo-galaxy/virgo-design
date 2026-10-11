import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

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

describe('TimePicker themed selection', () => {
  it('opens from the input or clock, selects immediately and retains native form submission', async () => {
    const changed = vi.fn();
    render(
      <form aria-label="Time form">
        <TimePicker aria-label="Time" name="start" defaultValue="09:30" onValueChange={changed} />
      </form>,
    );
    fireEvent.click(screen.getByLabelText('Time'));
    const dialog = await screen.findByRole('dialog', { name: 'Choose time' });
    expect(within(dialog).queryByRole('button', { name: 'Done' })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole('button', { name: 'Clear input' })).not.toBeInTheDocument();
    fireEvent.click(
      within(screen.getByRole('listbox', { name: 'Hours' })).getByRole('option', { name: '10' }),
    );
    fireEvent.click(
      within(screen.getByRole('listbox', { name: 'Minutes' })).getByRole('option', { name: '45' }),
    );
    expect(screen.getByLabelText('Time')).toHaveValue('10:45');
    expect(changed).toHaveBeenLastCalledWith('10:45');
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('start')).toBe('10:45');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Choose time' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });
  it('preserves controlled updates and cancellable change events', async () => {
    function Example() {
      const [value, setValue] = useState('09:30');
      return (
        <TimePicker
          aria-label="Time"
          value={value}
          onValueChange={setValue}
          onChange={(event) => {
            if (event.currentTarget.value === '11:30') event.preventDefault();
          }}
        />
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByLabelText('Time'));
    const column = within(await screen.findByRole('listbox', { name: 'Hours' }));
    fireEvent.click(column.getByRole('option', { name: '10' }));
    expect(screen.getByLabelText('Time')).toHaveValue('10:30');
    fireEvent.click(column.getByRole('option', { name: '11' }));
    expect(screen.getByLabelText('Time')).toHaveValue('10:30');
  });
  it('respects native bounds and step, and can show seconds and footer actions', async () => {
    render(
      <TimePicker
        aria-label="Time"
        defaultValue="09:30:15"
        min="09:00"
        max="18:00"
        step={15}
        showSeconds
        showClear
        showConfirm
      />,
    );
    fireEvent.click(screen.getByLabelText('Time'));
    const hour = within(await screen.findByRole('listbox', { name: 'Hours' }));
    expect(hour.getByRole('option', { name: '08' })).toBeDisabled();
    expect(hour.getByRole('option', { name: '19' })).toBeDisabled();
    const seconds = within(screen.getByRole('listbox', { name: 'Seconds' }));
    expect(seconds.getByRole('option', { name: '16' })).toBeDisabled();
    fireEvent.click(seconds.getByRole('option', { name: '45' }));
    expect(screen.getByLabelText('Time')).toHaveValue('09:30:45');
    fireEvent.click(screen.getByRole('button', { name: 'Clear input' }));
    expect(screen.getByLabelText('Time')).toHaveValue('');
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
  it('loops enabled options with the keyboard and supports disabling the loop and seconds', async () => {
    const { rerender } = render(<TimePicker aria-label="Time" defaultValue="23:59" loop />);
    fireEvent.keyDown(screen.getByLabelText('Time'), { key: 'ArrowDown', altKey: true });
    const hour = await screen.findByRole('listbox', { name: 'Hours' });
    fireEvent.keyDown(within(hour).getByRole('option', { name: '23' }), { key: 'ArrowDown' });
    expect(screen.getByLabelText('Time')).toHaveValue('00:59');
    fireEvent.keyDown(
      within(screen.getByRole('listbox', { name: 'Minutes' })).getByRole('option', { name: '59' }),
      { key: 'ArrowDown' },
    );
    expect(screen.getByLabelText('Time')).toHaveValue('00:00');
    rerender(<TimePicker aria-label="Time" value="23:59:15" loop={false} showSeconds={false} />);
    expect(screen.queryByRole('listbox', { name: 'Seconds' })).not.toBeInTheDocument();
    fireEvent.keyDown(within(hour).getByRole('option', { name: '23' }), { key: 'ArrowDown' });
    expect(screen.getByLabelText('Time')).toHaveValue('23:59:15');
  });
  it.each([{ disabled: true }, { readOnly: true }])(
    'blocks both opening targets for Field state %j',
    async (state) => {
      render(
        <Field {...state}>
          <Field.Label>Time</Field.Label>
          <TimePicker />
        </Field>,
      );
      fireEvent.click(screen.getByLabelText('Time'));
      await userEvent.click(screen.getByRole('button', { name: 'Choose time' }));
      expect(screen.getByRole('button', { name: 'Choose time' })).toBeDisabled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    },
  );
  it('keeps required clear disabled and preserves keyboard time entry', async () => {
    render(
      <Field required>
        <Field.Label>Time</Field.Label>
        <TimePicker defaultValue="09:00" showClear />
      </Field>,
    );
    fireEvent.change(screen.getByLabelText(/^Time/), { target: { value: '10:15' } });
    expect(screen.getByLabelText(/^Time/)).toHaveValue('10:15');
    fireEvent.click(screen.getByLabelText(/^Time/));
    expect(await screen.findByRole('button', { name: 'Clear input' })).toBeDisabled();
  });
});

it('enables second precision when requested without step, including midnight-crossing bounds', async () => {
  render(
    <TimePicker
      aria-label="Time"
      defaultValue="23:59:59"
      loop
      showSeconds
      min="22:00"
      max="02:00"
    />,
  );
  fireEvent.click(screen.getByLabelText('Time'));
  const seconds = within(await screen.findByRole('listbox', { name: 'Seconds' }));
  fireEvent.keyDown(seconds.getByRole('option', { name: '59' }), { key: 'ArrowDown' });
  expect(screen.getByLabelText('Time')).toHaveValue('23:59:00');
  expect(
    within(screen.getByRole('listbox', { name: 'Hours' })).getByRole('option', { name: '12' }),
  ).toBeDisabled();
});

it('does not wrap hour or minute navigation by default', async () => {
  const changed = vi.fn();
  render(<TimePicker aria-label="Time" defaultValue="23:59" onValueChange={changed} />);
  fireEvent.click(screen.getByLabelText('Time'));
  const hour = within(await screen.findByRole('listbox', { name: 'Hours' })).getByRole('option', {
    name: '23',
  });
  fireEvent.keyDown(hour, { key: 'ArrowDown' });
  fireEvent.keyDown(
    within(screen.getByRole('listbox', { name: 'Minutes' })).getByRole('option', { name: '59' }),
    { key: 'ArrowDown' },
  );
  expect(screen.getByLabelText('Time')).toHaveValue('23:59');
  expect(changed).not.toHaveBeenCalled();
});
