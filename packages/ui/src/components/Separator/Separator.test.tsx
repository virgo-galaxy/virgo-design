import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Separator } from './index';

describe('Separator', () => {
  it('renders a semantic horizontal separator by default', () => {
    render(<Separator />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('supports vertical orientation', () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('removes separator semantics when decorative', () => {
    render(<Separator decorative data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(separator).not.toHaveAttribute('role');
    expect(separator).not.toHaveAttribute('aria-orientation');
    expect(separator).toHaveAttribute('data-decorative');
  });

  it('supports consumer className, style, and HTML props', () => {
    render(
      <Separator
        className="custom"
        data-testid="separator"
        title="Section boundary"
        style={{ marginBlock: 8 }}
      />,
    );
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass('custom');
    expect(separator).toHaveAttribute('title', 'Section boundary');
    expect(separator).toHaveStyle({ marginBlock: '8px' });
  });
});
