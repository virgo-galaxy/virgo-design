import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PrimitivesPlayground } from './PrimitivesPlayground';

describe('Primitives Playground integration', () => {
  it('renders every primitive demo inside its isolated feature root', () => {
    const { container } = render(<PrimitivesPlayground />);

    expect(container.querySelector('[data-playground="primitives"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Native button' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Native input' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Native textarea' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Project' })).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(6);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getAllByRole('switch')).toHaveLength(3);
  });
});
