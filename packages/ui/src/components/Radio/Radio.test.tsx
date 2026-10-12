import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from './index';

describe('Radio', () => {
  it('renders the standard radio with its visible label', () => {
    render(<Radio>Apple</Radio>);

    expect(screen.getByRole('radio', { name: 'Apple' })).toBeInTheDocument();
  });

  it('composes a single-selection group', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Radio.Group defaultValue="pear" onValueChange={onValueChange} aria-label="Options">
        <Radio value="apple">Apple</Radio>
        <Radio value="pear">Pear</Radio>
        <Radio value="orange">Orange</Radio>
      </Radio.Group>,
    );

    expect(screen.getByRole('radio', { name: 'Pear' })).toBeChecked();

    await user.click(screen.getByText('Orange'));

    expect(screen.getByRole('radio', { name: 'Orange' })).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith('orange');
  });

  it('supports horizontal and vertical group orientations', () => {
    render(
      <>
        <Radio.Group aria-label="Horizontal" orientation="horizontal">
          <Radio value="a">A</Radio>
        </Radio.Group>
        <Radio.Group aria-label="Vertical" orientation="vertical">
          <Radio value="b">B</Radio>
        </Radio.Group>
      </>,
    );

    expect(screen.getByRole('radiogroup', { name: 'Horizontal' })).toHaveAttribute(
      'data-orientation',
      'horizontal',
    );
    expect(screen.getByRole('radiogroup', { name: 'Vertical' })).toHaveAttribute(
      'data-orientation',
      'vertical',
    );
  });

  it('supports disabled options and forwards refs/native props', () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <Radio.Group aria-label="Options">
        <Radio ref={ref} value="apple" name="fruit">
          Apple
        </Radio>
        <Radio disabled value="orange">
          Orange
        </Radio>
      </Radio.Group>,
    );

    expect(ref.current).toBe(screen.getByRole('radio', { name: 'Apple' }));
    expect(screen.getByRole('radio', { name: 'Orange' })).toBeDisabled();
  });
});
