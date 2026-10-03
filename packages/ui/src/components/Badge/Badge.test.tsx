import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../Button';
import { Badge } from './index';

describe('Badge', () => {
  it('renders numeric and short text counts', () => {
    const { rerender } = render(<Badge count={8} />);
    expect(screen.getByText('8')).toBeInTheDocument();
    rerender(<Badge count="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('hides zero by default and supports showZero', () => {
    const { rerender } = render(<Badge count={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    rerender(<Badge count={0} showZero />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('caps numeric counts without changing short text', () => {
    const { rerender } = render(<Badge count={120} max={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
    rerender(<Badge count="99+" max={1} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('renders an accessible dot without visible text', () => {
    render(
      <Badge dot intent="success" aria-label="Online">
        <span>Avatar</span>
      </Badge>,
    );
    const dot = screen.getByRole('img', { name: 'Online' });
    expect(dot).toHaveAttribute('data-dot');
    expect(dot).toHaveAttribute('data-intent', 'success');
    expect(dot).toBeEmptyDOMElement();
  });

  it.each(['default', 'success', 'warning', 'danger', 'info'] as const)(
    'supports the %s intent',
    (intent) => {
      render(<Badge count={1} intent={intent} />);
      expect(screen.getByText('1')).toHaveAttribute('data-intent', intent);
    },
  );

  it('wraps interactive children without intercepting their behavior', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Badge count={3}>
        <Button onClick={onClick}>Inbox</Button>
      </Badge>,
    );
    await user.click(screen.getByRole('button', { name: 'Inbox' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('supports a standalone badge and consumer className', () => {
    render(<Badge count={4} className="custom" data-testid="badge" />);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-standalone');
    expect(screen.getByTestId('badge')).toHaveClass('custom');
  });

  it('keeps dots static by default and supports changing their animation', () => {
    const { rerender } = render(<Badge dot intent="success" aria-label="Online" />);
    const dot = () => screen.getByRole('img', { name: 'Online' });
    expect(dot()).not.toHaveAttribute('data-animation');
    rerender(<Badge dot intent="success" animation="breathe" aria-label="Online" />);
    expect(dot()).toHaveAttribute('data-animation', 'breathe');
    expect(dot()).toHaveAttribute('data-intent', 'success');
    rerender(<Badge dot intent="success" animation="none" aria-label="Online" />);
    expect(dot()).not.toHaveAttribute('data-animation');
  });

  it('does not animate counts when breathing is requested', () => {
    render(<Badge count={8} animation="breathe" />);
    expect(screen.getByText('8')).not.toHaveAttribute('data-animation');
    expect(screen.getByText('8')).not.toHaveAttribute('data-dot');
  });

  it('keeps breathing attached dots accessible without intercepting the host', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Badge dot intent="info" animation="breathe" aria-label="Syncing">
        <Button onClick={onClick}>Open workspace</Button>
      </Badge>,
    );
    expect(screen.getByRole('img', { name: 'Syncing' })).toHaveAttribute(
      'data-animation',
      'breathe',
    );
    await user.click(screen.getByRole('button', { name: 'Open workspace' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Open workspace' })).toHaveFocus();
  });
});
