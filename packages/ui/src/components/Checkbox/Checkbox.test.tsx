import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders the standard checkbox with its visible label', () => {
    render(<Checkbox>Sync changes</Checkbox>);

    expect(screen.getByRole('checkbox', { name: 'Sync changes' })).toBeInTheDocument();
  });

  it('toggles through native checkbox interaction', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox onChange={onChange}>Sync changes</Checkbox>);

    const checkbox = screen.getByRole('checkbox', { name: 'Sync changes' });
    await user.click(screen.getByText('Sync changes'));

    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalled();
  });

  it('supports indeterminate selection', () => {
    render(<Checkbox indeterminate>Check all</Checkbox>);

    const checkbox = screen.getByRole('checkbox', { name: 'Check all' }) as HTMLInputElement;

    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
  });

  it('supports disabled unchecked, checked, and indeterminate states', () => {
    render(
      <>
        <Checkbox disabled>Unchecked</Checkbox>
        <Checkbox defaultChecked disabled>
          Checked
        </Checkbox>
        <Checkbox indeterminate disabled>
          Mixed
        </Checkbox>
      </>,
    );

    expect(screen.getByRole('checkbox', { name: 'Unchecked' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Checked' })).toBeChecked();
    expect(
      (screen.getByRole('checkbox', { name: 'Mixed' }) as HTMLInputElement).indeterminate,
    ).toBe(true);
  });

  it('supports an accessible unlabeled control and forwards refs/native props', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Checkbox ref={ref} aria-label="Select row" name="row" className="consumer-root" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Select row' });

    expect(ref.current).toBe(checkbox);
    expect(checkbox).toHaveAttribute('name', 'row');
    expect(checkbox.closest('label')).toHaveClass('consumer-root');
  });

  it('composes grouped multi-selection', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Checkbox.Group defaultValue={['pear']} onValueChange={onValueChange} aria-label="Options">
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="pear">Pear</Checkbox>
        <Checkbox value="orange">Orange</Checkbox>
      </Checkbox.Group>,
    );

    expect(screen.getByRole('checkbox', { name: 'Pear' })).toBeChecked();

    await user.click(screen.getByText('Orange'));

    expect(screen.getByRole('checkbox', { name: 'Orange' })).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith(['pear', 'orange']);
  });
});
