import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { componentApiReference } from '@/generated/api-reference.generated';

import { RegistryApiReference } from './ApiReference';

describe('ApiReference', () => {
  it('renders generated prop tables and public type aliases', () => {
    render(<RegistryApiReference registry={componentApiReference} slug="button" />);

    expect(screen.getByRole('heading', { level: 2, name: 'API' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'ButtonProps' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'ButtonProps properties' })).toBeInTheDocument();
    const publicTypes = screen
      .getByRole('heading', { level: 3, name: 'Public types' })
      .closest('section');
    expect(publicTypes).not.toBeNull();
    expect(within(publicTypes!).getByText('ButtonVariant')).toBeInTheDocument();
    expect(screen.getAllByText('variant').length).toBeGreaterThan(0);
  });
});
