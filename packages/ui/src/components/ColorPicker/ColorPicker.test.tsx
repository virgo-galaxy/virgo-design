import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ColorPicker } from './index';
describe('ColorPicker visual contract', () => {
  it.each(['small', 'medium', 'large'] as const)(
    'retains %s density and semantic composition',
    (size) => {
      render(
        <ColorPicker size={size} className="custom">
          <ColorPicker.Input aria-label="Color" />
          <ColorPicker.Swatch value="#1a5cff" />
        </ColorPicker>,
      );
      const root = screen.getByLabelText('Color').parentElement!;
      expect(root).toHaveClass('custom');
      expect(root).toHaveAttribute('data-size', size);
    },
  );
});
