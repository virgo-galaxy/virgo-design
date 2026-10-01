import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tree } from './index';
describe('styled Tree', () => {
  it('preserves compound semantics, density and consumer classes', () => {
    render(
      <Tree size="small" className="custom" aria-label="Files">
        <Tree.Item value="src" branch>
          <Tree.Label>
            <Tree.Toggle />
            Source
          </Tree.Label>
          <Tree.Group>
            <Tree.Item value="a">
              <Tree.Label>App</Tree.Label>
            </Tree.Item>
          </Tree.Group>
        </Tree.Item>
      </Tree>,
    );
    expect(screen.getByRole('tree')).toHaveAttribute('data-size', 'small');
    expect(screen.getByRole('tree')).toHaveClass('custom');
    expect(screen.getByRole('button', { name: 'Source' }).querySelector('svg')).toBeInTheDocument();
  });
});
