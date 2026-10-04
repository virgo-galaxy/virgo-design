import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Calendar } from './index';
describe('Calendar visual contract', () => {
  it('adds consumer content below the date number with an accessible description', () => {
    render(
      <Calendar
        fullscreen
        defaultMonth="2026-10"
        renderDateContent={(date) => (date === '2026-10-06' ? '1.2M tokens' : null)}
      />,
    );
    const day = document.querySelector<HTMLButtonElement>('[data-calendar-date="2026-10-06"]')!;
    expect(day.querySelector('[data-calendar-date-number]')).toHaveTextContent('6');
    expect(day).toHaveAccessibleName('Tuesday, October 6, 2026');
    expect(day).toHaveAccessibleDescription('1.2M tokens');
  });
  it('provides a full-width panel with year/month controls and separate selection', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Calendar fullscreen defaultValue="2026-10-06" weekStartsOn={1} onValueChange={change} />,
    );
    expect(screen.getByRole('grid').closest('[data-calendar-root]')).toHaveAttribute(
      'data-fullscreen',
      'true',
    );
    await user.click(screen.getByRole('button', { name: 'Choose month' }));
    await user.click(screen.getByRole('option', { name: 'May' }));
    expect(screen.getByRole('grid')).toHaveAccessibleName('May 2026');
    expect(change).not.toHaveBeenCalled();
    await user.click(screen.getByRole('radio', { name: 'Year' }));
    expect(screen.getByRole('grid')).toHaveAccessibleName('2026');
    expect(screen.getByRole('grid').querySelectorAll('[data-calendar-month]')).toHaveLength(12);
    await user.click(screen.getByRole('button', { name: 'Choose year' }));
    await user.click(screen.getByRole('option', { name: '2027' }));
    expect(screen.getByRole('grid')).toHaveAccessibleName('2027');
    await user.click(screen.getByRole('button', { name: 'February 2027' }));
    expect(screen.getByRole('grid')).toHaveAccessibleName('February 2027');
    expect(change).not.toHaveBeenCalled();
    await user.click(
      document.querySelector<HTMLButtonElement>('[data-calendar-date="2027-02-12"]')!,
    );
    expect(change).toHaveBeenCalledWith('2027-02-12');
  });
  it('constrains header navigation and keeps controlled mode/month authoritative', async () => {
    const user = userEvent.setup();
    const month = vi.fn();
    const mode = vi.fn();
    const { rerender } = render(
      <Calendar
        fullscreen
        month="2026-10"
        mode="month"
        min="2026-05-12"
        max="2027-02-20"
        onMonthChange={month}
        onModeChange={mode}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Choose month' }));
    expect(screen.getByRole('option', { name: 'Apr' })).toHaveAttribute('aria-disabled', 'true');
    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Choose year' }));
    await user.click(screen.getByRole('option', { name: '2027' }));
    expect(month).toHaveBeenCalledWith('2027-02');
    expect(screen.getByRole('grid')).toHaveAccessibleName('October 2026');
    await user.click(screen.getByRole('radio', { name: 'Year' }));
    expect(mode).toHaveBeenCalledWith('year');
    expect(screen.getByRole('grid')).toHaveAccessibleName('October 2026');
    rerender(<Calendar fullscreen disabled defaultMonth="2026-10" />);
    expect(
      screen
        .getAllByRole('button', { name: /Choose (month|year)/ })
        .every((node) => (node as HTMLButtonElement).disabled),
    ).toBe(true);
  });
  it.each(['small', 'medium', 'large'] as const)(
    'retains %s density and semantic composition',
    (size) => {
      render(<Calendar size={size} defaultMonth="2026-10" className="custom" />);
      const root = screen.getByRole('grid').parentElement!;
      expect(root).toHaveClass('custom');
      expect(root).toHaveAttribute('data-size', size);
    },
  );
});
