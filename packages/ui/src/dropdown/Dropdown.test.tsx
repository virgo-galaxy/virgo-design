import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserIcon } from '@virgo-design/icons';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Dropdown } from './index';

describe('Dropdown UI', () => {
  it('uses Virgo Button and fill-first icons, renders an arrow, danger and checked items', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    render(
      <Dropdown size="small">
        <Dropdown.Trigger ref={ref}>Actions</Dropdown.Trigger>
        <Dropdown.Content arrow placement="topRight">
          <Dropdown.Item icon={<UserIcon />}>Profile</Dropdown.Item>
          <Dropdown.Item danger>Delete</Dropdown.Item>
          <Dropdown.Item checked>Current</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );
    expect(ref.current).toHaveAttribute('data-size', 'small');
    expect(ref.current?.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
    await user.click(screen.getByRole('button'));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('data-size', 'small');
    expect(menu.querySelector('[data-slot="arrow"]')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('menuitem', { name: 'Profile' }).querySelector('svg')).toHaveAttribute(
      'viewBox',
      '0 0 24 24',
    );
    expect(screen.getByRole('menuitem', { name: 'Delete' }).className).toContain('danger');
    expect(screen.getByRole('menuitemradio', { name: 'Current' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });
  it('keeps the main action separate from its custom split-menu trigger', async () => {
    const user = userEvent.setup();
    const save = vi.fn();
    render(
      <Dropdown>
        <Dropdown.Button menuLabel="More actions" menuIcon={<UserIcon />} onClick={save}>
          Save
        </Dropdown.Button>
        <Dropdown.Content>
          <Dropdown.Item>Save as</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(save).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'More actions' }));
    expect(screen.getByRole('menuitem', { name: 'Save as' })).toBeInTheDocument();
    expect(save).toHaveBeenCalledTimes(1);
    expect(document.querySelector('button button')).toBeNull();
  });
  it('disables both halves and supports cancellation on a trigger', async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    const { rerender } = render(
      <Dropdown disabled>
        <Dropdown.Button menuLabel="More" onClick={action}>
          Save
        </Dropdown.Button>
      </Dropdown>,
    );
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled();
    rerender(
      <Dropdown>
        <Dropdown.Trigger onClick={(event) => event.preventDefault()}>Actions</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Run</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );
    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(action).not.toHaveBeenCalled();
  });
  it('cleans up hover timers on unmount', () => {
    vi.useFakeTimers();
    try {
      const onOpenChange = vi.fn();
      const { unmount } = render(
        <Dropdown trigger="hover" onOpenChange={onOpenChange}>
          <Dropdown.Trigger>Actions</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Run</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>,
      );
      fireEvent.pointerEnter(screen.getByRole('button'));
      fireEvent.pointerLeave(screen.getByRole('button'));
      unmount();
      vi.runAllTimers();
      expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    } finally {
      vi.useRealTimers();
    }
  });
});
