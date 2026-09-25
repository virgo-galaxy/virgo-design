import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CircleInfoIcon } from '@virgo-design/icons';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { FloatingAction } from './index';

function Example() {
  return (
    <>
      <FloatingAction.Group>
        <FloatingAction.Trigger aria-label="Quick actions" />
        <FloatingAction.Content aria-label="Action list">
          <FloatingAction aria-label="Help">
            <CircleInfoIcon />
          </FloatingAction>
          <FloatingAction aria-label="Inspect">
            <CircleInfoIcon />
          </FloatingAction>
        </FloatingAction.Content>
      </FloatingAction.Group>
      <button>Outside</button>
    </>
  );
}

describe('FloatingAction', () => {
  it('reuses circular Button semantics, classes, refs and disabled behavior', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const { rerender } = render(
      <FloatingAction ref={ref} aria-label="Help" className="consumer" onClick={onClick}>
        <CircleInfoIcon />
      </FloatingAction>,
    );
    expect(ref.current).toHaveClass('consumer');
    expect(ref.current).toHaveAttribute('data-shape', 'circle');
    expect(ref.current).toHaveAttribute('data-icon-only', 'true');
    expect(ref.current).toHaveAttribute('data-size', 'large');
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <FloatingAction aria-label="Help" disabled onClick={onClick}>
        <CircleInfoIcon />
      </FloatingAction>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('opens from keyboard, enters the action group, and returns focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Quick actions' });
    const closedIcon = trigger.querySelector('svg')?.innerHTML;
    await user.tab();
    await user.keyboard(' ');
    const dialog = screen.getByRole('dialog', { name: 'Action list' });
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.querySelector('svg')?.innerHTML).not.toBe(closedIcon);
    expect(screen.getByRole('button', { name: 'Help' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Inspect' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('dismisses by trigger and outside pointer without stealing outside focus', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Quick actions' });
    await user.click(trigger);
    await user.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(trigger);
    const outside = screen.getByRole('button', { name: 'Outside' });
    await user.click(outside);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(outside).toHaveFocus();
  });

  it('supports controlled group state, custom trigger rendering and portalled themes', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <FloatingAction.Group open={false} onOpenChange={onOpenChange}>
        <FloatingAction.Trigger aria-label="Actions" />
        <FloatingAction.Content>Content</FloatingAction.Content>
      </FloatingAction.Group>,
    );
    await user.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    rerender(
      <div data-theme="dark">
        <FloatingAction.Group open>
          <FloatingAction.Trigger
            aria-label="Actions"
            render={(props) => <button {...props} data-testid="custom" />}
          />
          <FloatingAction.Content aria-label="Actions" className="consumer-content">
            <FloatingAction aria-label="Help">
              <CircleInfoIcon />
            </FloatingAction>
          </FloatingAction.Content>
        </FloatingAction.Group>
      </div>,
    );
    expect(screen.getByTestId('custom')).toHaveAttribute('aria-expanded', 'true');
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('data-theme', 'dark');
    expect(dialog).toHaveClass('consumer-content');
    expect(dialog.parentElement).toBe(document.body);
  });

  it('returns focus after the consumer closes a group from an action', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <FloatingAction.Group open={open} onOpenChange={setOpen}>
          <FloatingAction.Trigger aria-label="Actions" />
          <FloatingAction.Content>
            <FloatingAction aria-label="Run" onClick={() => setOpen(false)}>
              <CircleInfoIcon />
            </FloatingAction>
          </FloatingAction.Content>
        </FloatingAction.Group>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('button', { name: 'Run' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus();
  });
});
