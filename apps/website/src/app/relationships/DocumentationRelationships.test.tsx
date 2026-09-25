import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ComponentRelationships, PrimitiveRelationships } from './DocumentationRelationships';

function renderRelationship(node: React.ReactNode) {
  return render(<MemoryRouter>{node}</MemoryRouter>);
}

describe('Documentation relationships', () => {
  it('renders Built with links for a one-to-many component relationship', () => {
    renderRelationship(<ComponentRelationships componentSlug="command" />);

    const section = screen.getByRole('heading', { name: 'Relationships' }).closest('section');
    expect(section).not.toBeNull();
    expect(within(section!).getByRole('heading', { name: 'Built with' })).toBeInTheDocument();
    expect(within(section!).getByRole('link', { name: /Command Primitive/ })).toHaveAttribute(
      'href',
      '/primitives/command',
    );
    expect(within(section!).getByRole('link', { name: /Dialog Primitive/ })).toHaveAttribute(
      'href',
      '/primitives/dialog',
    );
  });

  it('renders reverse-computed Used by links', () => {
    renderRelationship(<PrimitiveRelationships primitiveSlug="dialog" />);

    const section = screen.getByRole('heading', { name: 'Relationships' }).closest('section');
    expect(section).not.toBeNull();
    expect(within(section!).getByRole('heading', { name: 'Used by' })).toBeInTheDocument();
    expect(within(section!).getAllByRole('link')).toHaveLength(3);
    expect(within(section!).getByRole('link', { name: /Drawer/ })).toHaveAttribute(
      'href',
      '/components/drawer',
    );
  });

  it('does not render an empty section for a UI-only component', () => {
    const { container } = renderRelationship(<ComponentRelationships componentSlug="card" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('does not render an empty section for a primitive-only primitive', () => {
    const { container } = renderRelationship(
      <PrimitiveRelationships primitiveSlug="collapsible" />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
