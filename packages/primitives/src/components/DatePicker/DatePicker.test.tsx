import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DatePicker, Field, Form } from '../../index';
function Fixture(props: React.ComponentProps<typeof DatePicker>) {
  return (
    <DatePicker {...props}>
      <DatePicker.Input />
      <DatePicker.Trigger aria-label="Choose date">Choose</DatePicker.Trigger>
      <DatePicker.Content aria-label="Calendar">
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  );
}
describe('DatePicker input/calendar composition', () => {
  it('focuses the selected day, chooses a date, closes and restores focus to the trigger', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Form>
        <Field required>
          <Field.Label>Due</Field.Label>
          <Fixture defaultValue="2026-10-06" name="due" onValueChange={change} />
          <Field.Description>Help</Field.Description>
        </Field>
      </Form>,
    );
    const input = screen.getByLabelText(/^Due/);
    expect(input).toHaveAttribute('aria-describedby');
    await user.click(screen.getByRole('button', { name: 'Choose date' }));
    await waitFor(() =>
      expect(document.querySelector('[data-calendar-date="2026-10-06"]')).toHaveFocus(),
    );
    await user.keyboard('{ArrowRight}{Enter}');
    expect(change).toHaveBeenCalledWith('2026-10-07');
    expect(input).toHaveValue('2026-10-07');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Choose date' })).toHaveFocus();
    expect(new FormData(input.closest('form')!).get('due')).toBe('2026-10-07');
  });
  it('handles native edits, clear and controlled popup requests', async () => {
    const user = userEvent.setup();
    const value = vi.fn();
    const open = vi.fn();
    render(
      <Field>
        <Field.Label>Due</Field.Label>
        <Fixture value="2026-10-06" open={false} onValueChange={value} onOpenChange={open} />
      </Field>,
    );
    const input = screen.getByLabelText('Due');
    fireEvent.change(input, { target: { value: '' } });
    expect(value).toHaveBeenCalledWith('');
    expect(input).toHaveValue('2026-10-06');
    await user.click(screen.getByRole('button', { name: 'Choose date' }));
    expect(open).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
  it('dismisses with Escape and prevents inherited read-only/disabled edits and opening', async () => {
    const user = userEvent.setup();
    const { rerender, unmount } = render(
      <Field>
        <Field.Label>Due</Field.Label>
        <Fixture defaultValue="2026-10-06" />
      </Field>,
    );
    await user.click(screen.getByRole('button', { name: 'Choose date' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Choose date' })).toHaveFocus();
    rerender(
      <Field readOnly>
        <Field.Label>Due</Field.Label>
        <Fixture open />
      </Field>,
    );
    expect(screen.getByLabelText('Due')).toHaveAttribute('readonly');
    expect(screen.getByRole('button', { name: 'Choose date' })).toBeDisabled();
    expect(screen.queryByRole('dialog')).toBeNull();
    rerender(
      <Field disabled>
        <Field.Label>Due</Field.Label>
        <Fixture />
      </Field>,
    );
    expect(screen.getByLabelText('Due')).toBeDisabled();
    unmount();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });
});
