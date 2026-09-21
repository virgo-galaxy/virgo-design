import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SegmentedControl } from './index';

function renderControl(props?: Partial<ComponentProps<typeof SegmentedControl>>) {
  return render(
    <SegmentedControl defaultValue="pear" aria-label="Fruit" {...props}>
      <SegmentedControl.Item value="apple">Apple</SegmentedControl.Item>
      <SegmentedControl.Item value="pear">Pear</SegmentedControl.Item>
      <SegmentedControl.Item value="orange">Orange</SegmentedControl.Item>
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
        <SegmentedControl.Item value="apple">Apple</SegmentedControl.Item>
        <SegmentedControl.Item disabled value="orange">
          Orange
        </SegmentedControl.Item>
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
