import { Tag } from '@virgo-design/ui';

import {
  DocumentationCatalogue,
  DocumentationCatalogueGroup,
  DocumentationCatalogueItem,
} from '@/components/docs/DocumentationCatalogue';

import { primitiveCategories, primitiveDocs } from './primitiveDocs';

function getPrimitiveCategoryId(category: string) {
  const slug = category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return `primitive-category-${slug}`;
}

export function PrimitiveCataloguePage() {
  return (
    <DocumentationCatalogue
      pageId="primitives-catalogue"
      eyebrow="@virgo-design/primitives"
      title="Primitives"
      description="Headless building blocks for building custom interfaces with Virgo Design behavior, accessibility and interaction protocols."
    >
      {primitiveCategories.map((category) => {
        const docs = primitiveDocs.filter((doc) => doc.category === category);

        return (
          <DocumentationCatalogueGroup
            key={category}
            id={getPrimitiveCategoryId(category)}
            label={category}
            count={docs.length}
          >
            {docs.map((doc) => (
              <DocumentationCatalogueItem
                key={doc.slug}
                to={`/primitives/${doc.slug}`}
                title={doc.exportName}
                accessory={
                  <Tag size="sm" variant="outline">
                    Headless
                  </Tag>
                }
              >
                {doc.description}
              </DocumentationCatalogueItem>
            ))}
          </DocumentationCatalogueGroup>
        );
      })}
    </DocumentationCatalogue>
  );
}
