import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ArticleSection } from './ArticleSection';

describe('ArticleSection', () => {
  it('uses a real h2 and description before the example, not a review card', () => {
    const { container } = render(
      <ArticleSection id="variants" index="01" title="Variants" description="Choose an emphasis.">
        <div data-example-frame>Example</div>
      </ArticleSection>,
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'Variants' });
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', heading.id);
    expect(section).toHaveAttribute('data-docs-section', 'variants');
    expect(section).not.toHaveClass('review-section');
    const header = section?.querySelector('header');
    expect(header).toHaveTextContent('Choose an emphasis.');
    expect(header?.contains(container.querySelector('[data-example-frame]'))).toBe(false);
  });
});
