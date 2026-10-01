import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Steps } from './index';
describe('Steps', () => {
  it('keeps ordered semantics and consumer-owned progress while actions retain native behavior', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const ref = createRef<HTMLOListElement>();
    render(
      <Steps ref={ref} aria-label="Workflow" orientation="vertical">
        <Steps.Item status="complete">
          <Steps.Title>Create</Steps.Title>
        </Steps.Item>
        <Steps.Item status="current">
          <Steps.Trigger onClick={change}>
            <Steps.Title>Explore</Steps.Title>
            <Steps.Description>Find colors</Steps.Description>
          </Steps.Trigger>
        </Steps.Item>
        <Steps.Item>
          <Steps.Trigger disabled>Export</Steps.Trigger>
        </Steps.Item>
      </Steps>,
    );
    expect(screen.getByRole('list')).toBe(ref.current);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getAllByRole('listitem')[1]).toHaveAttribute('aria-current', 'step');
    await user.tab();
    await user.keyboard('{Enter}');
    expect(change).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Export' })).toBeDisabled();
  });
});
