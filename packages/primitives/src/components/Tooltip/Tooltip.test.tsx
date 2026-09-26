import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Popover } from '../Popover';
import { Tooltip, type TooltipProps } from './index';

function Example(props: TooltipProps) {
  return (
    <Tooltip {...props}>
      <Tooltip.Trigger aria-describedby="existing">Help</Tooltip.Trigger>
      <Tooltip.Content>Helpful description</Tooltip.Content>
    </Tooltip>
  );
}
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Tooltip primitive', () => {
  it.each([undefined, true])('still dismisses on activation by default (%s)', (closeOnClick) => {
    render(<Example defaultOpen {...(closeOnClick === undefined ? {} : { closeOnClick })} />);
    const trigger = screen.getByRole('button');
    fireEvent.pointerDown(trigger);
    fireEvent.click(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger.parentElement).not.toHaveAttribute('closeOnClick');
  });

  it('keeps the same tooltip on pointerdown/click while updating text', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    function Feedback() {
      const [active, setActive] = useState(false);
      return (
        <Tooltip closeOnClick={false} openDelay={0} onOpenChange={onOpenChange}>
          <Tooltip.Trigger onClick={() => setActive((value) => !value)}>Toggle</Tooltip.Trigger>
          <Tooltip.Content>{active ? 'Hide details' : 'Show details'}</Tooltip.Content>
        </Tooltip>
      );
    }
    render(<Feedback />);
    const trigger = screen.getByRole('button');
    await user.hover(trigger);
    const panel = screen.getByRole('tooltip');
    onOpenChange.mockClear();
    fireEvent.pointerDown(trigger);
    expect(panel).toHaveAttribute('data-state', 'open');
    await user.click(trigger);
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Hide details');
    await user.click(trigger);
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Show details');
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
    expect(trigger.parentElement).not.toHaveAttribute('closeOnClick');
  });

  it('preserves keyboard activation and Escape when closeOnClick is false', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Tooltip closeOnClick={false}>
        <Tooltip.Trigger onClick={onClick}>Action</Tooltip.Trigger>
        <Tooltip.Content>Feedback</Tooltip.Content>
      </Tooltip>,
    );
    await user.tab();
    const trigger = screen.getByRole('button');
    const panel = screen.getByRole('tooltip');
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('tooltip')).toBe(panel);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('does not pin an opted-in tooltip after leaving or outside interaction', () => {
    vi.useFakeTimers();
    render(
      <>
        <Example closeOnClick={false} openDelay={0} />
        <button>Outside</button>
      </>,
    );
    const trigger = screen.getByRole('button', { name: 'Help' });
    fireEvent.pointerEnter(trigger);
    fireEvent.pointerDown(trigger, { pointerType: 'mouse' });
    act(() => trigger.focus());
    fireEvent.click(trigger, { detail: 1 });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(trigger).toHaveFocus();
    fireEvent.pointerLeave(trigger);
    act(() => vi.advanceTimersByTime(150));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.pointerEnter(trigger);
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not request a controlled close on activation, but still requests one for Escape', () => {
    const onOpenChange = vi.fn();
    render(<Example open closeOnClick={false} onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole('button');
    fireEvent.pointerDown(trigger);
    fireEvent.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('responds to continuous hover in 100ms and cancels triggers passed over quickly', () => {
    vi.useFakeTimers();
    render(
      <>
        {['First', 'Second', 'Third'].map((name) => (
          <Tooltip key={name}>
            <Tooltip.Trigger>{name}</Tooltip.Trigger>
            <Tooltip.Content>{name} description</Tooltip.Content>
          </Tooltip>
        ))}
      </>,
    );
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    const third = screen.getByRole('button', { name: 'Third' });
    fireEvent.pointerEnter(first);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole('tooltip')).toHaveTextContent('First description');
    fireEvent.pointerLeave(first);
    fireEvent.pointerEnter(second);
    act(() => vi.advanceTimersByTime(30));
    fireEvent.pointerLeave(second);
    fireEvent.pointerEnter(third);
    act(() => vi.advanceTimersByTime(99));
    expect(screen.queryByText('Second description')).not.toBeInTheDocument();
    expect(screen.queryByText('Third description')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Third description');
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-continuous');
    act(() => vi.advanceTimersByTime(500));
    expect(screen.queryByText('Second description')).not.toBeInTheDocument();
  });
  it('opts into immediate handoff and restores the delay after a pause', () => {
    vi.useFakeTimers();
    render(
      <>
        <Tooltip smoothTransition>
          <Tooltip.Trigger>First</Tooltip.Trigger>
          <Tooltip.Content>First description</Tooltip.Content>
        </Tooltip>
        <Tooltip smoothTransition>
          <Tooltip.Trigger>Second</Tooltip.Trigger>
          <Tooltip.Content>Second description</Tooltip.Content>
        </Tooltip>
      </>,
    );
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    fireEvent.pointerEnter(first);
    act(() => vi.advanceTimersByTime(99));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole('tooltip')).toHaveTextContent('First description');
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-continuous');
    fireEvent.pointerLeave(first);
    fireEvent.pointerEnter(second);
    expect(screen.getAllByRole('tooltip', { hidden: true })).toHaveLength(1);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Second description');
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-continuous', 'true');
    fireEvent.pointerLeave(second);
    act(() => vi.advanceTimersByTime(251));
    fireEvent.pointerEnter(first);
    expect(screen.getByRole('tooltip')).toHaveTextContent('First description');
    fireEvent.pointerLeave(first);
    act(() => vi.advanceTimersByTime(150));
    act(() => vi.advanceTimersByTime(350));
    fireEvent.pointerEnter(second);
    act(() => vi.advanceTimersByTime(99));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Second description');
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-continuous');
  });
  it('starts the replacement at the previous panel’s visual position without a second fade-in', () => {
    const original = HTMLElement.prototype.getBoundingClientRect;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.tagName === 'BUTTON')
        return new DOMRect(this.textContent === 'First' ? 100 : 300, 100, 60, 30);
      if (this.getAttribute('role') === 'tooltip')
        return new DOMRect(this.textContent === 'First description' ? 70 : 270, 52, 120, 40);
      return original.call(this);
    });
    render(
      <>
        <Tooltip smoothTransition openDelay={0}>
          <Tooltip.Trigger>First</Tooltip.Trigger>
          <Tooltip.Content>First description</Tooltip.Content>
        </Tooltip>
        <Tooltip smoothTransition>
          <Tooltip.Trigger>Second</Tooltip.Trigger>
          <Tooltip.Content>Second description</Tooltip.Content>
        </Tooltip>
      </>,
    );
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'First' }));
    fireEvent.pointerLeave(screen.getByRole('button', { name: 'First' }));
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Second' }));
    const panel = screen.getByRole('tooltip');
    expect(panel).toHaveAttribute('data-continuous', 'true');
    expect(panel.style.getPropertyValue('--tooltip-handoff-x')).toBe('-200px');
    expect(panel.style.getPropertyValue('--tooltip-handoff-y')).toBe('0px');
    expect(panel).toHaveStyle({ left: '270px', top: '52px' });
  });
  it.each([undefined, false])(
    'keeps ordinary hover delays and fades when smoothTransition is %s',
    (smoothTransition) => {
      vi.useFakeTimers();
      render(
        <>
          <Example smoothTransition defaultOpen />
          <Tooltip {...(smoothTransition === undefined ? {} : { smoothTransition })}>
            <Tooltip.Trigger>Ordinary</Tooltip.Trigger>
            <Tooltip.Content>Ordinary description</Tooltip.Content>
          </Tooltip>
          <Tooltip smoothTransition>
            <Tooltip.Trigger>Smooth</Tooltip.Trigger>
            <Tooltip.Content>Smooth description</Tooltip.Content>
          </Tooltip>
        </>,
      );
      const ordinary = screen.getByRole('button', { name: 'Ordinary' });
      fireEvent.pointerEnter(ordinary);
      act(() => vi.advanceTimersByTime(99));
      expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful description');
      act(() => vi.advanceTimersByTime(1));
      expect(screen.getByRole('tooltip')).toHaveTextContent('Ordinary description');
      expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-continuous');
      expect(ordinary.parentElement).not.toHaveAttribute('smoothTransition');
      fireEvent.pointerLeave(ordinary);
      fireEvent.pointerEnter(screen.getByRole('button', { name: 'Smooth' }));
      act(() => vi.advanceTimersByTime(99));
      expect(screen.getByRole('tooltip')).toHaveTextContent('Ordinary description');
      act(() => vi.advanceTimersByTime(1));
      expect(screen.getByRole('tooltip')).toHaveTextContent('Smooth description');
      expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-continuous');
    },
  );
  it('can disable smooth transition while open', () => {
    function Pair({ smoothTransition }: { smoothTransition: boolean }) {
      return (
        <>
          <Example smoothTransition defaultOpen />
          <Tooltip smoothTransition={smoothTransition}>
            <Tooltip.Trigger>Second</Tooltip.Trigger>
            <Tooltip.Content>Second description</Tooltip.Content>
          </Tooltip>
        </>
      );
    }
    const { rerender } = render(<Pair smoothTransition />);
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-continuous', 'true');
    rerender(<Pair smoothTransition={false} />);
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-continuous');
    expect(screen.getByRole('tooltip')).toHaveTextContent('Second description');
  });
  it('lets an explicit controlled open change reclaim presentation after a handoff while closed', () => {
    function Pair({ open }: { open: boolean }) {
      return (
        <>
          <Example open={open} />
          <Tooltip openDelay={0}>
            <Tooltip.Trigger>Second</Tooltip.Trigger>
            <Tooltip.Content>Second description</Tooltip.Content>
          </Tooltip>
        </>
      );
    }
    const { rerender } = render(<Pair open={false} />);
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Second description');
    rerender(<Pair open />);
    expect(screen.getAllByRole('tooltip', { hidden: true })).toHaveLength(1);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful description');
  });
  it('hands off from a focused tooltip to a hovered one without stealing focus or retaining descriptions', () => {
    vi.useFakeTimers();
    render(
      <>
        <Example />
        <Tooltip openDelay={0}>
          <Tooltip.Trigger>Second</Tooltip.Trigger>
          <Tooltip.Content>Second description</Tooltip.Content>
        </Tooltip>
      </>,
    );
    const first = screen.getByRole('button', { name: 'Help' });
    const second = screen.getByRole('button', { name: 'Second' });
    act(() => first.focus());
    fireEvent.pointerLeave(first);
    fireEvent.pointerEnter(second);
    expect(screen.getAllByRole('tooltip', { hidden: true })).toHaveLength(1);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Second description');
    expect(first).toHaveFocus();
    expect(first).toHaveAttribute('aria-describedby', 'existing');
    fireEvent.pointerLeave(second);
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.pointerEnter(first);
    act(() => vi.advanceTimersByTime(400));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful description');
  });
  it('cancels another pending hover timer when a tooltip opens through focus', () => {
    vi.useFakeTimers();
    render(
      <>
        <Example openDelay={400} />
        <Tooltip>
          <Tooltip.Trigger>Second</Tooltip.Trigger>
          <Tooltip.Content>Second description</Tooltip.Content>
        </Tooltip>
      </>,
    );
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Help' }));
    act(() => vi.advanceTimersByTime(200));
    act(() => screen.getByRole('button', { name: 'Second' }).focus());
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getAllByRole('tooltip', { hidden: true })).toHaveLength(1);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Second description');
  });
  it('requests controlled closure once and prevents a stale controlled value from overlapping its replacement', () => {
    const onOpenChange = vi.fn();
    render(
      <>
        <Example open onOpenChange={onOpenChange} />
        <Tooltip openDelay={0}>
          <Tooltip.Trigger>Second</Tooltip.Trigger>
          <Tooltip.Content>Second description</Tooltip.Content>
        </Tooltip>
      </>,
    );
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Second' }));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(false);
    expect(screen.getAllByRole('tooltip', { hidden: true })).toHaveLength(1);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Second description');
  });
  it('reopens when tabbing back after focus left without an explicit dismissal', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Example />
        <button>Next</button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.tab({ shift: true });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
  it('hides when the trigger scrolls out of the viewport and realigns when it returns', () => {
    let anchor = new DOMRect(100, 100, 60, 30);
    const original = HTMLElement.prototype.getBoundingClientRect;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.tagName === 'BUTTON') return anchor;
      if (this.getAttribute('role') === 'tooltip') return new DOMRect(0, 0, 120, 40);
      return original.call(this);
    });
    render(<Example defaultOpen />);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveStyle({ top: '52px', visibility: 'visible' });
    anchor = new DOMRect(100, -60, 60, 30);
    fireEvent.scroll(document);
    expect(tooltip).toHaveStyle({ visibility: 'hidden' });
    expect(tooltip).toHaveAttribute('aria-hidden', 'true');
    anchor = new DOMRect(100, 140, 60, 30);
    fireEvent.scroll(document);
    expect(tooltip).toHaveStyle({ top: '92px', visibility: 'visible' });
    expect(tooltip).not.toHaveAttribute('aria-hidden');
  });
  it('delays hover, cancels abandoned entry, allows gap crossing and does not move focus', () => {
    vi.useFakeTimers();
    const { container } = render(<Example openDelay={400} />);
    const trigger = screen.getByRole('button');
    fireEvent.pointerEnter(trigger);
    act(() => vi.advanceTimersByTime(399));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.pointerLeave(trigger);
    act(() => vi.advanceTimersByTime(500));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.pointerEnter(trigger);
    act(() => vi.advanceTimersByTime(400));
    const tooltip = screen.getByRole('tooltip');
    expect(container).not.toContainElement(tooltip);
    expect(trigger).not.toHaveFocus();
    expect(trigger).toHaveAttribute('aria-describedby', `existing ${tooltip.id}`);
    expect(trigger).not.toHaveAttribute('aria-expanded');
    fireEvent.pointerLeave(trigger);
    act(() => vi.advanceTimersByTime(50));
    fireEvent.pointerEnter(tooltip);
    act(() => vi.advanceTimersByTime(200));
    expect(tooltip).toBeInTheDocument();
    fireEvent.pointerLeave(tooltip);
    act(() => vi.advanceTimersByTime(151));
    expect(tooltip).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-describedby', 'existing');
  });
  it('opens on focus, dismisses with Escape without moving focus, and does not block native actions', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <Tooltip>
          <Tooltip.Trigger onClick={onClick}>Action</Tooltip.Trigger>
          <Tooltip.Content>Help</Tooltip.Content>
        </Tooltip>
        <button>Next</button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'Action' });
    expect(trigger).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.tab();
    await user.tab({ shift: true });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
  });
  it('retains a focused tooltip on pointer leave and cancels timers when disabled or unmounted', () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    const { rerender, unmount } = render(<Example onOpenChange={onOpenChange} />);
    act(() => screen.getByRole('button').focus());
    fireEvent.pointerLeave(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    rerender(<Example disabled />);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    rerender(<Example key="fresh" onOpenChange={onOpenChange} />);
    fireEvent.pointerEnter(screen.getByRole('button'));
    onOpenChange.mockClear();
    unmount();
    act(() => vi.runAllTimers());
    expect(onOpenChange).not.toHaveBeenCalled();
  });
  it('supports controlled and default open without mutating the owner state', () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<Example open={false} onOpenChange={onOpenChange} />);
    fireEvent.focus(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    rerender(<Example open onOpenChange={onOpenChange} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    rerender(<Example key="default" defaultOpen />);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
  it('forwards custom trigger props and refs and respects cancelled handlers', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Tooltip>
        <Tooltip.Trigger
          ref={ref}
          className="custom"
          style={{ color: 'red' }}
          onFocus={(event) => event.preventDefault()}
          render={(props) => <button {...props} />}
        >
          Custom
        </Tooltip.Trigger>
        <Tooltip.Content>Help</Tooltip.Content>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    expect(ref.current).toBe(trigger);
    expect(trigger).toHaveClass('custom');
    expect(trigger).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    fireEvent.focus(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
  it('ignores touch entry and keeps pointer clicks from opening a tooltip via focus', async () => {
    const user = userEvent.setup();
    render(<Example openDelay={0} />);
    const trigger = screen.getByRole('button');
    const event = new Event('pointerover', { bubbles: true });
    Object.defineProperty(event, 'pointerType', { value: 'touch' });
    fireEvent(trigger, event);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
  it('dismisses the tooltip before its parent Popover and leaves focus on the trigger', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>Panel</Popover.Trigger>
        <Popover.Content>
          <Example />
        </Popover.Content>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Panel' }));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Help' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
