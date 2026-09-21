import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Dropdown, type DropdownProps } from './index';

function Menu(props: DropdownProps) {
  return (
    <Dropdown {...props}>
      <Dropdown.Trigger>Actions</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Alpha</Dropdown.Item>
        <Dropdown.Item disabled>Disabled</Dropdown.Item>
        <Dropdown.Item>Beta</Dropdown.Item>
        <Dropdown.Item>Bravo</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item checked>Selected</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

describe('Dropdown primitive', () => {
  it('portals a labelled menu, skips disabled items, wraps, typeaheads and restores focus', async () => {
    const user = userEvent.setup();
    const { container } = render(<Menu />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    await user.click(trigger);
    const menu = screen.getByRole('menu', { name: 'Actions' });
    expect(container).not.toContainElement(menu);
    expect(trigger).toHaveAttribute('aria-controls', menu.id);
    expect(screen.getByRole('menuitemradio')).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Alpha' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Beta' })).toHaveFocus();
    await user.keyboard('b');
    expect(screen.getByRole('menuitem', { name: 'Bravo' })).toHaveFocus();
    await user.keyboard('b');
    expect(screen.getByRole('menuitem', { name: 'Beta' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('menuitemradio')).toHaveFocus();
    await user.keyboard('{Home}{ArrowUp}');
    expect(screen.getByRole('menuitemradio')).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it.each(['click', 'hover'] as const)(
    'supports keyboard opening in %s mode and Tab in both directions',
    async (trigger) => {
      const user = userEvent.setup();
      render(
        <>
          <button>Before</button>
          <Menu trigger={trigger} />
          <button>After</button>
        </>,
      );
      const button = screen.getByRole('button', { name: 'Actions' });
      button.focus();
      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('menuitemradio')).toHaveFocus();
      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      await user.tab({ shift: true });
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Alpha' })).toHaveFocus();
      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    },
  );

  it('delays hover closing across the portal gap without stealing focus', () => {
    vi.useFakeTimers();
    try {
      render(
        <>
          <button>Before</button>
          <Menu trigger="hover" />
        </>,
      );
      const before = screen.getByRole('button', { name: 'Before' });
      before.focus();
      const trigger = screen.getByRole('button', { name: 'Actions' });
      fireEvent.pointerEnter(trigger, { pointerType: 'mouse' });
      expect(before).toHaveFocus();
      fireEvent.pointerLeave(trigger);
      act(() => vi.advanceTimersByTime(100));
      fireEvent.pointerEnter(screen.getByRole('menu'));
      act(() => vi.advanceTimersByTime(200));
      expect(screen.getByRole('menu')).toBeInTheDocument();
      fireEvent.pointerLeave(screen.getByRole('menu'));
      act(() => vi.advanceTimersByTime(151));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('activates once, allows cancellation, and does not activate disabled items', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const cancel = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(
      <Dropdown>
        <Dropdown.Trigger>Actions</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onSelect={cancel}>Keep open</Dropdown.Item>
          <Dropdown.Item disabled onSelect={onSelect}>
            Disabled
          </Dropdown.Item>
          <Dropdown.Item onSelect={onSelect}>Run</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.keyboard('{Enter}');
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Disabled' }));
    expect(onSelect).not.toHaveBeenCalled();
    await user.keyboard('{End} ');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus();
  });

  it('dismisses outside pointer and focus without taking their focus back', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Menu />
        <button>Outside</button>
      </>,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });
    const outside = screen.getByRole('button', { name: 'Outside' });
    await user.click(trigger);
    await user.click(outside);
    expect(outside).toHaveFocus();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await user.click(trigger);
    act(() => outside.focus());
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('respects controlled state and disables an already-open menu', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Menu open={false} onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    rerender(<Menu open disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('preserves an action destination focus and never submits a form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event) => event.preventDefault());
    const inputRef = createRef<HTMLInputElement>();
    render(
      <form onSubmit={onSubmit}>
        <input ref={inputRef} aria-label="Destination" />
        <Dropdown>
          <Dropdown.Trigger>Actions</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onSelect={() => inputRef.current?.focus()}>Edit</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </form>,
    );
    await user.click(screen.getByRole('button'));
    await user.keyboard('{Enter}');
    expect(inputRef.current).toHaveFocus();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('inherits live local theme changes through the portal', async () => {
    const user = userEvent.setup();
    function Themed() {
      const [theme, setTheme] = useState('dark');
      return (
        <div data-theme={theme}>
          <Menu />
          <button onClick={() => setTheme('light')}>Theme</button>
        </div>
      );
    }
    const { container } = render(<Themed />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toHaveAttribute('data-theme', 'dark');
    await act(async () => container.firstElementChild?.setAttribute('data-theme', 'light'));
    expect(screen.getByRole('menu')).toHaveAttribute('data-theme', 'light');
  });
});
