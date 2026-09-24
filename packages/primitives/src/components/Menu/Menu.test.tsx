import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Dialog } from '../Dialog';
import { Menu } from './index';

function Actions({ controlled = false }: { controlled?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Menu.Root {...(controlled ? { open, onOpenChange: setOpen } : {})}>
        <Menu.Trigger>Actions</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Rename</Menu.Item>
          <Menu.Item disabled>Delete</Menu.Item>
          <Menu.Item>Copy</Menu.Item>
          <Menu.Item>Cut</Menu.Item>
        </Menu.Content>
      </Menu.Root>
      <button>After</button>
    </>
  );
}
describe('Menu', () => {
  it.each([false, true])('opens, selects and returns focus (controlled=%s)', async (controlled) => {
    const user = userEvent.setup();
    render(<Actions controlled={controlled} />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    const menu = screen.getByRole('menu', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-controls', menu.id);
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();
    await user.click(screen.getByRole('menuitem', { name: 'Copy' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it('keeps disabled items focusable but cannot select them; supports Home/End and wrapping', async () => {
    const user = userEvent.setup();
    render(<Actions />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('menu')).toBeVisible();
    await user.keyboard('{End}');
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();
    await user.keyboard('{Home}{ArrowUp}');
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus();
  });
  it('opens last from ArrowUp, typeaheads, escapes and tabs out from trigger order', async () => {
    const user = userEvent.setup();
    render(<Actions />);
    await user.tab();
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus();
    await user.keyboard('r');
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus();
    await user.keyboard('{Enter}{Tab}');
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  it('honors canceled events and closeOnSelect, and does not steal outside focus', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Menu defaultOpen>
          <Menu.Trigger>Actions</Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={(e) => e.preventDefault()}>Keep</Menu.Item>
            <Menu.Item closeOnSelect={false}>Also keep</Menu.Item>
          </Menu.Content>
        </Menu>
        <button>Outside</button>
      </>,
    );
    await user.click(screen.getByRole('menuitem', { name: 'Keep' }));
    expect(screen.getByRole('menu')).toBeVisible();
    await user.click(screen.getByRole('menuitem', { name: 'Also keep' }));
    expect(screen.getByRole('menu')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
  });
  it('shares checkbox and radio state without closing; mixed and controlled values are supported', async () => {
    const user = userEvent.setup();
    const onChecked = vi.fn();
    const onRadio = vi.fn();
    render(
      <Menu defaultOpen>
        <Menu.Trigger>View</Menu.Trigger>
        <Menu.Content>
          <Menu.CheckboxItem defaultChecked>Grid</Menu.CheckboxItem>
          <Menu.CheckboxItem checked="mixed" onCheckedChange={onChecked}>
            Guides
          </Menu.CheckboxItem>
          <Menu.Separator />
          <Menu.RadioGroup aria-label="Zoom" defaultValue="100" onValueChange={onRadio}>
            <Menu.RadioItem value="100">100%</Menu.RadioItem>
            <Menu.RadioItem value="200">200%</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Content>
      </Menu>,
    );
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Grid' }));
    expect(screen.getByRole('menuitemcheckbox', { name: 'Grid' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Guides' }));
    expect(onChecked).toHaveBeenCalledWith(true);
    expect(screen.getByRole('menuitemcheckbox', { name: 'Guides' })).toHaveAttribute(
      'aria-checked',
      'mixed',
    );
    await user.click(screen.getByRole('menuitemradio', { name: '200%' }));
    expect(onRadio).toHaveBeenCalledWith('200');
    expect(screen.getByRole('menuitemradio', { name: '100%' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    expect(screen.getByRole('group', { name: 'Zoom' })).toBeVisible();
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });
  it('supports custom trigger rendering, refs, disabled roots and external close focus recovery', async () => {
    const user = userEvent.setup();
    const trigger = createRef<HTMLButtonElement>();
    const onOpen = vi.fn();
    const content = (
      <>
        <Menu.Trigger ref={trigger} render={(props) => <button {...props} data-custom="" />}>
          Actions
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Copy</Menu.Item>
        </Menu.Content>
      </>
    );
    const { rerender } = render(
      <Menu open={false} onOpenChange={onOpen}>
        {content}
      </Menu>,
    );
    await user.click(trigger.current!);
    expect(onOpen).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    rerender(<Menu open>{content}</Menu>);
    expect(screen.getByRole('menuitem')).toHaveFocus();
    rerender(<Menu open={false}>{content}</Menu>);
    expect(trigger.current).toHaveFocus();
    rerender(<Menu disabled>{content}</Menu>);
    expect(trigger.current).toBeDisabled();
  });
  it('uses live DOM order after items are reordered or unmounted', async () => {
    const user = userEvent.setup();
    function Example() {
      const [reverse, setReverse] = useState(false);
      return (
        <Menu defaultOpen>
          <Menu.Trigger>Actions</Menu.Trigger>
          <Menu.Content>
            <Menu.Item closeOnSelect={false} onSelect={() => setReverse(!reverse)}>
              Reorder
            </Menu.Item>
            {(reverse ? ['C', 'A'] : ['A', 'B', 'C']).map((name) => (
              <Menu.Item key={name}>{name}</Menu.Item>
            ))}
          </Menu.Content>
        </Menu>
      );
    }
    render(<Example />);
    await user.click(screen.getByRole('menuitem', { name: 'Reorder' }));
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'C' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('menuitem', { name: 'A' })).toHaveFocus();
  });
});
function Nested() {
  return (
    <Menu>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Submenu>
          <Menu.SubmenuTrigger>Export</Menu.SubmenuTrigger>
          <Menu.SubmenuContent>
            <Menu.Item>PDF</Menu.Item>
            <Menu.Submenu>
              <Menu.SubmenuTrigger>More formats</Menu.SubmenuTrigger>
              <Menu.SubmenuContent>
                <Menu.Item>SVG</Menu.Item>
              </Menu.SubmenuContent>
            </Menu.Submenu>
          </Menu.SubmenuContent>
        </Menu.Submenu>
        <Menu.Submenu>
          <Menu.SubmenuTrigger>Share</Menu.SubmenuTrigger>
          <Menu.SubmenuContent>
            <Menu.Item>Link</Menu.Item>
          </Menu.SubmenuContent>
        </Menu.Submenu>
      </Menu.Content>
    </Menu>
  );
}
describe('Menu submenu tree', () => {
  it('opens/returns with arrows, isolates child navigation and closes only deepest layer on Escape', async () => {
    const user = userEvent.setup();
    render(<Nested />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.keyboard('{ArrowDown}{ArrowRight}');
    expect(screen.getByRole('menuitem', { name: 'PDF' })).toHaveFocus();
    expect(screen.getByRole('menu', { name: 'Actions' })).toBeVisible();
    await user.keyboard('{ArrowDown}{ArrowRight}');
    expect(screen.getByRole('menuitem', { name: 'SVG' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('menuitem', { name: 'More formats' })).toHaveFocus();
    expect(screen.getAllByRole('menu')).toHaveLength(2);
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('menuitem', { name: 'Export' })).toHaveFocus();
    expect(screen.getAllByRole('menu')).toHaveLength(1);
    await user.keyboard('{ArrowRight}{Enter}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus();
  });
  it('switches hovered sibling submenus immediately and permits pointer travel through the gap', async () => {
    const user = userEvent.setup();
    render(<Nested />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    const exportItem = screen.getByRole('menuitem', { name: 'Export' });
    const share = screen.getByRole('menuitem', { name: 'Share' });
    await user.hover(exportItem);
    expect(screen.getByRole('menuitem', { name: 'PDF' })).toBeVisible();
    await user.hover(share);
    expect(screen.queryByRole('menuitem', { name: 'PDF' })).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Link' })).toBeVisible();
    await user.hover(screen.getByRole('menuitem', { name: 'Link' }));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 210));
    });
    expect(screen.getByRole('menu', { name: 'Share' })).toBeVisible();
  });
  it('reverses submenu opening and closing arrows in RTL', async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl" style={{ direction: 'rtl' }}>
        <Nested />
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    const item = screen.getByRole('menuitem', { name: 'Export' });
    item.style.direction = 'rtl';
    item.focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('menuitem', { name: 'PDF' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(item).toHaveFocus();
  });
  it('escapes a menu inside Dialog without closing the Dialog', async () => {
    const user = userEvent.setup();
    render(
      <Dialog defaultOpen>
        <Dialog.Content aria-label="Editor">
          <Nested />
        </Dialog.Content>
      </Dialog>,
    );
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Editor' })).toBeVisible();
  });
});
