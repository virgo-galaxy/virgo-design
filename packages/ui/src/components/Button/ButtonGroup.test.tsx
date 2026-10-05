import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Surface } from '../Surface';
import { Button } from './Button';

describe('Button.Group', () => {
  it('inherits size through trigger wrappers while respecting explicit and nested sizes', () => {
    render(
      <Button.Group size="small">
        <div>
          <Button>A</Button>
        </div>
        <Button size="large">B</Button>
        <Button.Group size="mini">
          <Button>C</Button>
        </Button.Group>
      </Button.Group>,
    );
    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('data-size', 'small');
    expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute('data-size', 'large');
    expect(screen.getByRole('button', { name: 'C' })).toHaveAttribute('data-size', 'mini');
  });
  it('keeps actions as individual Tab stops without a shared selected value', async () => {
    const user = userEvent.setup();
    render(
      <Button.Group aria-label="Form actions">
        <Button>Reset</Button>
        <Button>Done</Button>
      </Button.Group>,
    );
    await user.tab();
    expect(screen.getByRole('button', { name: 'Reset' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Done' })).toHaveFocus();
    expect(screen.queryByRole('radiogroup')).toBeNull();
  });
  it('preserves an existing Surface DOM and button size with custom layout', () => {
    const { container } = render(
      <Button.Group layout="custom" render={(props) => <Surface {...props} className="existing" />}>
        <Button>A</Button>
      </Button.Group>,
    );
    expect(container.children).toHaveLength(1);
    expect(container.firstElementChild).toHaveClass('existing');
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'medium');
  });
});
