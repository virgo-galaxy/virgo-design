import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Progress Playground', () => {
  it('renders values, boundaries, sizes, and intents', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/progress']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Progress', level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('progressbar')).toHaveLength(12);
    expect(screen.getAllByText('75%')).toHaveLength(1);
    expect(screen.getAllByText('100%')).toHaveLength(1);
  });
});
