import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Menu } from '../Menu';
import { ContextMenu } from './index';

function Example() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger>File.txt</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Rename</ContextMenu.Item>
        <ContextMenu.CheckboxItem>Pin</ContextMenu.CheckboxItem>
      </ContextMenu.Content>
    </ContextMenu>
  );
}
describe('ContextMenu', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  it('flips and shifts a pointer popup at viewport edges using the shared positioning engine', () => {
    vi.stubGlobal('innerWidth', 1000);
    vi.stubGlobal('innerHeight', 800);
    const original = HTMLElement.prototype.getBoundingClientRect;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.getAttribute('role') === 'menu'
        ? new DOMRect(0, 0, 180, 240)
        : original.call(this);
    });
    render(<Example />);
    fireEvent.contextMenu(screen.getByText('File.txt'), { clientX: 990, clientY: 790 });
    expect(screen.getByRole('menu')).toHaveStyle({ left: '812px', top: '550px' });
    expect(screen.getByRole('menu')).toHaveAttribute('data-side', 'top');
  });
  it('reuses the exact item, group and submenu implementations', () => {
    for (const part of [
      'Item',
      'CheckboxItem',
      'RadioItem',
      'RadioGroup',
      'Group',
      'Separator',
      'Submenu',
      'SubmenuTrigger',
      'SubmenuContent',
    ] as const)
      expect(ContextMenu[part]).toBe(Menu[part]);
  });
  it('opens at pointer coordinates and repositions when invoked again', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByText('File.txt');
    await user.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.contextMenu(trigger, { clientX: 120, clientY: 80 });
    expect(screen.getByRole('menu')).toHaveStyle({ left: '120px', top: '80px' });
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();
    fireEvent.contextMenu(trigger, { clientX: 240, clientY: 100 });
    expect(screen.getByRole('menu')).toHaveStyle({ left: '240px', top: '100px' });
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  it.each(['{Shift>}{F10}{/Shift}', '{ContextMenu}'])(
    'opens from keyboard %s and returns focus after selection',
    async (key) => {
      const user = userEvent.setup();
      render(<Example />);
      await user.tab();
      await user.keyboard(key);
      expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(screen.getByText('File.txt')).toHaveFocus();
    },
  );
  it('supports controlled state, canceled events and disabled context targets', () => {
    const onOpen = vi.fn();
    const { rerender } = render(
      <ContextMenu open={false} onOpenChange={onOpen}>
        <ContextMenu.Trigger>File</ContextMenu.Trigger>
        <ContextMenu.Content>Contents</ContextMenu.Content>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText('File'));
    expect(onOpen).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    rerender(
      <ContextMenu>
        <ContextMenu.Trigger onContextMenu={(e) => e.preventDefault()}>File</ContextMenu.Trigger>
        <ContextMenu.Content>Contents</ContextMenu.Content>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText('File'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    rerender(
      <ContextMenu disabled>
        <ContextMenu.Trigger>File</ContextMenu.Trigger>
        <ContextMenu.Content>Contents</ContextMenu.Content>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText('File'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
