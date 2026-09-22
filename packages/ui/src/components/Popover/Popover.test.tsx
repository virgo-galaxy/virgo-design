import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ComponentPropsWithRef, createRef, forwardRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Input } from '../Input';
import { Popover } from './index';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});
describe('Popover UI', () => {
  it('forwards custom trigger props, ref and behavior without adding a Virgo Button wrapper', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const onOpenChange = vi.fn();
    const CustomTrigger = forwardRef<HTMLButtonElement, ComponentPropsWithRef<'button'>>(
      function CustomTrigger(props, forwardedRef) {
        return <button {...props} ref={forwardedRef} />;
      },
    );
    const { unmount } = render(
      <>
        <Popover onOpenChange={onOpenChange}>
          <Popover.Trigger
            ref={ref}
            className="avatar"
            style={{ borderRadius: '50%', direction: 'rtl' }}
            aria-label="Profile"
            aria-describedby="profile-hint"
            title="Workspace profile"
            onClick={onClick}
            onKeyDown={onKeyDown}
            render={(props) => <CustomTrigger {...props} />}
          >
            VD
          </Popover.Trigger>
          <Popover.Content>
            Profile details<Popover.Close>Done</Popover.Close>
          </Popover.Content>
        </Popover>
        <span id="profile-hint">Open workspace profile</span>
        <button>Outside</button>
      </>,
    );
    const trigger = screen.getByRole('button', { name: 'Profile' });
    expect(ref.current).toBe(trigger);
    expect(trigger).toHaveAttribute('class', 'avatar');
    expect(trigger).toHaveTextContent('VD');
    expect(trigger).toHaveAttribute('title', 'Workspace profile');
    expect(trigger).toHaveAttribute('aria-describedby', 'profile-hint');
    expect(trigger).not.toHaveAttribute('data-variant');
    expect(trigger).toHaveStyle({ borderRadius: '50%' });
    await user.click(trigger);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    const panel = screen.getByRole('dialog', { name: 'Profile' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('dir', 'rtl');
    expect(panel).toHaveAttribute('data-placement', 'bottomRight');
    expect(screen.getByRole('button', { name: 'Done' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{Enter}');
    expect(onKeyDown).toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(trigger).toHaveFocus();
    await user.keyboard(' ');
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
    await user.click(trigger);
    await user.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    unmount();
    expect(ref.current).toBeNull();
  });
  it('preserves controlled/default open and cancelled events with custom rendering', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    function Example({ open, cancel = false }: { open?: boolean; cancel?: boolean }) {
      return (
        <Popover {...(open === undefined ? {} : { open })} defaultOpen onOpenChange={onOpenChange}>
          <Popover.Trigger
            onClick={(event) => {
              if (cancel) event.preventDefault();
            }}
            render={(props) => <button {...props} />}
          >
            Profile
          </Popover.Trigger>
          <Popover.Content>Details</Popover.Content>
        </Popover>
      );
    }
    const { rerender } = render(<Example />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    onOpenChange.mockClear();
    rerender(<Example open={false} cancel />);
    await user.click(screen.getByRole('button'));
    expect(onOpenChange).not.toHaveBeenCalled();
    rerender(<Example open={false} />);
    await user.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    rerender(<Example open />);
    expect(screen.getByRole('dialog')).toHaveFocus();
    rerender(<Example open={false} />);
    expect(screen.getByRole('button')).toHaveFocus();
  });
  it('reuses Button and Input, passes native props to their named parts and renders an optional arrow', async () => {
    const user = userEvent.setup();
    render(
      <Popover className="custom-root">
        <Popover.Trigger
          size="small"
          variant="text"
          className="custom-trigger"
          title="Edit details"
        >
          Edit
        </Popover.Trigger>
        <Popover.Content className="custom-panel" arrow style={{ width: 280 }}>
          <Input aria-label="Name" />
          <Popover.Close className="custom-close">Done</Popover.Close>
        </Popover.Content>
      </Popover>,
    );
    const trigger = screen.getByRole('button', { name: 'Edit' });
    expect(trigger).toHaveAttribute('data-size', 'small');
    expect(trigger).toHaveClass('custom-trigger');
    expect(trigger).toHaveAttribute('title', 'Edit details');
    await user.click(trigger);
    expect(screen.getByRole('textbox')).toHaveFocus();
    const panel = screen.getByRole('dialog');
    expect(panel).toHaveClass('custom-panel');
    expect(panel).toHaveStyle({ width: '280px' });
    expect(panel.querySelector('[data-slot="arrow"]')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('button', { name: 'Done' })).toHaveClass('custom-close');
  });
  it('keeps exiting content inert until its CSS animation completes, handles reopening and immediate reduced-motion exit', () => {
    vi.useFakeTimers();
    const original = window.getComputedStyle;
    let animated = true;
    vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudo) => {
      const style = original(element, pseudo);
      if (element.getAttribute('role') === 'dialog') {
        Object.defineProperties(style, {
          animationName: { value: animated ? 'popover-exit' : 'none', configurable: true },
          animationDuration: { value: '0.12s', configurable: true },
          animationDelay: { value: '0s', configurable: true },
        });
      }
      return style;
    });
    function Example({ open }: { open: boolean }) {
      return (
        <Popover open={open}>
          <Popover.Trigger>Edit</Popover.Trigger>
          <Popover.Content>
            <Input aria-label="Name" />
          </Popover.Content>
        </Popover>
      );
    }
    const { rerender } = render(<Example open />);
    const panel = screen.getByRole('dialog');
    rerender(<Example open={false} />);
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveAttribute('inert');
    expect(panel).toHaveStyle({ pointerEvents: 'none' });
    expect(screen.getByRole('button', { name: 'Edit' })).toHaveFocus();
    act(() => vi.advanceTimersByTime(60));
    rerender(<Example open />);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(panel).not.toHaveAttribute('inert');
    rerender(<Example open={false} />);
    act(() => vi.advanceTimersByTime(121));
    expect(panel).not.toBeInTheDocument();
    animated = false;
    rerender(<Example open />);
    rerender(<Example open={false} />);
    expect(screen.queryByRole('dialog', { hidden: true })).not.toBeInTheDocument();
  });
  it('synchronizes local theme and RTL changes across the portal', async () => {
    const { container } = render(
      <div data-theme="dark" dir="rtl" style={{ direction: 'rtl' }}>
        <Popover defaultOpen>
          <Popover.Trigger style={{ direction: 'rtl' }}>Details</Popover.Trigger>
          <Popover.Content>Context</Popover.Content>
        </Popover>
      </div>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('dialog')).toHaveAttribute('dir', 'rtl');
    expect(screen.getByRole('dialog')).toHaveAttribute('data-placement', 'bottomRight');
    await act(async () => {
      container.firstElementChild?.setAttribute('data-theme', 'light');
      const trigger = screen.getByRole('button');
      trigger.style.direction = 'ltr';
    });
    expect(screen.getByRole('dialog')).toHaveAttribute('data-theme', 'light');
    expect(screen.getByRole('dialog')).toHaveAttribute('dir', 'ltr');
    expect(screen.getByRole('dialog')).toHaveAttribute('data-placement', 'bottomLeft');
  });
  it('ignores touch pointer entry and still opens with a click', () => {
    render(
      <Popover trigger="hover">
        <Popover.Trigger>Details</Popover.Trigger>
        <Popover.Content>Context</Popover.Content>
      </Popover>,
    );
    const trigger = screen.getByRole('button');
    const event = new Event('pointerover', { bubbles: true });
    Object.defineProperty(event, 'pointerType', { value: 'touch' });
    fireEvent(trigger, event);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
