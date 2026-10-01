import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Timeline } from './index';
describe('Timeline visual contract', () => {
  it.each(['small', 'medium', 'large'] as const)(
    'retains %s density and semantic composition',
    (size) => {
      render(
        <Timeline size={size} className="custom">
          <Timeline.Item status="active">
            <Timeline.Title>Review</Timeline.Title>
          </Timeline.Item>
        </Timeline>,
      );
      const root = screen.getByRole('list');
      expect(root).toHaveClass('custom');
      expect(root).toHaveAttribute('data-size', size);
    },
  );
});
