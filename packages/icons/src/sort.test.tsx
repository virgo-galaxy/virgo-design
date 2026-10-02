import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { SortIcon } from './index';

describe('SortIcon', () => {
  it('keeps both triangles visible with a darker upper inactive tone and shared SVG props', () => {
    const ref = createRef<SVGSVGElement>();
    render(<SortIcon ref={ref} size={16} data-testid="sort" aria-label="Sort direction" />);
    const icon = screen.getByTestId('sort');
    expect(ref.current).toBe(icon);
    expect(icon).toHaveAttribute('width', '16');
    expect(icon).not.toHaveAttribute('aria-hidden');
    const [up, down] = icon.querySelectorAll('path');
    expect(up).toHaveAttribute('opacity', '0.65');
    expect(down).toHaveAttribute('opacity', '0.45');
    expect(up).toHaveAttribute('fill', 'currentColor');
    expect(down).toHaveAttribute('fill', 'currentColor');
    expect(icon).not.toHaveAttribute('direction');
    expect(icon).not.toHaveAttribute('activeColor');
  });

  it.each(['ascending', 'descending'] as const)(
    'highlights only the %s triangle without changing geometry',
    (direction) => {
      const { rerender } = render(<SortIcon data-testid="sort" />);
      const icon = screen.getByTestId('sort');
      const geometry = [...icon.querySelectorAll('path')].map((path) => path.getAttribute('d'));
      rerender(<SortIcon data-testid="sort" direction={direction} activeColor="var(--brand)" />);
      const active = icon.querySelector(`[data-slot="sort-${direction}"]`);
      expect(active).toHaveAttribute('fill', 'var(--brand)');
      expect(active).toHaveAttribute('opacity', '1');
      const inactive = icon.querySelector(
        `[data-slot="sort-${direction === 'ascending' ? 'descending' : 'ascending'}"]`,
      );
      expect(inactive).toHaveAttribute('fill', 'currentColor');
      expect(inactive).not.toHaveAttribute('opacity', '1');
      expect([...icon.querySelectorAll('path')].map((path) => path.getAttribute('d'))).toEqual(
        geometry,
      );
      rerender(<SortIcon data-testid="sort" />);
      expect(icon.querySelector('path[opacity="1"]')).toBeNull();
    },
  );
});
