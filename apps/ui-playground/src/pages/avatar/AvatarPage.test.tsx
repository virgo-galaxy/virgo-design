import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Avatar Playground', () => {
  it('renders image, fallback, sizes, badge, and group examples', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/avatar']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Avatar', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Virgo Design' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Online' })).toBeInTheDocument();
    expect(screen.getByLabelText('Project members')).toHaveTextContent('PKVDUI');
  });
});
