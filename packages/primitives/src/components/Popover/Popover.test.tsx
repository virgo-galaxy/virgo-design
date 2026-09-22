import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, StrictMode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Dropdown } from '../Dropdown';
import { Select } from '../Select';
import { Popover, type PopoverProps } from './index';

function Example(props: PopoverProps) {
  return (
    <Popover {...props}>
      <Popover.Trigger>Edit</Popover.Trigger>
      <Popover.Content aria-label="Editor">
        <input aria-label="Name" />
        <button disabled>Unavailable</button>
        <Popover.Close>Done</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Popover primitive', () => {
  it('portals a non-modal dialog, focuses its first control, and closes with focus return', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { container } = render(<Example onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole('button', { name: 'Edit' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Editor' });
    expect(container).not.toContainElement(dialog);
    expect(dialog).not.toHaveAttribute('aria-modal', 'true');
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    expect(screen.getByRole('textbox')).toHaveFocus();
    await user.type(screen.getByRole('textbox'), 'Virgo');
    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
  });
  it('uses the trigger as its default name and focuses read-only content', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Details</Popover.Trigger>
        <Popover.Content>Some context</Popover.Content>
      </Popover>,
    );
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('dialog', { name: 'Details' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('dialog')).toHaveFocus();
  });
  it('tabs through content and continues after the trigger, with Shift+Tab returning to it', async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Before</button>
        <Example />
        <button>After</button>
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.tab();
    expect(screen.getByRole('button', { name: 'Done' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Edit' })).toHaveFocus();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('dismisses outside clicks and programmatic outside focus without stealing the destination', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Example />
        <button>Outside</button>
      </>,
    );
    const outside = screen.getByRole('button', { name: 'Outside' });
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(outside);
    expect(outside).toHaveFocus();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    act(() => outside.focus());
    expect(outside).toHaveFocus();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('supports controlled open, external close, disabled state and defaultOpen', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Example open={false} onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    rerender(<Example open onOpenChange={onOpenChange} />);
    expect(screen.getByRole('textbox')).toHaveFocus();
    rerender(<Example open={false} onOpenChange={onOpenChange} />);
    expect(screen.getByRole('button')).toHaveFocus();
    rerender(<Example disabled open />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    rerender(<Example key="uncontrolled" defaultOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  it('opens successive hover panels immediately without moving keyboard focus or cutting off the previous panel', () => {
    vi.useFakeTimers();
    render(
      <>
        {['First', 'Second'].map((name) => (
          <Popover key={name} trigger="hover">
            <Popover.Trigger>{name}</Popover.Trigger>
            <Popover.Content>{name} content</Popover.Content>
          </Popover>
        ))}
      </>,
    );
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    fireEvent.pointerEnter(first);
    expect(screen.getByRole('dialog', { name: 'First' })).toBeInTheDocument();
    fireEvent.pointerLeave(first);
    fireEvent.pointerEnter(second);
    expect(screen.getByRole('dialog', { name: 'Second' })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(149));
    expect(screen.getByRole('dialog', { name: 'First' })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole('dialog', { name: 'First' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Second' })).toBeInTheDocument();
    expect(second).not.toHaveFocus();
    expect(screen.getByRole('dialog')).not.toHaveFocus();
  });
  it('still restores focus after the user enters a hover panel and its owner closes it', () => {
    function Panel({ open }: { open?: boolean }) {
      return (
        <Popover trigger="hover" {...(open === undefined ? {} : { open })}>
          <Popover.Trigger>Details</Popover.Trigger>
          <Popover.Content>
            <input aria-label="Name" />
          </Popover.Content>
        </Popover>
      );
    }
    const { rerender } = render(<Panel />);
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Details' }));
    act(() => screen.getByRole('textbox', { name: 'Name' }).focus());
    rerender(<Panel open={false} />);
    expect(screen.getByRole('button', { name: 'Details' })).toHaveFocus();
  });
  it('supports hover gap crossing and keeps interactive content open while focused', () => {
    vi.useFakeTimers();
    const { unmount } = render(<Example trigger="hover" />);
    const trigger = screen.getByRole('button', { name: 'Edit' });
    fireEvent.pointerEnter(trigger, { pointerType: 'mouse' });
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    fireEvent.pointerLeave(trigger);
    act(() => vi.advanceTimersByTime(100));
    fireEvent.pointerEnter(screen.getByRole('dialog'));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    act(() => screen.getByRole('textbox').focus());
    fireEvent.pointerLeave(screen.getByRole('dialog'));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    unmount();
    vi.runAllTimers();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('honors cancelled trigger, close and Escape handlers, and forwards refs to native elements', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    render(
      <Popover>
        <Popover.Trigger ref={triggerRef}>Edit</Popover.Trigger>
        <Popover.Content
          ref={ref}
          onKeyDown={(event) => {
            if (event.key === 'Escape') event.preventDefault();
          }}
        >
          <Popover.Close onClick={(event) => event.preventDefault()}>Keep open</Popover.Close>
        </Popover.Content>
      </Popover>,
    );
    await user.click(triggerRef.current!);
    expect(ref.current).toBe(screen.getByRole('dialog'));
    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Keep open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  it('keeps a parent panel open for nested Dropdown interactions and closes only the top layer on Escape', async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <Popover>
          <Popover.Trigger>Panel</Popover.Trigger>
          <Popover.Content>
            <Dropdown>
              <Dropdown.Trigger>Actions</Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item>Run</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
            <Popover.Close>Done</Popover.Close>
          </Popover.Content>
        </Popover>
      </StrictMode>,
    );
    await user.click(screen.getByRole('button', { name: 'Panel' }));
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Run' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Panel' })).toHaveFocus();
  });
  it('preserves Select listbox keyboard behavior when used inside a Popover', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Panel</Popover.Trigger>
        <Popover.Content>
          <Select defaultValue="a">
            <Select.Trigger>Choose</Select.Trigger>
            <Select.Content>
              <Select.Option value="a">Alpha</Select.Option>
              <Select.Option value="b">Beta</Select.Option>
            </Select.Content>
          </Select>
        </Popover.Content>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Panel' }));
    await user.click(screen.getByRole('button', { name: 'Choose' }));
    await user.keyboard('{ArrowDown}{Enter}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Choose' }));
    expect(screen.getByRole('option', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  it('dismisses nested overlays when clicking outside both, but preserves the parent for inside clicks', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Popover>
          <Popover.Trigger>Panel</Popover.Trigger>
          <Popover.Content>
            <p>Panel description</p>
            <Dropdown>
              <Dropdown.Trigger>Actions</Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item>Run</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </Popover.Content>
        </Popover>
        <p>Outside description</p>
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Panel' }));
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByText('Panel description'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByText('Outside description'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('skips controls inside CSS-hidden ancestors when moving focus into the panel', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Panel</Popover.Trigger>
        <Popover.Content>
          <div style={{ display: 'none' }}>
            <button>Hidden action</button>
          </div>
          <button>Visible action</button>
        </Popover.Content>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Panel' }));
    expect(screen.getByRole('button', { name: 'Visible action' })).toHaveFocus();
  });
  it('keeps a hover panel open while its portalled child menu owns focus', () => {
    vi.useFakeTimers();
    render(
      <Popover trigger="hover">
        <Popover.Trigger>Panel</Popover.Trigger>
        <Popover.Content>
          <Dropdown>
            <Dropdown.Trigger>Actions</Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Run</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </Popover.Content>
      </Popover>,
    );
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Panel' }));
    fireEvent.keyDown(screen.getByRole('button', { name: 'Actions' }), { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Run' })).toHaveFocus();
    fireEvent.pointerLeave(screen.getByRole('dialog'));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
  it('does not submit an enclosing form when opening or closing', async () => {
    const user = userEvent.setup();
    const submit = vi.fn((event) => event.preventDefault());
    render(
      <form onSubmit={submit}>
        <Example />
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(submit).not.toHaveBeenCalled();
  });
});
