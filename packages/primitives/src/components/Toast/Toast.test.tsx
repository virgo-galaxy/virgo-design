import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Toast } from './index';

function Example({ duration = 0, onOpenChange = vi.fn() }) {
  return (
    <Toast.Provider>
      <Toast.Root duration={duration} onOpenChange={onOpenChange}>
        <Toast.Title>Saved</Toast.Title>
        <Toast.Description>Your changes are ready.</Toast.Description>
        <Toast.Action>Undo</Toast.Action>
        <Toast.Close>Dismiss</Toast.Close>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

describe('Toast primitive', () => {
  it('keeps the default viewport inline', () => {
    const { container } = render(<Example />);
    expect(container).toContainElement(screen.getByRole('region'));
  });

  it('portals outside layouts and follows their theme and direction', async () => {
    const ref = { current: null as HTMLDivElement | null };
    const example = (theme: string, direction: 'ltr' | 'rtl') => (
      <div data-theme={theme} dir={direction}>
        <Toast.Provider>
          <Toast.Root duration={0}>
            <Toast.Title>Saved outside layout</Toast.Title>
          </Toast.Root>
          <Toast.Viewport portal ref={ref} />
        </Toast.Provider>
      </div>
    );
    const { container, rerender, unmount } = render(example('dark', 'rtl'));
    const viewport = screen.getByRole('region');
    expect(viewport.parentElement).toBe(document.body);
    expect(container).not.toContainElement(viewport);
    expect(ref.current).toBe(viewport);
    expect(viewport).toHaveAttribute('data-theme', 'dark');
    expect(viewport).toHaveAttribute('dir', 'rtl');
    expect(viewport).toContainElement(screen.getByRole('status'));
    rerender(example('light', 'ltr'));
    await waitFor(() => {
      expect(viewport).toHaveAttribute('data-theme', 'light');
      expect(viewport).toHaveAttribute('dir', 'ltr');
    });
    unmount();
    expect(viewport).not.toBeInTheDocument();
    expect(ref.current).toBeNull();
  });

  it('portals into the viewport with live-region relationships and does not steal focus', () => {
    const outside = document.createElement('button');
    document.body.append(outside);
    outside.focus();
    render(<Example />);
    const toast = screen.getByRole('status', { name: 'Saved' });
    expect(toast).toHaveAccessibleDescription('Your changes are ready.');
    expect(screen.getByRole('region', { name: 'Notifications' })).toContainElement(toast);
    expect(outside).toHaveFocus();
    outside.remove();
  });

  it('closes from action and close controls and respects controlled state', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Toast.Provider>
        <Toast.Root open onOpenChange={onOpenChange} duration={0}>
          <Toast.Title>Controlled</Toast.Title>
          <Toast.Close>Close</Toast.Close>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>,
    );
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(false);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(
      <Toast.Provider>
        <Toast.Root open={false} onOpenChange={onOpenChange} duration={0}>
          <Toast.Title>Controlled</Toast.Title>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>,
    );
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('auto dismisses and pauses the remaining duration for pointer and focus', () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    render(<Example duration={1000} onOpenChange={onOpenChange} />);
    const toast = screen.getByRole('status');
    act(() => vi.advanceTimersByTime(400));
    fireEvent.pointerEnter(toast);
    act(() => vi.advanceTimersByTime(1000));
    expect(onOpenChange).not.toHaveBeenCalled();
    fireEvent.pointerLeave(toast);
    act(() => vi.advanceTimersByTime(599));
    expect(onOpenChange).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });

  it('stacks multiple toasts and F8 moves focus into their controls', () => {
    render(
      <Toast.Provider>
        <Toast.Root duration={0}>
          <Toast.Title>First</Toast.Title>
          <Toast.Close>Close first</Toast.Close>
        </Toast.Root>
        <Toast.Root duration={0} priority="assertive">
          <Toast.Title>Second</Toast.Title>
        </Toast.Root>
        <Toast.Viewport aria-label="Messages" />
      </Toast.Provider>,
    );
    expect(screen.getAllByText(/First|Second/).map((node) => node.textContent)).toEqual([
      'First',
      'Second',
    ]);
    expect(screen.getByRole('alert', { name: 'Second' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'F8' });
    expect(screen.getByRole('button', { name: 'Close first' })).toHaveFocus();
  });
});
