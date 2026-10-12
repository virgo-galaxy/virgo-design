import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from './index';

describe('Radio primitive', () => {
  it('renders a native radio and forwards refs/native props', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Radio ref={ref} aria-label="Apple" name="fruit" value="apple" />);

    const radio = screen.getByRole('radio', { name: 'Apple' });
    expect(ref.current).toBe(radio);
    expect(radio).toHaveAttribute('type', 'radio');
    expect(radio).toHaveAttribute('name', 'fruit');
    expect(radio).toHaveAttribute('value', 'apple');
  });

  it('manages one selected value with a shared native name', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Radio.Group defaultValue="pear" name="fruit" onValueChange={onValueChange}>
        <label>
          <Radio value="apple" /> Apple
        </label>
        <label>
          <Radio value="pear" /> Pear
        </label>
        <label>
          <Radio value="orange" /> Orange
        </label>
      </Radio.Group>,
    );

    const apple = screen.getByRole('radio', { name: 'Apple' });
    const pear = screen.getByRole('radio', { name: 'Pear' });

    expect(apple).not.toBeChecked();
    expect(pear).toBeChecked();
    expect(apple).toHaveAttribute('name', 'fruit');
    expect(pear).toHaveAttribute('name', 'fruit');

    await user.click(apple);

    expect(apple).toBeChecked();
    expect(pear).not.toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith('apple');
  });

  it('supports controlled groups and group-level disabled state', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Radio.Group value="apple" disabled onValueChange={onValueChange}>
        <label>
          <Radio value="apple" /> Apple
        </label>
        <label>
          <Radio value="pear" /> Pear
        </label>
      </Radio.Group>,
    );

    const apple = screen.getByRole('radio', { name: 'Apple' });
    const pear = screen.getByRole('radio', { name: 'Pear' });

    expect(apple).toBeChecked();
    expect(apple).toBeDisabled();
    expect(pear).toBeDisabled();

    await user.click(pear);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('exposes group orientation semantics', () => {
    render(
      <Radio.Group orientation="vertical" aria-label="Options">
        <Radio aria-label="Apple" value="apple" />
      </Radio.Group>,
    );

    expect(screen.getByRole('radiogroup', { name: 'Options' })).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });
});
