import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders a native button by default', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('supports an explicit submit type', () => {
    render(<Button type="submit">Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('forwards its ref to the native button', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref}>Save</Button>);

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Save' }));
  });

  it('supports the native disabled behavior', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toBeDisabled();

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards native props and events', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button aria-label="Save changes" data-testid="save-button" name="action" onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByTestId('save-button');

    expect(button).toHaveAttribute('name', 'action');
    expect(button).toHaveAccessibleName('Save changes');

    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });
});
