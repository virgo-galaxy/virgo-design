import { Tag } from '@virgo-design/ui';
import { componentMetadataRegistry } from '@virgo-design/ui/metadata';

import {
  DocumentationCatalogue,
  DocumentationCatalogueGroup,
  DocumentationCatalogueItem,
} from '@/components/docs/DocumentationCatalogue';

import { componentGroups, componentRoutes } from './app/componentRoutes';

const metadataByName = new Map(
  Object.values(componentMetadataRegistry).map((metadata) => [
    metadata.name.replaceAll(' ', '').toLowerCase(),
    metadata,
  ]),
);

export function ComponentsCataloguePage() {
  return (
    <DocumentationCatalogue
      pageId="components-catalogue"
      eyebrow="@virgo-design/ui"
      title="Components"
      description="Production-ready interface components built from Virgo Design primitives, tokens and interaction patterns."
    >
      {componentGroups.map((group) => {
        const routes = componentRoutes.filter((route) => route.group === group.id);

        return (
          <DocumentationCatalogueGroup
            key={group.id}
            id={group.id}
            label={group.label}
            count={routes.length}
          >
            {routes.map((route) => {
              const metadata = metadataByName.get(route.name.replaceAll(' ', '').toLowerCase());

              return (
                <DocumentationCatalogueItem
                  key={route.id}
                  to={route.path}
                  title={route.name}
                  accessory={
                    <Tag size="sm" variant="outline">
                      {route.version.replace(/^V/, '')}
                    </Tag>
                  }
                >
                  {metadata?.description ?? route.category}
                </DocumentationCatalogueItem>
              );
            })}
          </DocumentationCatalogueGroup>
        );
      })}
    </DocumentationCatalogue>
  );
}
