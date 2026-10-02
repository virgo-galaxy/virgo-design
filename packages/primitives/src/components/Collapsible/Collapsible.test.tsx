import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Collapsible } from './index';

function Example(props: React.ComponentProps<typeof Collapsible.Root>) {
  return (
    <Collapsible.Root {...props}>
      <Collapsible.Trigger>Details</Collapsible.Trigger>
      <Collapsible.Content>Additional details</Collapsible.Content>
    </Collapsible.Root>
  );
}

describe('Collapsible primitive', () => {
  it('opens and closes while preserving trigger-content relationships', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Example onOpenChange={onOpenChange} />);

    const trigger = screen.getByRole('button', { name: 'Details' });
    const content = screen.getByText('Additional details');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls', content.id);
    expect(content).toHaveAttribute('aria-labelledby', trigger.id);
    expect(content).toHaveAttribute('role', 'region');
    expect(content).toHaveAttribute('hidden');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(content).not.toHaveAttribute('hidden');

    await user.click(trigger);
    expect(content).toHaveAttribute('hidden');
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
  });

  it('uses controlled state as the source of truth', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Example open={false} onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: 'Details' }));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.getByText('Additional details')).toHaveAttribute('hidden');

    rerender(<Example open onOpenChange={onOpenChange} />);
    expect(screen.getByText('Additional details')).not.toHaveAttribute('hidden');
  });

  it('retains closed content for animation while removing it from the accessibility tree', () => {
    const { rerender } = render(
      <Collapsible open={false}>
        <Collapsible.Trigger>Details</Collapsible.Trigger>
        <Collapsible.Content keepMounted aria-label="Panel details">
          <input aria-label="Draft" defaultValue="Preserved draft" />
        </Collapsible.Content>
      </Collapsible>,
    );
    const draft = screen.getByDisplayValue('Preserved draft');
    const content = draft.parentElement!;
    expect(content).not.toHaveAttribute('hidden');
    expect(content).toHaveAttribute('inert');
    expect(content).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('region')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
    rerender(
      <Collapsible open>
        <Collapsible.Trigger>Details</Collapsible.Trigger>
        <Collapsible.Content keepMounted aria-label="Panel details">
          <input aria-label="Draft" defaultValue="Preserved draft" />
        </Collapsible.Content>
      </Collapsible>,
    );
    expect(screen.getByRole('region', { name: 'Panel details' })).toBe(content);
    expect(screen.getByRole('textbox', { name: 'Draft' })).toBe(draft);
    expect(content).not.toHaveAttribute('inert');
    expect(content).not.toHaveAttribute('aria-hidden');
  });

  it('respects an explicit content heading independently of the trigger label', () => {
    render(
      <Collapsible defaultOpen>
        <h2 id="panel-title">Project distribution</h2>
        <Collapsible.Trigger>Minimize</Collapsible.Trigger>
        <Collapsible.Content aria-labelledby="panel-title">Project totals</Collapsible.Content>
      </Collapsible>,
    );
    expect(screen.getByRole('region')).toHaveAccessibleName('Project distribution');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-controls',
      screen.getByRole('region').id,
    );
  });
});
