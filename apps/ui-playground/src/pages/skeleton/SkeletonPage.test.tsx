import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Skeleton Playground', () => {
  it('renders variants, a busy card, dimensions, and motion examples', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/skeleton']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Skeleton', level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText('Loading card')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Animated')).toBeInTheDocument();
    expect(screen.getByText('Static')).toBeInTheDocument();
  });
});
