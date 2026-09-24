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
});
