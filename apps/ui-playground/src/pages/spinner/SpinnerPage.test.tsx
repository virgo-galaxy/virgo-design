import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Spinner Playground', () => {
  it('renders sizes, button composition, labels, and theme environments', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/spinner']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Spinner', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Saving' })).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading account data' })).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading in dark theme' })).toBeInTheDocument();
  });
});
