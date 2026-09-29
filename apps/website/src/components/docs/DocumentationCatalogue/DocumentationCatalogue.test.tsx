import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import {
  DocumentationCatalogue,
  DocumentationCatalogueGroup,
  DocumentationCatalogueItem,
} from './DocumentationCatalogue';

describe('DocumentationCatalogue', () => {
  it('composes groups, counts, links and item accessories', () => {
    render(
      <MemoryRouter>
        <DocumentationCatalogue
          pageId="test-catalogue"
          eyebrow="@virgo-design/test"
          title="Catalogue"
          description="Documentation catalogue contract."
        >
          <DocumentationCatalogueGroup
            id="test-category-actions-commands"
            label="Actions & Commands"
            count={2}
          >
            <DocumentationCatalogueItem
              to="/docs/button"
              title="Button"
              accessory={<span>Stable</span>}
            >
              Performs an action.
            </DocumentationCatalogueItem>
            <DocumentationCatalogueItem to="/docs/command" title="Command">
              Runs a command.
            </DocumentationCatalogueItem>
          </DocumentationCatalogueGroup>
        </DocumentationCatalogue>
      </MemoryRouter>,
    );

    const catalogue = document.querySelector('[data-docs-page="test-catalogue"]');
    const group = screen.getByRole('region', { name: 'Actions & Commands' });

    expect(catalogue).toBeInTheDocument();
    expect(within(group).getByText('02')).toBeInTheDocument();
    expect(within(group).getByRole('link', { name: /Button/ })).toHaveAttribute(
      'href',
      '/docs/button',
    );
    expect(within(group).getByText('Stable')).toBeInTheDocument();
    expect(within(group).getByText('Performs an action.')).toBeInTheDocument();
  });
});
