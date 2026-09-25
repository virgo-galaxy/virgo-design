import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Card Playground', () => {
  it('renders basic, header, footer, variant, profile, and composition examples', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/card']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Card', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Virgo Design', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Invite' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Outlined', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Elevated', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('Coverage Pass')).toBeInTheDocument();
  });
});
