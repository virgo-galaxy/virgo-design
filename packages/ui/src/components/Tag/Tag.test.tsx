import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkspaceIcon } from '@virgo-design/icons';
import { describe, expect, it, vi } from 'vitest';

import { Tag } from './index';

describe('Tag', () => {
  it('renders defaults and preserves consumer attributes', () => {
    render(
      <Tag className="custom" data-testid="tag">
        React
      </Tag>,
    );
    expect(screen.getByTestId('tag')).toHaveTextContent('React');
    expect(screen.getByTestId('tag')).toHaveClass('custom');
    expect(screen.getByTestId('tag')).toHaveAttribute('data-intent', 'neutral');
    expect(screen.getByTestId('tag')).toHaveAttribute('data-variant', 'soft');
    expect(screen.getByTestId('tag')).toHaveAttribute('data-size', 'md');
  });

  it.each(['neutral', 'brand', 'success', 'warning', 'danger', 'info'] as const)(
    'supports the %s intent',
    (intent) => {
      render(<Tag intent={intent}>{intent}</Tag>);
      expect(screen.getByText(intent).closest('[data-intent]')).toHaveAttribute(
        'data-intent',
        intent,
      );
    },
  );

  it.each(['soft', 'solid', 'outline'] as const)('supports the %s variant', (variant) => {
    render(<Tag variant={variant}>{variant}</Tag>);
    expect(screen.getByText(variant).closest('[data-variant]')).toHaveAttribute(
      'data-variant',
      variant,
    );
  });

  it.each(['sm', 'md', 'lg'] as const)('supports the %s size', (size) => {
    render(<Tag size={size}>{size}</Tag>);
    expect(screen.getByText(size).closest('[data-size]')).toHaveAttribute('data-size', size);
  });

  it('renders a decorative icon', () => {
    render(<Tag icon={<WorkspaceIcon data-testid="icon" />}>Workspace</Tag>);
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('notifies close without removing itself or bubbling to the tag owner', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onClick = vi.fn();
    render(
      <Tag closable closeLabel="Remove TypeScript" onClose={onClose} onClick={onClick}>
        TypeScript
      </Tag>,
    );
    const close = screen.getByRole('button', { name: 'Remove TypeScript' });
    await user.click(close);
    expect(onClose).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('supports keyboard close and disables only the interactive control', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(
      <Tag closable onClose={onClose}>
        Beta
      </Tag>,
    );
    const close = screen.getByRole('button', { name: 'Remove tag' });
    close.focus();
    await user.keyboard('{Enter}');
    expect(onClose).toHaveBeenCalledOnce();

    rerender(
      <Tag closable disabled onClose={onClose}>
        Beta
      </Tag>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
