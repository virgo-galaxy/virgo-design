import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DatePicker, Field } from '../../index';

function Fixture(props: React.ComponentProps<typeof DatePicker.Range>) {
  return (
    <DatePicker.Range {...props} names={['from', 'to']}>
      <DatePicker.RangeInput edge="start" aria-label="From" />
      <DatePicker.RangeInput edge="end" aria-label="To" />
      <DatePicker.Trigger aria-label="Choose interval">Choose</DatePicker.Trigger>
      <DatePicker.Content aria-label="Interval">
        <DatePicker.RangeCalendar defaultMonth="2026-08" locale="en-US" />
      </DatePicker.Content>
    </DatePicker.Range>
  );
}
function day(date: string) {
  return document.querySelector<HTMLButtonElement>(`[data-calendar-date="${date}"]`)!;
}
describe('DatePicker.Range', () => {
  it('opens from either input or the blank field area without stealing typed input focus', async () => {
    const user = userEvent.setup();
    render(<Fixture data-testid="range-field" />);
    const from = screen.getByLabelText('From');
    const to = screen.getByLabelText('To');
    await user.click(from);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(from).toHaveFocus();
    expect(from).toHaveAttribute('data-active', 'true');
    await user.type(from, '2026-08-10');
    expect(from).toHaveValue('2026-08-10');
    expect(from).toHaveFocus();
    await user.click(to);
    expect(to).toHaveFocus();
    expect(to).toHaveAttribute('data-active', 'true');
    expect(from).not.toHaveAttribute('data-active');
    await user.click(day('2026-09-05'));
    expect(from).toHaveValue('2026-08-10');
    expect(to).toHaveValue('2026-09-05');
    expect(screen.queryByRole('dialog')).toBeNull();
    await user.click(screen.getByTestId('range-field'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(from).toHaveFocus();
    await user.keyboard('{Escape}');
    await user.click(to);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(day('2026-09-06'));
    expect(from).toHaveValue('2026-08-10');
    expect(to).toHaveValue('2026-09-06');
  });

  it('anchors to the complete range field instead of its trailing calendar button', async () => {
    const user = userEvent.setup();
    const geometry = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        if (this.dataset.testid === 'range-field') return new DOMRect(100, 100, 360, 28);
        if (this.getAttribute('aria-haspopup') === 'dialog') return new DOMRect(430, 100, 28, 28);
        if (this.getAttribute('role') === 'dialog') return new DOMRect(0, 0, 514, 280);
        return new DOMRect(0, 0, 0, 0);
      });
    try {
      render(<Fixture data-testid="range-field" />);
      await user.click(screen.getByRole('button', { name: 'Choose interval' }));
      expect(screen.getByRole('dialog')).toHaveStyle({ left: '100px', top: '136px' });
      await user.click(screen.getByLabelText('From'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      await user.keyboard('{Escape}');
      expect(screen.getByRole('button', { name: 'Choose interval' })).toHaveFocus();
    } finally {
      geometry.mockRestore();
    }
  });

  it('selects across two months, highlights the interval and submits both endpoints', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { container } = render(
      <form>
        <Fixture onValueChange={change} />
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Choose interval' }));
    expect(screen.getAllByRole('grid')).toHaveLength(2);
    expect(screen.getByRole('grid', { name: 'August 2026' })).toBeInTheDocument();
    expect(screen.getByRole('grid', { name: 'September 2026' })).toBeInTheDocument();
    await user.click(day('2026-08-29'));
    expect(change).toHaveBeenLastCalledWith(['2026-08-29', '']);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.pointerOver(day('2026-09-05'));
    expect(day('2026-09-03')).toHaveAttribute('data-in-range', 'true');
    await user.click(day('2026-09-05'));
    expect(change).toHaveBeenLastCalledWith(['2026-08-29', '2026-09-05']);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Choose interval' })).toHaveFocus();
    expect(new FormData(container.querySelector('form')!).get('from')).toBe('2026-08-29');
    expect(new FormData(container.querySelector('form')!).get('to')).toBe('2026-09-05');
  });
  it('orders a reversed selection and permits same-day ranges', async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    await user.click(screen.getByRole('button', { name: 'Choose interval' }));
    await user.click(day('2026-09-05'));
    await user.click(day('2026-08-29'));
    expect(screen.getByLabelText('From')).toHaveValue('2026-08-29');
    expect(screen.getByLabelText('To')).toHaveValue('2026-09-05');
    await user.click(screen.getByRole('button', { name: 'Choose interval' }));
    await user.click(day('2026-08-29'));
    await user.click(day('2026-08-29'));
    expect(screen.getByLabelText('To')).toHaveValue('2026-08-29');
  });
  it('supports controlled endpoint edits, constraints and keyboard navigation over month boundaries', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(
      <Fixture
        value={['2026-08-30', '']}
        onValueChange={change}
        min="2026-08-28"
        max="2026-09-10"
      />,
    );
    fireEvent.change(screen.getByLabelText('To'), { target: { value: '2026-09-09' } });
    expect(change).toHaveBeenLastCalledWith(['2026-08-30', '2026-09-09']);
    expect(screen.getByLabelText('To')).toHaveValue('');
    await user.click(screen.getByRole('button', { name: 'Choose interval' }));
    expect(day('2026-08-27')).toBeDisabled();
    expect(day('2026-09-11')).toBeDisabled();
    day('2026-08-31').focus();
    await user.keyboard('{ArrowRight}');
    await waitFor(() => expect(day('2026-09-01')).toHaveFocus());
    await user.keyboard('{Enter}');
    expect(change).toHaveBeenLastCalledWith(['2026-08-30', '2026-09-01']);
    rerender(
      <Field disabled>
        <Fixture defaultOpen />
      </Field>,
    );
    expect(screen.getByLabelText('From')).toBeDisabled();
    expect(screen.getByLabelText('To')).toBeDisabled();
    expect(screen.queryByRole('dialog')).toBeNull();
    rerender(
      <Field readOnly>
        <Fixture defaultOpen />
      </Field>,
    );
    expect(screen.getByLabelText('To')).toHaveAttribute('readonly');
    expect(screen.getByRole('button', { name: 'Choose interval' })).toBeDisabled();
  });
  it('keeps a shared Field label associated with the start input and gives the end a unique id', () => {
    render(
      <Field>
        <Field.Label>Created between</Field.Label>
        <DatePicker.Range>
          <DatePicker.RangeInput edge="start" />
          <DatePicker.RangeInput edge="end" aria-label="End date" />
        </DatePicker.Range>
      </Field>,
    );
    expect(screen.getByLabelText('Created between')).not.toBe(screen.getByLabelText('End date'));
    expect(screen.getByLabelText('Created between').id).not.toBe(
      screen.getByLabelText('End date').id,
    );
  });
});
