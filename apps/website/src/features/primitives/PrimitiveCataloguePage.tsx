import { Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <DocumentationCatalogue
      pageId="primitives-catalogue"
      eyebrow="@virgo-design/primitives"
      title={t('primitives.catalogue.title')}
      description={t('primitives.catalogue.description')}
    >
      {primitiveCategories.map((category) => {
        const docs = primitiveDocs.filter((doc) => doc.category === category);

        return (
          <DocumentationCatalogueGroup
            key={category}
            id={getPrimitiveCategoryId(category)}
            label={t(`primitives.categories.${category}`)}
            count={docs.length}
          >
            {docs.map((doc) => (
              <DocumentationCatalogueItem
                key={doc.slug}
                to={`/primitives/${doc.slug}`}
                title={doc.exportName}
                accessory={
                  <Tag size="sm" variant="outline">
                    {t('primitives.catalogue.headless')}
                  </Tag>
                }
              >
                {t(doc.description)}
              </DocumentationCatalogueItem>
            ))}
          </DocumentationCatalogueGroup>
        );
      })}
    </DocumentationCatalogue>
  );
}
