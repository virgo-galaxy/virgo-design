import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Calendar } from './index';
const day = (date: string) =>
  document.querySelector<HTMLButtonElement>(`[data-calendar-date="${date}"]`)!;
describe('Calendar civil dates and grid navigation', () => {
  it('renders the supported date boundaries without invalid adjacent dates', () => {
    const { rerender } = render(<Calendar defaultMonth="0001-01" />);
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeDisabled();
    expect(day('0001-01-01')).toBeEnabled();
    rerender(<Calendar month="9999-12" />);
    expect(screen.getByRole('button', { name: 'Next month' })).toBeDisabled();
    expect(day('9999-12-31')).toBeEnabled();
  });
  it('uses a named grid, one day tab stop and localized weekday names', () => {
    render(<Calendar defaultValue="2026-10-06" locale="zh-CN" weekStartsOn={1} />);
    expect(screen.getByRole('grid')).toHaveAccessibleName('2026年10月');
    expect(screen.getAllByRole('columnheader')[0]).toHaveAttribute('abbr', '星期一');
    expect(day('2026-10-06').closest('td')).toHaveAttribute('aria-selected', 'true');
    expect(
      Array.from(document.querySelectorAll('[data-calendar-date]')).filter(
        (n) => (n as HTMLElement).tabIndex === 0,
      ),
    ).toHaveLength(1);
  });
  it('moves focus independently of selection across weeks and months, then commits with Enter', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Calendar defaultValue="2026-10-06" autoFocus weekStartsOn={1} onValueChange={change} />,
    );
    expect(day('2026-10-06')).toHaveFocus();
    await user.keyboard('{ArrowRight}{ArrowDown}');
    expect(day('2026-10-14')).toHaveFocus();
    expect(change).not.toHaveBeenCalled();
    await user.keyboard('{Home}');
    expect(day('2026-10-12')).toHaveFocus();
    await user.keyboard('{End}');
    expect(day('2026-10-18')).toHaveFocus();
    await user.keyboard('{PageDown}');
    expect(day('2026-11-18')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(change).toHaveBeenCalledWith('2026-11-18');
  });
  it('clamps month navigation to the destination month length and skips unavailable days', async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        defaultValue="2024-01-31"
        autoFocus
        isDateUnavailable={(date) => date === '2024-02-29'}
      />,
    );
    await user.keyboard('{PageDown}');
    expect(day('2024-03-01')).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(day('2024-02-28')).toHaveFocus();
  });
  it('keeps controlled month/value authoritative and enforces date bounds', async () => {
    const user = userEvent.setup();
    const month = vi.fn();
    const value = vi.fn();
    render(
      <Calendar
        month="2026-10"
        value="2026-10-06"
        onMonthChange={month}
        onValueChange={value}
        min="2026-10-05"
        max="2026-11-02"
      />,
    );
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeDisabled();
    expect(day('2026-10-04')).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next month' }));
    expect(month).toHaveBeenCalledWith('2026-11');
    expect(screen.getByRole('grid')).toHaveAccessibleName('October 2026');
    await user.click(day('2026-10-07'));
    expect(value).toHaveBeenCalledWith('2026-10-07');
    expect(day('2026-10-06').closest('td')).toHaveAttribute('aria-selected', 'true');
  });
  it('retains read-only navigation, respects cancellation, RTL and disabled state', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender, unmount } = render(
      <Calendar
        defaultValue="2026-10-06"
        readOnly
        autoFocus
        style={{ direction: 'rtl' }}
        onValueChange={change}
      />,
    );
    await user.keyboard('{ArrowLeft}{Enter}');
    expect(day('2026-10-07')).toHaveFocus();
    expect(change).not.toHaveBeenCalled();
    rerender(<Calendar defaultValue="2026-10-06" onKeyDown={(e) => e.preventDefault()} />);
    expect(fireEvent.keyDown(day('2026-10-07'), { key: 'ArrowDown' })).toBe(false);
    rerender(<Calendar defaultMonth="2026-10" disabled />);
    expect(screen.getAllByRole('button').every((n) => (n as HTMLButtonElement).disabled)).toBe(
      true,
    );
    unmount();
    await waitFor(() => expect(document.querySelector('[data-calendar-root]')).toBeNull());
  });
});
