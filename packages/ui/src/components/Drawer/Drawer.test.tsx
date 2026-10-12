import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Dialog } from '../Dialog';
import { Drawer } from './index';

function Example({ modal = true }: { modal?: boolean }) {
  return (
    <Drawer.Root modal={modal}>
      <Drawer.Trigger className="custom-trigger">Open settings</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="custom-overlay" data-testid="overlay" />
        <Drawer.Content className="custom-content">
          <Drawer.Header className="custom-header">
            <Drawer.Title className="custom-title">Settings</Drawer.Title>
            <Drawer.Description className="custom-description">
              Configure example settings.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className="custom-body">
            <input aria-label="Example name" />
          </Drawer.Body>
          <Drawer.Footer className="custom-footer">Footer content</Drawer.Footer>
          <Drawer.Close className="custom-close" />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

describe('Drawer UI', () => {
  it('keeps its compound namespace independent from Dialog when both families are imported', () => {
    const rootRef = createRef<HTMLDivElement>();
    expect(Drawer).not.toBe(Dialog);
    expect(Drawer.Root).not.toBe(Dialog.Root);
    expect(Drawer.Content).not.toBe(Dialog.Content);
    render(
      <>
        <Dialog.Root defaultOpen modal={false}>
          <Dialog.Content aria-label="Dialog panel">Dialog content</Dialog.Content>
        </Dialog.Root>
        <Drawer.Root
          defaultOpen
          modal={false}
          ref={rootRef}
          className="independent-drawer-root"
          data-testid="drawer-root"
        >
          <Drawer.Content aria-label="Drawer panel">Drawer content</Drawer.Content>
        </Drawer.Root>
      </>,
    );
    expect(rootRef.current).toBe(screen.getByTestId('drawer-root'));
    expect(rootRef.current).toHaveClass('independent-drawer-root');
    expect(screen.getByRole('dialog', { name: 'Dialog panel' })).not.toHaveAttribute(
      'data-placement',
    );
    expect(screen.getByRole('dialog', { name: 'Drawer panel' })).toHaveAttribute(
      'data-placement',
      'right',
    );
  });

  it('composes Dialog open, close, portal, focus, and accessibility behavior', async () => {
    const user = userEvent.setup();
    render(<Example />);

    const trigger = screen.getByRole('button', { name: 'Open settings' });
    expect(trigger).toHaveClass('custom-trigger');
    await user.click(trigger);

    const drawer = screen.getByRole('dialog', { name: 'Settings' });
    const title = screen.getByRole('heading', { name: 'Settings' });
    const description = screen.getByText('Configure example settings.');
    expect(drawer).toHaveAttribute('data-placement', 'right');
    expect(drawer).toHaveAttribute('data-size', 'md');
    expect(drawer).toHaveAttribute('aria-modal', 'true');
    expect(drawer).toHaveAttribute('aria-labelledby', title.id);
    expect(drawer).toHaveAttribute('aria-describedby', description.id);
    expect(drawer).toHaveClass('custom-content');
    expect(title).toHaveClass('custom-title');
    expect(description).toHaveClass('custom-description');
    expect(screen.getByTestId('overlay')).toHaveClass('custom-overlay');
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(screen.getByRole('textbox').parentElement).toHaveClass('custom-body');
    expect(screen.getByText('Footer content')).toHaveClass('custom-footer');
    expect(title.parentElement).toHaveClass('custom-header');

    const close = screen.getByRole('button', { name: 'Close drawer' });
    expect(close).toHaveClass('custom-close');
    await user.click(close);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it.each([
    [undefined, 'right'],
    ['left', 'left'],
    ['right', 'right'],
    ['top', 'top'],
    ['bottom', 'bottom'],
  ] as const)('maps placement %s to data-placement=%s', (placement, expected) => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal>
          <Drawer.Content {...(placement ? { placement } : {})} aria-label={`${expected} drawer`} />
        </Drawer.Portal>
      </Drawer.Root>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-placement', expected);
  });

  it.each([
    [undefined, 'md'],
    ['sm', 'sm'],
    ['md', 'md'],
    ['lg', 'lg'],
  ] as const)('maps size %s to data-size=%s', (size, expected) => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal>
          <Drawer.Content {...(size ? { size } : {})} aria-label={`${expected} drawer`} />
        </Drawer.Portal>
      </Drawer.Root>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', expected);
  });

  it('supports non-modal composition without rendering the modal overlay', async () => {
    const user = userEvent.setup();
    render(<Example modal={false} />);
    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-modal');
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  it('forwards controlled state, refs, event hooks, and custom size styles', () => {
    const ref = createRef<HTMLDivElement>();
    const onPointerDownOutside = vi.fn((event: PointerEvent) => event.preventDefault());
    render(
      <Drawer.Root open onOpenChange={vi.fn()}>
        <Drawer.Portal>
          <Drawer.Overlay data-testid="controlled-overlay" />
          <Drawer.Content
            ref={ref}
            aria-label="Controlled drawer"
            className="controlled-drawer"
            onPointerDownOutside={onPointerDownOutside}
            style={{ '--drawer-size': '42rem' } as React.CSSProperties}
          />
        </Drawer.Portal>
      </Drawer.Root>,
    );
    const drawer = screen.getByRole('dialog');
    expect(ref.current).toBe(drawer);
    expect(drawer).toHaveStyle({ '--drawer-size': '42rem' });
    fireEvent.pointerDown(document.body);
    expect(onPointerDownOutside).toHaveBeenCalledOnce();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('supports visible and custom-render close controls', async () => {
    const user = userEvent.setup();
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal>
          <Drawer.Content aria-label="Actions">
            <Drawer.Close className="text-close">Cancel</Drawer.Close>
            <Drawer.Close
              className="custom-render-close"
              render={(props) => <button {...props} data-custom-close="" />}
            >
              Custom close
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>,
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass('text-close');
    const custom = screen.getByRole('button', { name: 'Custom close' });
    expect(custom).toHaveClass('custom-render-close');
    expect(custom).toHaveAttribute('data-custom-close');
    await user.click(custom);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
