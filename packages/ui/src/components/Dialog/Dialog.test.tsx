import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../Button';
import { Dialog } from './index';

describe('Dialog UI', () => {
  it('styles every part while preserving primitive behavior and focus return', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const contentRef = createRef<HTMLDivElement>();
    render(
      <Dialog.Root className="custom-root" onOpenChange={onOpenChange}>
        <Dialog.Trigger className="custom-trigger" size="small" variant="text">
          Edit details
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="custom-overlay" data-testid="overlay" />
          <Dialog.Content ref={contentRef} className="custom-content" size="lg">
            <Dialog.Header className="custom-header">
              <Dialog.Title className="custom-title">Details</Dialog.Title>
              <Dialog.Description className="custom-description">
                Update your details details.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body className="custom-body">
              <input aria-label="Name" />
            </Dialog.Body>
            <Dialog.Footer className="custom-footer">
              <Dialog.Close className="custom-close">Cancel</Dialog.Close>
              <Button>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    const trigger = screen.getByRole('button', { name: 'Edit details' });
    expect(trigger).toHaveAttribute('data-size', 'small');
    expect(trigger).toHaveAttribute('data-variant', 'text');
    expect(trigger).toHaveClass('custom-trigger');
    expect(trigger.parentElement).toHaveClass('custom-root');

    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Details' });
    expect(contentRef.current).toBe(dialog);
    expect(dialog).toHaveAttribute('data-size', 'lg');
    expect(dialog).toHaveClass('custom-content');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByTestId('overlay')).toHaveClass('custom-overlay');
    expect(screen.getByRole('heading', { name: 'Details' })).toHaveClass('custom-title');
    expect(screen.getByText('Update your details details.')).toHaveClass('custom-description');
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus();
    expect(screen.getByRole('textbox').parentElement).toHaveClass('custom-body');
    expect(screen.getByRole('button', { name: 'Cancel' }).parentElement).toHaveClass(
      'custom-footer',
    );

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
  });

  it.each([
    [undefined, 'md'],
    ['sm', 'sm'],
    ['md', 'md'],
    ['lg', 'lg'],
  ] as const)('maps size %s to data-size=%s', (size, expected) => {
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Content {...(size ? { size } : {})} aria-label="Sized dialog" />
        </Dialog.Portal>
      </Dialog.Root>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', expected);
  });

  it('keeps custom render triggers and close controls free of Virgo Button styling', async () => {
    const user = userEvent.setup();
    render(
      <Dialog.Root>
        <Dialog.Trigger
          className="avatar-trigger"
          render={(props) => <button {...props} data-custom-trigger="" />}
        >
          Open custom
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content aria-label="Custom dialog">
            <Dialog.Close
              className="plain-close"
              render={(props) => <button {...props} data-custom-close="" />}
            >
              Close custom
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    const trigger = screen.getByRole('button', { name: 'Open custom' });
    expect(trigger).toHaveClass('avatar-trigger');
    expect(trigger).toHaveAttribute('data-custom-trigger');
    expect(trigger).not.toHaveAttribute('data-variant');
    await user.click(trigger);
    const close = screen.getByRole('button', { name: 'Close custom' });
    expect(close).toHaveClass('plain-close');
    expect(close).toHaveAttribute('data-custom-close');
    expect(close).not.toHaveAttribute('data-variant');
    await user.click(close);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('forwards controlled state without presenting a rejected open request', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Dialog.Root open={false} onOpenChange={onOpenChange}>
        <Dialog.Trigger>Controlled</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content aria-label="Controlled dialog" />
        </Dialog.Portal>
      </Dialog.Root>,
    );
    await user.click(screen.getByRole('button', { name: 'Controlled' }));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <Dialog.Root open onOpenChange={onOpenChange}>
        <Dialog.Trigger>Controlled</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content aria-label="Controlled dialog" />
        </Dialog.Portal>
      </Dialog.Root>,
    );
    expect(screen.getByRole('dialog', { name: 'Controlled dialog' })).toBeInTheDocument();
  });
});
