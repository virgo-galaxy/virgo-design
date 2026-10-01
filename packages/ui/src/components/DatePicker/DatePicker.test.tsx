import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DatePicker } from './index';
describe('DatePicker visual contract', () => {
  it.each(['small', 'medium', 'large'] as const)(
    'retains %s density and semantic composition',
    (size) => {
      render(
        <DatePicker size={size} className="custom">
          <DatePicker.Input aria-label="Date" />
          <DatePicker.Trigger />
        </DatePicker>,
      );
      const root = screen.getByLabelText('Date').parentElement!;
      expect(root).toHaveClass('custom');
      expect(root).toHaveAttribute('data-size', size);
    },
  );
  it('keeps the date action accessible and permits custom trigger content', () => {
    const { rerender } = render(
      <DatePicker>
        <DatePicker.Input aria-label="Date" />
        <DatePicker.Trigger />
      </DatePicker>,
    );
    const trigger = screen.getByRole('button', { name: 'Choose date' });
    expect(trigger.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(trigger.querySelector('svg')).toHaveAttribute('width', '20');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    rerender(
      <DatePicker>
        <DatePicker.Input aria-label="Date" />
        <DatePicker.Trigger aria-label="Open calendar">Open</DatePicker.Trigger>
      </DatePicker>,
    );
    const custom = screen.getByRole('button', { name: 'Open calendar' });
    expect(custom).toHaveTextContent('Open');
    expect(custom.querySelector('svg')).toBeNull();
  });
});
