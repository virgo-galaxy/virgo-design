import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('uses the default visual configuration', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toHaveAttribute('data-variant', 'solid');
    expect(button).toHaveAttribute('data-tone', 'accent');
    expect(button).toHaveAttribute('data-size', 'md');
  });

  it('supports custom visual configuration', () => {
    render(
      <Button variant="outline" tone="danger" size="lg">
        Delete
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Delete' });

    expect(button).toHaveAttribute('data-variant', 'outline');
    expect(button).toHaveAttribute('data-tone', 'danger');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('preserves primitive behavior', () => {
    render(<Button disabled>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled');
  });

  it('merges consumer class names with internal styles', () => {
    render(<Button className="consumer-class">Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('consumer-class');
  });

  it('supports state-based consumer class names', () => {
    render(
      <Button
        disabled
        className={(state) => (state.disabled ? 'consumer-disabled' : 'consumer-enabled')}
      >
        Save
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('consumer-disabled');
  });
});
