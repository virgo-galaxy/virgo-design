// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CopyableText } from './CopyableText';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('CopyableText', () => {
  it('supports keyboard copying and keeps the tooltip open for success feedback', async () => {
    const user = userEvent.setup();
    const write = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    render(<CopyableText value="7a3f95c1-8b2d" />);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Copy 7a3f95c1-8b2d' })).toHaveFocus();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Copy');
    await user.keyboard('{Enter}');
    expect(write).toHaveBeenCalledExactlyOnceWith('7a3f95c1-8b2d');
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Copied'));
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
  });

  it('waits for clipboard success, isolates rows and clears feedback after two seconds', async () => {
    userEvent.setup();
    vi.useFakeTimers();
    let finish!: () => void;
    const write = vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    render(
      <>
        <CopyableText value="ID" data-testid="id" />
        <CopyableText value="Task name" data-testid="name" />
      </>,
    );
    const copy = screen.getByRole('button', { name: 'Copy ID' });
    fireEvent.click(copy);
    fireEvent.click(copy);
    expect(write).toHaveBeenCalledExactlyOnceWith('ID');
    expect(screen.getByTestId('id')).toHaveAttribute('data-copy-state', 'idle');
    await act(async () => finish());
    expect(screen.getByTestId('id')).toHaveAttribute('data-copy-state', 'copied');
    expect(screen.getByTestId('name')).toHaveAttribute('data-copy-state', 'idle');
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByTestId('id')).toHaveAttribute('data-copy-state', 'idle');
  });

  it('reports a clipboard failure and permits retry without activating its parent', async () => {
    const user = userEvent.setup();
    const write = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockRejectedValueOnce(new Error('Denied'))
      .mockResolvedValue();
    const parent = vi.fn();
    render(
      <div onClick={parent}>
        <CopyableText value="Task name" />
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Copy Task name' }));
    expect(screen.getByRole('status')).toHaveTextContent('Copy failed');
    expect(parent).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Copy Task name' }));
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
    expect(write).toHaveBeenCalledTimes(2);
  });

  it('discards a pending copy after the value changes and copies the new value', async () => {
    userEvent.setup();
    let finish!: () => void;
    const write = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            finish = resolve;
          }),
      )
      .mockResolvedValue();
    const { rerender } = render(<CopyableText value="Old" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy Old' }));
    rerender(<CopyableText value="New" />);
    await act(async () => finish());
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Copy New' })));
    expect(write).toHaveBeenLastCalledWith('New');
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
  });
});
