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
});
