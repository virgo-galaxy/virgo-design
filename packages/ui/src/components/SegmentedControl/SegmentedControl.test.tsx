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

function rect(left: number, width: number) {
  return {
    left,
    right: left + width,
    top: 0,
    bottom: 36,
    x: left,
    y: 0,
    width,
    height: 36,
    toJSON() {},
  } as DOMRect;
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

  it('measures a selected item whose value is an empty string', () => {
    render(
      <SegmentedControl defaultValue="" aria-label="Languages">
        <SegmentedControl.Item value="">中文</SegmentedControl.Item>
        <SegmentedControl.Item value="en">English</SegmentedControl.Item>
      </SegmentedControl>,
    );
    const group = screen.getByRole('radiogroup', { name: 'Languages' });
    expect(screen.getByRole('radio', { name: '中文' })).toBeChecked();
    expect(group).toHaveAttribute('data-indicator-ready', 'true');
    expect(group).toHaveAttribute('data-indicator-position', 'first');
  });

  it('does not select an empty-string option when no value is supplied', () => {
    render(
      <SegmentedControl aria-label="No selection">
        <SegmentedControl.Item value="">中文</SegmentedControl.Item>
        <SegmentedControl.Item value="en">English</SegmentedControl.Item>
      </SegmentedControl>,
    );
    expect(screen.getByRole('radio', { name: '中文' })).not.toBeChecked();
    expect(screen.getByRole('radiogroup', { name: 'No selection' })).not.toHaveAttribute(
      'data-indicator-ready',
    );
  });

  it('remeasures when ResizeObserver reports a font or container size change', () => {
    let resized: (() => void) | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          resized = callback;
        }
        observe = observe;
        disconnect = disconnect;
      },
    );
    try {
      const { unmount } = renderControl({ style: { width: '320px' } });
      const group = screen.getByRole('radiogroup', { name: 'Fruit' });
      const selected = screen.getByRole('radio', { name: 'Pear' }).closest('label')!;
      vi.spyOn(group, 'getBoundingClientRect').mockReturnValue(rect(100, 320));
      const measure = vi
        .spyOn(selected, 'getBoundingClientRect')
        .mockReturnValue(rect(147.25, 63.625));
      resized?.();
      expect(group.style.getPropertyValue('--segmented-indicator-width')).toBe('63.625px');
      measure.mockReturnValue(rect(178.5, 104.25));
      resized?.();
      expect(group.style.getPropertyValue('--segmented-indicator-x')).toBe('78.5px');
      expect(group.style.getPropertyValue('--segmented-indicator-width')).toBe('104.25px');
      expect(observe).toHaveBeenCalledWith(group);
      expect(observe).toHaveBeenCalledWith(selected);
      unmount();
      expect(disconnect).toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it.each([0.9, 1, 1.25])('measures local coordinates inside an ancestor scaled by %s', (scale) => {
    renderControl({ style: { width: '320px' } });
    const group = screen.getByRole('radiogroup', { name: 'Fruit' });
    const selected = screen.getByRole('radio', { name: 'Pear' }).closest('label')!;
    vi.spyOn(group, 'getBoundingClientRect').mockReturnValue(rect(100, 320 * scale));
    vi.spyOn(selected, 'getBoundingClientRect').mockReturnValue(
      rect(100 + 71.375 * scale, 63.625 * scale),
    );

    window.dispatchEvent(new Event('resize'));

    expect(parseFloat(group.style.getPropertyValue('--segmented-indicator-x'))).toBeCloseTo(71.375);
    expect(parseFloat(group.style.getPropertyValue('--segmented-indicator-width'))).toBeCloseTo(
      63.625,
    );
  });

  it('remeasures after replacing labels and adding items without changing the selected value', () => {
    const measure = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        if (this.getAttribute('role') === 'radiogroup') return rect(100, 320);
        if (this.dataset.segmentValue === 'selected') {
          return this.textContent === '周' ? rect(100, 46.5) : rect(161.25, 176.75);
        }
        return rect(100, 0);
      });
    try {
      const { rerender } = render(
        <SegmentedControl value="selected" aria-label="Dynamic labels" style={{ width: 320 }}>
          <SegmentedControl.Item value="selected">周</SegmentedControl.Item>
        </SegmentedControl>,
      );
      const group = screen.getByRole('radiogroup', { name: 'Dynamic labels' });
      expect(group.style.getPropertyValue('--segmented-indicator-width')).toBe('46.5px');
      expect(group).toHaveAttribute('data-indicator-position', 'only');

      rerender(
        <SegmentedControl value="selected" aria-label="Dynamic labels" style={{ width: 320 }}>
          <SegmentedControl.Item value="before">全部</SegmentedControl.Item>
          <SegmentedControl.Item value="selected">查看所有未处理的申请</SegmentedControl.Item>
          <SegmentedControl.Item value="after">Settings</SegmentedControl.Item>
        </SegmentedControl>,
      );

      expect(group.style.getPropertyValue('--segmented-indicator-x')).toBe('61.25px');
      expect(group.style.getPropertyValue('--segmented-indicator-width')).toBe('176.75px');
      expect(group).toHaveAttribute('data-indicator-position', 'middle');
    } finally {
      measure.mockRestore();
    }
  });
});
