import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlItem } from './SegmentedControlItem';

function renderControl(props?: Partial<ComponentProps<typeof SegmentedControl>>) {
  return render(
    <SegmentedControl defaultValue="pear" aria-label="Fruit" {...props}>
      <SegmentedControlItem value="apple">Apple</SegmentedControlItem>
      <SegmentedControlItem value="pear">Pear</SegmentedControlItem>
      <SegmentedControlItem value="orange">Orange</SegmentedControlItem>
    </SegmentedControl>,
  );
}

describe('SegmentedControl', () => {
  it('renders a radio-backed single-selection group', () => {
    renderControl();

    expect(screen.getByRole('radiogroup', { name: 'Fruit' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Pear' })).toBeChecked();
  });

  it('updates an uncontrolled selection', async () => {
    const user = userEvent.setup();
    renderControl();

    await user.click(screen.getByRole('radio', { name: 'Orange' }));

    expect(screen.getByRole('radio', { name: 'Orange' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Pear' })).not.toBeChecked();
  });

  it('supports controlled values', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    renderControl({ value: 'apple', onValueChange });

    await user.click(screen.getByRole('radio', { name: 'Pear' }));

    expect(onValueChange).toHaveBeenCalledWith('pear');
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked();
  });

  it('keeps disabled items unavailable', async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl defaultValue="apple" aria-label="Fruit">
        <SegmentedControlItem value="apple">Apple</SegmentedControlItem>
        <SegmentedControlItem disabled value="orange">
          Orange
        </SegmentedControlItem>
      </SegmentedControl>,
    );

    await user.click(screen.getByRole('radio', { name: 'Orange' }));

    expect(screen.getByRole('radio', { name: 'Orange' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked();
  });

  it('exposes variant, size, and motion independently', () => {
    renderControl({ variant: 'soft', size: 'small', motion: 'slide' });

    const group = screen.getByRole('radiogroup', { name: 'Fruit' });

    expect(group).toHaveAttribute('data-variant', 'soft');
    expect(group).toHaveAttribute('data-size', 'small');
    expect(group).toHaveAttribute('data-motion', 'slide');
    expect(group.querySelector('[data-slot="indicator"]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('uses medium size and static motion by default', () => {
    renderControl();

    const group = screen.getByRole('radiogroup', { name: 'Fruit' });

    expect(group).toHaveAttribute('data-size', 'medium');
    expect(group).toHaveAttribute('data-motion', 'none');
  });
});
