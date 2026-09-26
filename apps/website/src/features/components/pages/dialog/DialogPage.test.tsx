import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DialogPage } from './DialogPage';

describe('Dialog article documentation', () => {
  it('renders Sizes and Form dialog as articles with their own example frames', () => {
    const { container } = render(<DialogPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Sizes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Form dialog' })).toBeInTheDocument();
    expect(container.querySelectorAll('[data-example-frame]')).toHaveLength(2);
    expect(container.querySelector('.review-section, .component-example-list')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Examples' })).not.toBeInTheDocument();
    expect(container.querySelector('.hero-stage')).toBeInTheDocument();
  });
});
