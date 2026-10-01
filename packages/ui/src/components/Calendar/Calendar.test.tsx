import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Calendar } from './index';
describe('Calendar visual contract', () => {
  it.each(['small', 'medium', 'large'] as const)(
    'retains %s density and semantic composition',
    (size) => {
      render(<Calendar size={size} defaultMonth="2026-10" className="custom" />);
      const root = screen.getByRole('grid').parentElement!;
      expect(root).toHaveClass('custom');
      expect(root).toHaveAttribute('data-size', size);
    },
  );
});
