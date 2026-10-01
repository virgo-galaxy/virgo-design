import '@virgo-design/tokens/styles.css';
import './styles.scss';

import { Breadcrumb, Layout, Tag } from '@virgo-design/ui';
import { type ReactNode, Suspense, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { RegistryApiReference } from '@/components/docs/ApiReference';
import { DocumentationDetailShell } from '@/components/docs/DocumentationDetailShell';
import {
  DocumentationSidebar,
  DocumentationSidebarCopy,
  DocumentationSidebarGroup,
  DocumentationSidebarIndex,
  DocumentationSidebarItem,
  DocumentationSidebarSeparator,
} from '@/components/docs/DocumentationSidebar';
import { componentApiReference } from '@/generated/component-api-reference.generated';
import { useAppearance } from '@/shared/theme/use-appearance';

import { componentGroups, componentRoutes, type ComponentSlug } from './app/componentRoutes';
import { ComponentContentLoading } from './components/ComponentContentLoading';
import { ComponentPageMetadataProvider } from './components/ComponentPageMetadata';
import { ComponentsCataloguePage } from './ComponentsCataloguePage';

const componentsBasePath = '/components/';
const navigationGroups = componentGroups
  .map((group) => ({
    ...group,
    routes: componentRoutes.filter((route) => route.group === group.id),
  }))
  .filter((group) => group.routes.length > 0);

export interface ComponentsDocumentationProps {
  renderRelationships?: (componentSlug: ComponentSlug) => ReactNode;
}

export function ComponentsDocumentation({ renderRelationships }: ComponentsDocumentationProps) {
  const { t } = useTranslation();
  const { appearance } = useAppearance();
  const location = useLocation();
  const previousPathname = useRef(location.pathname);
  const activeRoute =
    componentRoutes.find((route) => route.path === location.pathname) ?? componentRoutes[0];

  useLayoutEffect(() => {
    if (previousPathname.current === location.pathname) {
      return;
    }

    previousPathname.current = location.pathname;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  if (location.pathname === '/components' || location.pathname === '/components/') {
    return (
      <div className="components-documentation">
        <ComponentsCataloguePage />
      </div>
    );
  }

  return (
    <div className="components-documentation">
      <Layout
        className="components-documentation-shell"
        data-theme={appearance}
        direction="horizontal"
      >
        <DocumentationSidebar
          label={t('docs.sidebar.componentsLabel')}
          navigationLabel={t('docs.sidebar.componentNavigation')}
          activeValue={location.pathname}
        >
          {navigationGroups.map((group, groupIndex) => (
            <DocumentationSidebarGroup
              key={group.id}
              id={`component-group-${group.id}`}
              label={t(`components.catalogue.groups.${group.id}`)}
            >
              {group.routes.map((route) => (
                <DocumentationSidebarItem key={route.id} to={route.path}>
                  <DocumentationSidebarIndex>{route.index}</DocumentationSidebarIndex>
                  <DocumentationSidebarCopy>
                    <strong>{route.name}</strong>
                    <small>{t(`components.catalogue.sidebarLabels.${route.id}`)}</small>
                  </DocumentationSidebarCopy>
                  <Tag
                    size="sm"
                    intent={route.status === 'stable' ? 'success' : 'neutral'}
                    data-status={route.status}
                  >
                    {route.version.replace(/^V/, '')}
                  </Tag>
                </DocumentationSidebarItem>
              ))}
              {groupIndex < navigationGroups.length - 1 ? <DocumentationSidebarSeparator /> : null}
            </DocumentationSidebarGroup>
          ))}
        </DocumentationSidebar>

        <DocumentationDetailShell
          breadcrumb={
            <Breadcrumb>
              <Breadcrumb.Item aria-current={false}>
                {t('app.navigation.components')}
              </Breadcrumb.Item>
              <Breadcrumb.Item>{activeRoute.name}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <ComponentPageMetadataProvider metadata={activeRoute}>
            <Suspense fallback={<ComponentContentLoading />}>
              <Routes>
                <Route index element={<ComponentsCataloguePage />} />
                {componentRoutes.map(({ Component, id, path }) => (
                  <Route
                    key={id}
                    path={path.replace(componentsBasePath, '')}
                    element={<Component />}
                  />
                ))}
                <Route path="*" element={<Navigate replace to="/components/button" />} />
              </Routes>
            </Suspense>
          </ComponentPageMetadataProvider>
          <RegistryApiReference registry={componentApiReference} slug={activeRoute.id} />
          {renderRelationships?.(activeRoute.id)}
        </DocumentationDetailShell>
      </Layout>
    </div>
  );
}
