import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

function verifyIconOnlyTypeContract() {
  // @ts-expect-error Icon-only actions require an accessible name.
  const missingAccessibleName: ButtonProps = { iconOnly: true, children: <svg /> };
  // @ts-expect-error Icon-only actions accept their icon through children only.
  const leadingIcon: ButtonProps = {
    iconOnly: true,
    'aria-label': 'Create',
    children: <svg />,
    leadingIcon: <svg />,
  };

  return [missingAccessibleName, leadingIcon];
}

void verifyIconOnlyTypeContract;

describe('Button', () => {
  it('uses the default variant and size', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-size', 'medium');
  });

  it.each<ButtonVariant>(['primary', 'secondary', 'outline', 'text'])(
    'supports the %s variant',
    (variant) => {
      render(<Button variant={variant}>Save</Button>);

      expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-variant', variant);
    },
  );

  it.each<ButtonSize>(['mini', 'small', 'medium', 'large'])('supports the %s size', (size) => {
    render(<Button size={size}>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-size', size);
  });

  it('preserves primitive disabled behavior', () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('renders leading and trailing icons as decorative content', () => {
    render(
      <Button
        leadingIcon={<svg data-testid="leading-icon" />}
        trailingIcon={<svg data-testid="trailing-icon" />}
      >
        Create
      </Button>,
    );

    expect(screen.getByTestId('leading-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('trailing-icon').parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(
      screen.getByRole('button', { name: 'Create' }).querySelector('[data-slot="label"]'),
    ).toHaveTextContent('Create');
  });

  it('marks icon-only content for zero-padding layout without rendering a text label', () => {
    render(
      <Button iconOnly aria-label="Create">
        <svg data-testid="icon-only-content" />
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Create' });

    expect(button).toHaveAttribute('data-icon-only', 'true');
    expect(button.querySelector('[data-slot="label"]')).not.toBeInTheDocument();
    expect(screen.getByTestId('icon-only-content').parentElement).toHaveAttribute(
      'data-slot',
      'icon',
    );
  });

  it('uses the square shape by default for icon-only buttons', () => {
    render(
      <Button iconOnly aria-label="Add">
        <svg />
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Add' })).toHaveAttribute('data-shape', 'square');
  });

  it('supports an explicit circular icon-only shape', () => {
    render(
      <Button iconOnly shape="circle" aria-label="Settings">
        <svg />
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
      'data-shape',
      'circle',
    );
  });

  it.each<ButtonSize>(['mini', 'small', 'medium', 'large'])(
    'supports the %s icon-only size',
    (size) => {
      render(
        <Button iconOnly size={size} aria-label={`${size} settings`}>
          <svg />
        </Button>,
      );

      expect(screen.getByRole('button', { name: `${size} settings` })).toHaveAttribute(
        'data-size',
        size,
      );
    },
  );

  it.each<ButtonVariant>(['primary', 'secondary', 'outline', 'text'])(
    'supports the %s icon-only variant',
    (variant) => {
      render(
        <Button iconOnly variant={variant} aria-label={`${variant} settings`}>
          <svg />
        </Button>,
      );

      expect(screen.getByRole('button', { name: `${variant} settings` })).toHaveAttribute(
        'data-variant',
        variant,
      );
    },
  );

  it('preserves disabled behavior for icon-only buttons', () => {
    render(
      <Button iconOnly disabled aria-label="Unavailable settings">
        <svg />
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Unavailable settings' })).toBeDisabled();
  });

  it('merges a consumer class name', () => {
    render(<Button className="consumer-class">Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('consumer-class');
  });

  it('forwards native props, events, and refs through the primitive', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();

    render(
      <Button ref={ref} aria-label="Save changes" name="action" onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('name', 'action');
    expect(ref.current).toBe(button);

    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });
});
