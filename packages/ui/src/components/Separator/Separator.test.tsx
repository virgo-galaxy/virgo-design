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

  it('uses the visible horizontal label as its accessible name', () => {
    render(<Separator>In review</Separator>);
    const separator = screen.getByRole('separator', { name: 'In review' });
    const label = screen.getByText('In review');
    expect(separator).toHaveAttribute('data-label-align', 'center');
    expect(separator).toHaveAttribute('aria-labelledby', label.id);
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('keeps explicit accessible names and independent label IDs', () => {
    render(
      <>
        <span id="review-boundary">Review boundary</span>
        <Separator labelAlign="start" aria-label="Draft boundary">
          Draft
        </Separator>
        <Separator labelAlign="end" aria-labelledby="review-boundary">
          Review
        </Separator>
      </>,
    );
    expect(screen.getByRole('separator', { name: 'Draft boundary' })).not.toHaveAttribute(
      'aria-labelledby',
    );
    expect(screen.getByRole('separator', { name: 'Review boundary' })).toHaveAttribute(
      'aria-labelledby',
      'review-boundary',
    );
    expect(screen.getByText('Draft').id).not.toBe(screen.getByText('Review').id);
  });

  it('keeps decorative labels readable without adding separator semantics', () => {
    render(<Separator decorative>Next chapter</Separator>);
    expect(screen.getByText('Next chapter')).toBeVisible();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByText('Next chapter').parentElement).not.toHaveAttribute('aria-labelledby');
  });

  it('renders zero as a label and restores a plain rule when the label is removed', () => {
    const { rerender } = render(<Separator labelAlign="start">{0}</Separator>);
    expect(screen.getByRole('separator', { name: '0' })).toHaveAttribute(
      'data-label-align',
      'start',
    );
    rerender(<Separator labelAlign="start">{null}</Separator>);
    expect(screen.getByRole('separator')).not.toHaveAttribute('data-label-align');
    expect(screen.getByRole('separator')).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByRole('separator')).toBeEmptyDOMElement();
  });

  it('keeps vertical separators as an unlabeled rule', () => {
    render(
      <Separator orientation="vertical" labelAlign="end">
        Draft
      </Separator>,
    );
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getByRole('separator')).not.toHaveAttribute('data-label-align');
    expect(screen.queryByText('Draft')).not.toBeInTheDocument();
  });
});
