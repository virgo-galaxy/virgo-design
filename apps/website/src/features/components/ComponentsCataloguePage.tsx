import { useTranslation } from 'react-i18next';

import {
  DocumentationCatalogue,
  DocumentationCatalogueGroup,
  DocumentationCatalogueItem,
} from '@/components/docs/DocumentationCatalogue';

import { componentGroups, componentRoutes } from './app/componentRoutes';

export function ComponentsCataloguePage() {
  const { t } = useTranslation();
  return (
    <DocumentationCatalogue
      pageId="components-catalogue"
      eyebrow="@virgo-design/ui"
      title={t('components.catalogue.title')}
      description={t('components.catalogue.description')}
    >
      {componentGroups.map((group) => {
        const routes = componentRoutes.filter((route) => route.group === group.id);

        return (
          <DocumentationCatalogueGroup
            key={group.id}
            id={group.id}
            label={t(`components.catalogue.groups.${group.id}`)}
            count={routes.length}
          >
            {routes.map((route) => {
              return (
                <DocumentationCatalogueItem key={route.id} to={route.path} title={route.name}>
                  {t(`components.catalogue.metadata.${route.id}`)}
                </DocumentationCatalogueItem>
              );
            })}
          </DocumentationCatalogueGroup>
        );
      })}
    </DocumentationCatalogue>
  );
}
