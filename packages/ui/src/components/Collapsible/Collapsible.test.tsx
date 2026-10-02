import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Dialog } from '../Dialog';
import { Collapsible } from './index';
describe('UI Collapsible', () => {
  it('preserves labelled region, keyboard activation, refs and controlled ownership', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const change = vi.fn();
    const { rerender } = render(
      <Collapsible open={false} onOpenChange={change}>
        <Collapsible.Trigger ref={ref}>Details</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>,
    );
    expect(screen.getByRole('button')).toBe(ref.current);
    await user.tab();
    await user.keyboard(' ');
    expect(change).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('region')).toBeNull();
    rerender(
      <Collapsible key="uncontrolled" defaultOpen>
        <Collapsible.Trigger ref={ref}>Details</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>,
    );
    expect(screen.getByRole('region')).toHaveAccessibleName('Details');
    expect(ref.current).toHaveAttribute('aria-controls', screen.getByRole('region').id);
    await user.click(ref.current!);
    expect(screen.queryByRole('region')).toBeNull();
    expect(Collapsible.Root).not.toBe(Dialog.Root);
  });

  it('opts into reversible collapse motion without exposing closed controls', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    render(
      <Collapsible defaultOpen>
        <Collapsible.Trigger>Details</Collapsible.Trigger>
        <Collapsible.Content ref={ref} motion="collapse">
          <button>Content action</button>
        </Collapsible.Content>
      </Collapsible>,
    );
    expect(screen.getByRole('region')).toBe(ref.current);
    expect(ref.current).toHaveAttribute('data-motion', 'collapse');
    await user.click(screen.getByRole('button', { name: 'Details' }));
    expect(ref.current).toHaveAttribute('data-state', 'closed');
    expect(ref.current).toHaveAttribute('inert');
    expect(ref.current).not.toHaveAttribute('hidden');
    expect(screen.queryByRole('button', { name: 'Content action' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Details' }));
    expect(ref.current).toHaveAttribute('data-state', 'open');
    expect(ref.current).not.toHaveAttribute('inert');
    expect(screen.getByRole('button', { name: 'Content action' })).toBeVisible();
  });
});
