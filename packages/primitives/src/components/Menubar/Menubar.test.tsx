import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Menu } from '../Menu';
import { Menubar } from './index';
function Example() {
  return (
    <>
      <Menubar aria-label="Application">
        <Menubar.Menu value="file">
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
            <Menubar.Item>Save</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="edit">
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>Undo</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="help" disabled>
          <Menubar.Trigger>Help</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>About</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>
      <button>After bar</button>
    </>
  );
}
describe('Menubar', () => {
  it('enters at the first enabled trigger when the leading menu is disabled', async () => {
    const user = userEvent.setup();
    render(
      <Menubar>
        <Menubar.Menu disabled>
          <Menubar.Trigger>Unavailable</Menubar.Trigger>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>,
    );
    await user.tab();
    expect(screen.getByRole('menuitem', { name: 'File' })).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('menuitem', { name: 'Unavailable' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  it('shares menu items rather than redefining them', () => {
    expect(Menubar.Item).toBe(Menu.Item);
    expect(Menubar.RadioItem).toBe(Menu.RadioItem);
  });
  it('has one tab stop, arrow navigation and Home/End; disabled entries cannot open', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const bar = screen.getByRole('menubar', { name: 'Application' });
    expect(within(bar).getByRole('menuitem', { name: 'File' })).toHaveAttribute('tabindex', '0');
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(within(bar).getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    await user.keyboard('{End}{Enter}');
    expect(within(bar).getByRole('menuitem', { name: 'Help' })).toHaveFocus();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await user.keyboard('{Home}{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'New' })).toHaveFocus();
    await user.keyboard('{Tab}');
    expect(screen.getByRole('button', { name: 'After bar' })).toHaveFocus();
  });
  it('switches menus with horizontal keys in content and returns focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.queryByRole('menuitem', { name: 'New' })).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Undo' })).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('menuitem', { name: 'New' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('menuitem', { name: 'File' })).toHaveFocus();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  it('switches open menus on hover but does not open an idle menubar', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.hover(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.hover(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(screen.getAllByRole('menu')).toHaveLength(1);
    expect(screen.getByRole('menuitem', { name: 'Undo' })).toBeVisible();
  });
  it('supports a controlled open menu value', async () => {
    const user = userEvent.setup();
    const onValue = vi.fn();
    render(
      <Menubar value={null} onValueChange={onValue}>
        <Menubar.Menu value="file">
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>,
    );
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    expect(onValue).toHaveBeenCalledWith('file');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
