import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders a native button by default', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('supports native button attributes', () => {
    render(
      <Button type="submit" name="action" value="save">
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('name', 'action');
    expect(button).toHaveAttribute('value', 'save');
  });

  it('prevents interaction when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled');

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('can remain focusable when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <>
        <Button disabled focusableWhenDisabled onClick={onClick}>
          Save
        </Button>

        <button type="button">Next</button>
      </>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    await user.tab();

    expect(button).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(onClick).not.toHaveBeenCalled();
  });

  it('can render a non-native button element', () => {
    render(
      <Button render={<div data-testid="custom-button" />} nativeButton={false}>
        Open
      </Button>,
    );

    const button = screen.getByTestId('custom-button');

    expect(button.tagName).toBe('DIV');
    expect(button).toHaveAttribute('role', 'button');
    expect(button).toHaveTextContent('Open');
  });
});
