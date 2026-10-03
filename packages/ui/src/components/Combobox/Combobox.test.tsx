import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Combobox } from './index';
describe('styled Combobox', () => {
  it('preserves compound semantics, density and consumer classes', () => {
    render(
      <Combobox size="large" className="custom">
        <Combobox.Input aria-label="Search" />
        <Combobox.Content>
          <Combobox.Option value="a" textValue="Alpha">
            Alpha
          </Combobox.Option>
        </Combobox.Content>
        <Combobox.Clear />
      </Combobox>,
    );
    expect(screen.getByRole('combobox').parentElement).toHaveAttribute('data-size', 'large');
    expect(screen.getByRole('combobox').parentElement).toHaveClass('custom');
    expect(screen.getByRole('button', { name: 'Clear input' })).toBeInTheDocument();
  });
});
it('keeps the editable input semantics when a leading adornment is composed', () => {
  const { container } = render(
    <Combobox>
      <Combobox.Input aria-label="Search" prefix={<span>Icon</span>} />
    </Combobox>,
  );
  expect(screen.getByRole('combobox', { name: 'Search' })).toBeInTheDocument();
  expect(container.querySelector('[data-slot=prefix]')).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByText('Icon')).toBeInTheDocument();
});
