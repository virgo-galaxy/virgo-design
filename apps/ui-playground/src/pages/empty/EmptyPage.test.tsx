import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Empty Playground', () => {
  it('renders basic, search, icon, description, action, and compact examples', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/empty']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Empty', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create document' })).toBeInTheDocument();
    expect(screen.getByLabelText('No search results')).toHaveTextContent('No matching results');
    expect(screen.getByLabelText('Documents empty state')).toHaveTextContent(
      'Create your first document to get started.',
    );
  });
});
