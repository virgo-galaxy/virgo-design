import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Popover } from '../../components/Popover';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('floating overlay lifecycle', () => {
  it('positions using layout dimensions rather than the current animation scale', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.tagName === 'BUTTON' ? new DOMRect(200, 200, 80, 30) : new DOMRect(0, 0, 144, 90);
    });
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(160);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
    render(
      <Popover defaultOpen>
        <Popover.Trigger>Anchor</Popover.Trigger>
        <Popover.Content placement="top">Context</Popover.Content>
      </Popover>,
    );
    expect(screen.getByRole('dialog')).toHaveStyle({ left: '160px', top: '92px' });
    fireEvent.resize(window);
    expect(screen.getByRole('dialog')).toHaveStyle({ left: '160px', top: '92px' });
  });
  it('repositions on scroll, resize and ResizeObserver and removes listeners/observers on close', () => {
    const observers: TestResizeObserver[] = [];
    class TestResizeObserver implements ResizeObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      constructor(readonly callback: ResizeObserverCallback) {
        observers.push(this);
      }
      notify() {
        this.callback([], this);
      }
    }
    vi.stubGlobal('ResizeObserver', TestResizeObserver);
    vi.stubGlobal('innerWidth', 1000);
    vi.stubGlobal('innerHeight', 800);
    let anchor = new DOMRect(200, 100, 80, 30);
    const original = HTMLElement.prototype.getBoundingClientRect;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.getAttribute('aria-haspopup') === 'dialog') return anchor;
      if (this.getAttribute('role') === 'dialog') return new DOMRect(0, 0, 160, 100);
      return original.call(this);
    });
    const removeWindow = vi.spyOn(window, 'removeEventListener');
    const removeDocument = vi.spyOn(document, 'removeEventListener');
    function Example({ open }: { open: boolean }) {
      return (
        <Popover open={open}>
          <Popover.Trigger>Anchor</Popover.Trigger>
          <Popover.Content>Context</Popover.Content>
        </Popover>
      );
    }
    const { rerender } = render(<Example open />);
    const panel = screen.getByRole('dialog');
    expect(panel).toHaveStyle({ left: '200px', top: '138px' });
    anchor = new DOMRect(250, 120, 80, 30);
    fireEvent.scroll(document);
    expect(panel).toHaveStyle({ left: '250px', top: '158px' });
    anchor = new DOMRect(300, 140, 80, 30);
    fireEvent.resize(window);
    expect(panel).toHaveStyle({ left: '300px', top: '178px' });
    anchor = new DOMRect(300, 750, 80, 30);
    act(() => observers.forEach((observer) => observer.notify()));
    expect(panel).toHaveAttribute('data-placement', 'topLeft');
    expect(panel).toHaveStyle({ top: '642px' });
    expect(observers[0]?.observe).toHaveBeenCalledWith(screen.getByRole('button'));
    expect(observers[0]?.observe).toHaveBeenCalledWith(panel);
    rerender(<Example open={false} />);
    expect(observers.every((observer) => observer.disconnect.mock.calls.length > 0)).toBe(true);
    expect(removeWindow).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(removeDocument).toHaveBeenCalledWith('scroll', expect.any(Function), true);
    expect(removeDocument).toHaveBeenCalledWith('pointerdown', expect.any(Function));
    expect(removeDocument).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
