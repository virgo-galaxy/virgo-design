import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './index';

describe('Skeleton', () => {
  it.each(['text', 'rectangle', 'circle'] as const)('supports the %s variant', (variant) => {
    render(<Skeleton data-testid="skeleton" variant={variant} />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-variant', variant);
  });

  it('is hidden from assistive technology by default', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('is animated by default and supports a static state', () => {
    const { rerender } = render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-animated');
    rerender(<Skeleton data-testid="skeleton" animated={false} />);
    expect(screen.getByTestId('skeleton')).not.toHaveAttribute('data-animated');
  });

  it('supports consumer className and native dimensions', () => {
    render(
      <Skeleton data-testid="skeleton" className="custom" style={{ width: 200, height: 20 }} />,
    );
    expect(screen.getByTestId('skeleton')).toHaveClass('custom');
    expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '200px', height: '20px' });
  });
});
