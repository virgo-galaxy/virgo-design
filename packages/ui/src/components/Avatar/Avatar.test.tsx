import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './index';

describe('Avatar', () => {
  it('renders an image with accessible alt text', () => {
    render(<Avatar src="/avatar.png" alt="Demo User" fallback="DU" />);
    expect(screen.getByRole('img', { name: 'Demo User' })).toHaveAttribute('src', '/avatar.png');
    expect(screen.queryByText('DU')).not.toBeInTheDocument();
  });

  it('renders fallback content without an image', () => {
    render(<Avatar fallback="DU" />);
    expect(screen.getByText('DU')).toBeInTheDocument();
  });

  it('falls back after an image load failure', () => {
    render(<Avatar src="/missing.png" alt="Demo User" fallback="DU" />);
    fireEvent.error(screen.getByRole('img', { name: 'Demo User' }));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('DU')).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('supports the %s size', (size) => {
    render(<Avatar data-testid="avatar" fallback="A" size={size} />);
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', size);
  });

  it.each(['circle', 'square'] as const)('supports the %s shape', (shape) => {
    render(<Avatar data-testid="avatar" fallback="A" shape={shape} />);
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-shape', shape);
  });

  it('supports consumer className and decorative images', () => {
    render(<Avatar data-testid="avatar" className="custom" src="/avatar.png" />);
    expect(screen.getByTestId('avatar')).toHaveClass('custom');
    expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');
  });

  it('groups avatars without adding status or overflow semantics', () => {
    render(
      <Avatar.Group data-testid="group">
        <Avatar fallback="A" />
        <Avatar fallback="B" />
      </Avatar.Group>,
    );
    expect(screen.getByTestId('group')).toHaveTextContent('AB');
  });
});
