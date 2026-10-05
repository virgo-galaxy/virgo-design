import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Dialog } from '../../components/Dialog';
import { Popover } from '../../components/Popover';
import { PortalProvider } from './Portal';

afterEach(() => vi.restoreAllMocks());

describe('workspace portal boundary', () => {
  it('positions a popup in local coordinates while its window moves and scales', async () => {
    let scale = 0.2;
    let x = 800;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.dataset.testid === 'workspace')
        return new DOMRect(x, 24, 1440 * scale, 1000 * scale);
      if (this.tagName === 'BUTTON')
        return new DOMRect(x + 1000 * scale, 24 + 50 * scale, 100 * scale, 30 * scale);
      return new DOMRect(0, 0, 160 * scale, 100 * scale);
    });
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.dataset.testid === 'workspace' ? 1440 : 160;
    });
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.dataset.testid === 'workspace' ? 1000 : 100;
    });
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1440);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(1000);
    function Workspace() {
      const ref = useRef<HTMLDivElement>(null);
      return (
        <div ref={ref} data-testid="workspace">
          <PortalProvider containerRef={ref}>
            <Popover>
              <Popover.Trigger>Filter</Popover.Trigger>
              <Popover.Content placement="bottomLeft">Options</Popover.Content>
            </Popover>
          </PortalProvider>
        </div>
      );
    }
    render(<Workspace />);
    await userEvent.click(screen.getByRole('button', { name: 'Filter' }));
    const popup = screen.getByRole('dialog');
    expect(popup.parentElement).toBe(screen.getByTestId('workspace'));
    expect(popup).toHaveStyle({ position: 'absolute', left: '1000px', top: '88px' });
    x = 500;
    scale = 0.3;
    act(() => fireEvent.resize(window));
    expect(popup).toHaveStyle({ left: '1000px', top: '88px' });
  });

  it('isolates modal content inside the workspace while the agent controls remain usable', async () => {
    function Workspace() {
      const ref = useRef<HTMLDivElement>(null);
      return (
        <>
          <div ref={ref} data-testid="workspace">
            <PortalProvider containerRef={ref}>
              <div data-testid="workspace-content">
                <Dialog>
                  <Dialog.Trigger>Details</Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content aria-label="Task details">
                      <input aria-label="Task name" />
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog>
              </div>
            </PortalProvider>
          </div>
          <button>Microphone</button>
        </>
      );
    }
    render(<Workspace />);
    await userEvent.click(screen.getByRole('button', { name: 'Details' }));
    expect(screen.getByRole('dialog').parentElement).toBe(screen.getByTestId('workspace'));
    expect(screen.getByTestId('workspace-content')).toHaveAttribute('inert');
    const microphone = screen.getByRole('button', { name: 'Microphone' });
    await userEvent.click(microphone);
    await act(async () => {});
    expect(microphone).toHaveFocus();
    fireEvent.keyDown(microphone, { key: 'Escape' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    act(() => screen.getByRole('textbox', { name: 'Task name' }).focus());
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.getByTestId('workspace-content')).not.toHaveAttribute('inert');
  });
});
