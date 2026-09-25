import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Spinner } from './index';

describe('Spinner', () => {
  it('renders a visual-only spinner by default', () => {
    render(<Spinner data-testid="spinner" />);
    expect(screen.getByTestId('spinner')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('spinner')).not.toHaveAttribute('role');
  });

  it('supports an accessible loading label', () => {
    render(<Spinner aria-label="Loading profile" />);
    const spinner = screen.getByRole('status', { name: 'Loading profile' });
    expect(spinner).not.toHaveAttribute('aria-hidden');
  });

  it.each(['sm', 'md', 'lg'] as const)('supports the %s size', (size) => {
    render(<Spinner data-testid="spinner" size={size} />);
    expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', size);
  });

  it.each(['current', 'neutral', 'brand'] as const)('supports the %s intent', (intent) => {
    render(<Spinner data-testid="spinner" intent={intent} />);
    expect(screen.getByTestId('spinner')).toHaveAttribute('data-intent', intent);
  });

  it('supports consumer className and exposes tokenized motion behavior', () => {
    render(<Spinner data-testid="spinner" className="custom" />);
    expect(screen.getByTestId('spinner')).toHaveClass('custom');
    expect(screen.getByTestId('spinner')).toHaveAttribute('data-motion', 'spin');
  });
});
