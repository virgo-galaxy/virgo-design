import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Popover } from '../Popover';
import { Dialog, type DialogProps } from './index';

function Example(props: DialogProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger>Edit details</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay data-testid="overlay" />
        <Dialog.Content>
          <Dialog.Title>Details</Dialog.Title>
          <Dialog.Description>Update your public details.</Dialog.Description>
          <input aria-label="Name" />
          <Dialog.Close>Done</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

describe('Dialog primitive', () => {
  it('opens from its trigger, portals content, closes, and restores focus', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { container } = render(<Example onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole('button', { name: 'Edit details' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Details' });
    expect(container).not.toContainElement(dialog);
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus();

    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
  });

  it('treats controlled state as the source of truth', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Example open={false} onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: 'Edit details' }));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(<Example open onOpenChange={onOpenChange} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    rerender(<Example open={false} onOpenChange={onOpenChange} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit details' })).toHaveFocus();
  });

  it('closes only the top layer on Escape and allows Escape cancellation', async () => {
    const user = userEvent.setup();
    render(
      <Dialog.Root>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content onEscapeKeyDown={(event) => event.preventDefault()}>
            <Dialog.Title>Settings</Dialog.Title>
            <button>Action</button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape and returns focus to its trigger', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Edit details' });
    await user.click(trigger);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('keeps focus restoration cancellable while exit presence is retained', async () => {
    const user = userEvent.setup();
    render(
      <Dialog.Root>
        <Dialog.Trigger>Open without restore</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content onCloseAutoFocus={(event) => event.preventDefault()}>
            <Dialog.Title>Without restore</Dialog.Title>
            <Dialog.Close>Close without restore</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    const trigger = screen.getByRole('button', { name: 'Open without restore' });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Close without restore' }));
    expect(trigger).not.toHaveFocus();
  });

  it('adds dialog relationships and isolates the modal background', async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Edit details' }));

    const dialog = screen.getByRole('dialog', { name: 'Details' });
    const title = screen.getByRole('heading', { name: 'Details' });
    const description = screen.getByText('Update your public details.');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).toHaveAttribute('aria-describedby', description.id);
    expect(container).toHaveAttribute('inert');
    expect(screen.getByTestId('overlay')).toHaveAttribute('aria-hidden', 'true');

    await user.click(screen.getByRole('button', { name: 'Done' }));
    expect(container).not.toHaveAttribute('inert');
  });

  it('traps modal Tab navigation and focuses the content when it has no controls', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Example defaultOpen />);
    const input = screen.getByRole('textbox', { name: 'Name' });
    const close = screen.getByRole('button', { name: 'Done' });
    expect(input).toHaveFocus();
    close.focus();
    await user.tab();
    expect(input).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();

    rerender(
      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Content aria-label="Notice">Read this message.</Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    expect(screen.getByRole('dialog', { name: 'Notice' })).toHaveFocus();
  });

  it('dismisses a non-modal dialog outside without stealing destination focus', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Example modal={false} />
        <button>Outside</button>
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Edit details' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveAttribute('aria-modal');
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();

    const outside = screen.getByRole('button', { name: 'Outside' });
    await user.click(outside);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(outside).toHaveFocus();
  });

  it('dismisses from the overlay and keeps nested portalled layers interactive', async () => {
    const user = userEvent.setup();
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Overlay data-testid="overlay" />
          <Dialog.Content>
            <Dialog.Title>Editor</Dialog.Title>
            <Popover>
              <Popover.Trigger>Options</Popover.Trigger>
              <Popover.Content aria-label="Options panel">
                <button>Nested action</button>
              </Popover.Content>
            </Popover>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    expect(screen.getByRole('dialog', { name: 'Options panel' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Options panel' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Editor' })).toBeInTheDocument();

    fireEvent.pointerDown(screen.getByTestId('overlay'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('isolates a nested modal and restores its parent layer when it closes', async () => {
    const user = userEvent.setup();
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Content>
            <Dialog.Title>Parent dialog</Dialog.Title>
            <Dialog.Root>
              <Dialog.Trigger>Open child</Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                  <Dialog.Title>Child dialog</Dialog.Title>
                  <Dialog.Close>Close child</Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    const parent = screen.getByRole('dialog', { name: 'Parent dialog' });
    const childTrigger = screen.getByRole('button', { name: 'Open child' });
    await user.click(childTrigger);
    expect(parent).toHaveAttribute('inert');
    expect(screen.getByRole('dialog', { name: 'Child dialog' })).not.toHaveAttribute('inert');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Child dialog' })).not.toBeInTheDocument();
    expect(parent).not.toHaveAttribute('inert');
    expect(childTrigger).toHaveFocus();
  });

  it('supports custom render props and cancellable trigger and close actions', async () => {
    const user = userEvent.setup();
    function ControlledRender() {
      const [open, setOpen] = useState(false);
      return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger render={(props) => <button {...props} data-custom-trigger="" />}>
            Open custom
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content aria-label="Custom">
              <Dialog.Close onClick={(event) => event.preventDefault()}>Keep open</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      );
    }
    render(<ControlledRender />);
    const trigger = screen.getByRole('button', { name: 'Open custom' });
    expect(trigger).toHaveAttribute('data-custom-trigger');
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Keep open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('keeps a controlled modal active when a dismiss request is rejected', () => {
    const onOpenChange = vi.fn();
    const { container } = render(<Example open onOpenChange={onOpenChange} />);
    fireEvent.pointerDown(screen.getByTestId('overlay'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(container).toHaveAttribute('inert');
    act(() => screen.getByRole('textbox').focus());
    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});
