import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Dialog } from '../../components/Dialog';
import { Dropdown } from '../../components/Dropdown';
import { Menu } from '../../components/Menu';
import { Popover } from '../../components/Popover';
import { Toast } from '../../components/Toast';

afterEach(() => vi.restoreAllMocks());

describe('portal presentation scopes', () => {
  it('keeps dialog and floating scopes aligned through ancestor updates and removal', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.tagName === 'BUTTON'
        ? new DOMRect(200, 100, 80, 30)
        : new DOMRect(0, 0, 160, 100);
    });
    const { unmount } = render(
      <section data-virgo-theme="glass" data-theme="light" dir="ltr">
        <div data-testid="scope" data-virgo-theme="contrast" data-theme="dark" dir="ltr">
          <Dialog.Root defaultOpen modal={false}>
            <Dialog.Content data-testid="dialog">
              <Dialog.Title>Settings</Dialog.Title>
            </Dialog.Content>
          </Dialog.Root>
          <Popover defaultOpen>
            <Popover.Trigger>Anchor</Popover.Trigger>
            <Popover.Content data-testid="floating" placement="bottomStart">
              Context
            </Popover.Content>
          </Popover>
        </div>
      </section>,
    );
    const scope = screen.getByTestId('scope');
    const dialog = screen.getByTestId('dialog');
    const floating = screen.getByTestId('floating');
    expect(floating).toHaveStyle({ left: '200px' });
    await act(async () => {
      scope.setAttribute('data-virgo-theme', 'retro');
      scope.setAttribute('data-theme', 'light');
      scope.setAttribute('dir', 'rtl');
    });
    for (const panel of [dialog, floating]) {
      expect(panel).toHaveAttribute('data-virgo-theme', 'retro');
      expect(panel).toHaveAttribute('data-theme', 'light');
      expect(panel).toHaveAttribute('dir', 'rtl');
    }
    expect(floating).toHaveStyle({ left: '120px' });
    await act(async () => {
      scope.removeAttribute('data-virgo-theme');
      scope.removeAttribute('data-theme');
      scope.removeAttribute('dir');
    });
    for (const panel of [dialog, floating]) {
      expect(panel).toHaveAttribute('data-virgo-theme', 'glass');
      expect(panel).toHaveAttribute('data-theme', 'light');
      expect(panel).toHaveAttribute('dir', 'ltr');
    }
    expect(floating).toHaveStyle({ left: '200px' });
    unmount();
  });
  it('preserves stable Root callback refs and React cleanup during scope updates', async () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { container, unmount } = render(
      <div data-virgo-theme="glass">
        <Dialog.Root ref={ref} defaultOpen>
          <Dialog.Content>
            <Dialog.Title>Settings</Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>
      </div>,
    );
    await act(async () => container.firstElementChild?.setAttribute('data-virgo-theme', 'retro'));
    expect(ref).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
  it('preserves preset changes in the shared Menu content path', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div data-virgo-theme="retro" data-theme="dark">
        <Menu>
          <Menu.Trigger>Menu actions</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Menu actions' }));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('data-virgo-theme', 'retro');
    expect(menu).toHaveAttribute('data-theme', 'dark');
    await act(async () => {
      container.firstElementChild?.setAttribute('data-virgo-theme', 'contrast');
      container.firstElementChild?.setAttribute('data-theme', 'light');
    });
    expect(menu).toHaveAttribute('data-virgo-theme', 'contrast');
    expect(menu).toHaveAttribute('data-theme', 'light');
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Menu actions' })).toHaveFocus();
  });
  it('keeps a local preset and appearance on a menu, including live scope removal', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div data-virgo-theme="minimal" data-theme="light">
        <div data-virgo-theme="retro" data-theme="dark">
          <Dropdown>
            <Dropdown.Trigger>Actions</Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Copy</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    const menu = screen.getByRole('menu');
    expect(menu.parentElement).toBe(document.body);
    expect(menu).toHaveAttribute('data-virgo-theme', 'retro');
    expect(menu).toHaveAttribute('data-theme', 'dark');
    const scope = container.querySelector('[data-virgo-theme="retro"]')!;
    await act(async () => {
      scope.setAttribute('data-virgo-theme', 'contrast');
      scope.setAttribute('data-theme', 'light');
    });
    expect(menu).toHaveAttribute('data-virgo-theme', 'contrast');
    expect(menu).toHaveAttribute('data-theme', 'light');
    await act(async () => scope.removeAttribute('data-virgo-theme'));
    expect(menu).toHaveAttribute('data-virgo-theme', 'minimal');
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus();
  });

  it('preserves a programmatically opened dialog scope on both content and backdrop', async () => {
    const { container } = render(
      <div data-virgo-theme="glass" data-theme="dark" dir="rtl">
        <Dialog.Root defaultOpen>
          <Dialog.Portal>
            <Dialog.Overlay data-testid="backdrop" />
            <Dialog.Content>
              <Dialog.Title>Settings</Dialog.Title>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>,
    );
    const dialog = screen.getByRole('dialog');
    const backdrop = screen.getByTestId('backdrop');
    for (const element of [dialog, backdrop]) {
      expect(container).not.toContainElement(element);
      expect(element).toHaveAttribute('data-virgo-theme', 'glass');
      expect(element).toHaveAttribute('data-theme', 'dark');
      expect(element).toHaveAttribute('dir', 'rtl');
    }
    await act(async () =>
      container.firstElementChild?.setAttribute('data-virgo-theme', 'contrast'),
    );
    expect(dialog).toHaveAttribute('data-virgo-theme', 'contrast');
    expect(backdrop).toHaveAttribute('data-virgo-theme', 'contrast');
  });

  it('keeps a portalled toast in its local preset while the source scope changes', async () => {
    const { container, unmount } = render(
      <div data-virgo-theme="soft" data-theme="light">
        <Toast.Provider>
          <Toast.Root duration={0}>
            <Toast.Title>Saved</Toast.Title>
          </Toast.Root>
          <Toast.Viewport portal />
        </Toast.Provider>
      </div>,
    );
    const viewport = screen.getByRole('region');
    expect(viewport).toHaveAttribute('data-virgo-theme', 'soft');
    await act(async () => container.firstElementChild?.setAttribute('data-virgo-theme', 'retro'));
    await waitFor(() => expect(viewport).toHaveAttribute('data-virgo-theme', 'retro'));
    unmount();
    expect(viewport).not.toBeInTheDocument();
  });
});
