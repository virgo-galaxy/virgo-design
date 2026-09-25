import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Separator Playground', () => {
  it('renders horizontal, vertical, decorative, and content-block examples', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/separator']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Separator', level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('separator')).toHaveLength(4);
    expect(screen.getByRole('heading', { name: 'Coverage pass', level: 3 })).toBeInTheDocument();
  });
});
