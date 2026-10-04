import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './index';

describe('Checkbox primitive', () => {
  it('renders a native checkbox and forwards refs/native props', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Checkbox ref={ref} aria-label="Select row" name="row" value="1" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Select row' });
    expect(ref.current).toBe(checkbox);
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('name', 'row');
    expect(checkbox).toHaveAttribute('value', '1');
  });

  it('supports the native indeterminate state', () => {
    render(<Checkbox aria-label="Select all" indeterminate />);

    const checkbox = screen.getByRole('checkbox', { name: 'Select all' }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('reflects controlled partial, full, and empty selection for visual styling', () => {
    const { rerender } = render(<Checkbox aria-label="Select all" checked={false} indeterminate />);
    const checkbox = screen.getByRole('checkbox', { name: 'Select all' }) as HTMLInputElement;

    expect(checkbox).toHaveAttribute('data-checked', 'false');
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
    expect(checkbox.indeterminate).toBe(true);

    rerender(<Checkbox aria-label="Select all" checked />);
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('data-checked', 'true');
    expect(checkbox).not.toHaveAttribute('data-indeterminate');
    expect(checkbox.indeterminate).toBe(false);

    rerender(<Checkbox aria-label="Select all" checked={false} />);
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('data-checked', 'false');
  });

  it('keeps indeterminate applied when the prop remains true after interaction', async () => {
    const user = userEvent.setup();

    render(<Checkbox aria-label="Mixed" indeterminate />);

    const checkbox = screen.getByRole('checkbox', { name: 'Mixed' }) as HTMLInputElement;

    expect(checkbox.indeterminate).toBe(true);

    await user.click(checkbox);

    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('keeps standalone native checked behavior', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox aria-label="Standalone" onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Standalone' });
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('manages grouped values with a shared native name', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Checkbox.Group defaultValue={['pear']} name="fruit" onValueChange={onValueChange}>
        <label>
          <Checkbox value="apple" /> Apple
        </label>
        <label>
          <Checkbox value="pear" /> Pear
        </label>
      </Checkbox.Group>,
    );

    const apple = screen.getByRole('checkbox', { name: 'Apple' });
    const pear = screen.getByRole('checkbox', { name: 'Pear' });

    expect(apple).not.toBeChecked();
    expect(pear).toBeChecked();
    expect(apple).toHaveAttribute('name', 'fruit');
    expect(pear).toHaveAttribute('name', 'fruit');

    await user.click(apple);

    expect(apple).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith(['pear', 'apple']);
  });

  it('supports controlled groups and group-level disabled state', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Checkbox.Group value={['apple']} disabled onValueChange={onValueChange}>
        <label>
          <Checkbox value="apple" /> Apple
        </label>
        <label>
          <Checkbox value="pear" /> Pear
        </label>
      </Checkbox.Group>,
    );

    const apple = screen.getByRole('checkbox', { name: 'Apple' });
    const pear = screen.getByRole('checkbox', { name: 'Pear' });

    expect(apple).toBeChecked();
    expect(apple).toBeDisabled();
    expect(pear).toBeDisabled();

    await user.click(pear);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
