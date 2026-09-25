import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Progress } from './index';

describe('Progress', () => {
  it('renders value and default max with progress semantics', () => {
    render(<Progress value={40} aria-label="Upload" />);
    const progress = screen.getByRole('progressbar', { name: 'Upload' });
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-valuenow', '40');
  });

  it('calculates percentage from a custom max', () => {
    render(<Progress value={3} max={4} showValue />);
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar').firstElementChild).toHaveStyle({ width: '75%' });
  });

  it.each([
    { value: -20, expected: 0, width: '0%' },
    { value: 120, expected: 100, width: '100%' },
    { value: Number.NaN, expected: 0, width: '0%' },
  ])('clamps $value to $expected', ({ value, expected, width }) => {
    render(<Progress value={value} aria-label="Task" />);
    const progress = screen.getByRole('progressbar', { name: 'Task' });
    expect(progress).toHaveAttribute('aria-valuenow', String(expected));
    expect(progress.firstElementChild).toHaveStyle({ width });
  });

  it('normalizes an invalid max', () => {
    render(<Progress value={50} max={0} showValue aria-label="Task" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('supports the %s size', (size) => {
    render(<Progress data-testid="root" value={25} size={size} />);
    expect(screen.getByTestId('root')).toHaveAttribute('data-size', size);
  });

  it.each(['default', 'success', 'warning', 'error'] as const)(
    'supports the %s intent',
    (intent) => {
      render(<Progress data-testid="root" value={25} intent={intent} />);
      expect(screen.getByTestId('root')).toHaveAttribute('data-intent', intent);
    },
  );

  it('renders a visible label and consumer className', () => {
    render(<Progress className="custom" data-testid="root" value={25} label="Uploading" />);
    expect(screen.getByText('Uploading')).toBeInTheDocument();
    expect(screen.getByTestId('root')).toHaveClass('custom');
  });
});
