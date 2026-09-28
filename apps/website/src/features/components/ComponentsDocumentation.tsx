import '@virgo-design/tokens/styles.css';
import './styles.scss';

import { ChevronLeftIcon } from '@virgo-design/icons';
import { Breadcrumb, Layout, NavigationMenu } from '@virgo-design/ui';
import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { DocumentationDetailShell } from '@/components/docs/DocumentationDetailShell/DocumentationDetailShell';
import { useAppearance } from '@/shared/theme/use-appearance';

import { componentGroups, componentRoutes, type ComponentSlug } from './app/componentRoutes';
import { ComponentPageMetadataProvider } from './components/ComponentPageMetadata';

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

  return (
    <div className="components-documentation">
      <Layout
        className="components-documentation-shell"
        data-theme={appearance}
        direction="horizontal"
      >
        <Layout.Sidebar
          className="component-navigation"
          aria-label="Components sidebar"
          collapsible
          collapsedWidth={12}
          triggerPlacement="edge"
          trigger={
            <Layout.SidebarTrigger className="component-navigation-trigger">
              <ChevronLeftIcon aria-hidden="true" />
            </Layout.SidebarTrigger>
          }
          width="var(--components-navigation-width)"
          surface={{ border: 'none' }}
        >
          {({ collapsed }) => (
            <NavigationMenu.Root
              aria-label="Component navigation"
              aria-hidden={collapsed || undefined}
              inert={collapsed || undefined}
              orientation="vertical"
              value={location.pathname}
            >
              <NavigationMenu.List className="component-groups">
                {navigationGroups.map((group, groupIndex) => (
                  <NavigationMenu.Group
                    key={group.id}
                    className="component-group"
                    aria-labelledby={`component-group-${group.id}`}
                  >
                    <NavigationMenu.GroupLabel
                      id={`component-group-${group.id}`}
                      className="component-group-label"
                    >
                      {group.label}
                    </NavigationMenu.GroupLabel>
                    <NavigationMenu.List className="component-link-list">
                      {group.routes.map((route) => (
                        <NavigationMenu.Item key={route.id} value={route.path}>
                          <NavigationMenu.Link
                            className="component-link"
                            render={(props) => <Link {...props} to={route.path} />}
                          >
                            <span className="component-number">{route.index}</span>
                            <span>
                              <strong>{route.name}</strong>
                              <small>{route.category}</small>
                            </span>
                            <span className="component-status" data-status={route.status}>
                              {route.version.replace(/^V/, '')}
                            </span>
                          </NavigationMenu.Link>
                        </NavigationMenu.Item>
                      ))}
                      {groupIndex < navigationGroups.length - 1 ? (
                        <NavigationMenu.Separator className="component-group-separator" />
                      ) : null}
                    </NavigationMenu.List>
                  </NavigationMenu.Group>
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          )}
        </Layout.Sidebar>

        <DocumentationDetailShell
          breadcrumb={
            <Breadcrumb>
              <Breadcrumb.Item aria-current={false}>Components</Breadcrumb.Item>
              <Breadcrumb.Item>{activeRoute.name}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <ComponentPageMetadataProvider metadata={activeRoute}>
            <Routes>
              <Route index element={<Navigate replace to="/components/button" />} />
              {componentRoutes.map(({ Component, id, path }) => (
                <Route
                  key={id}
                  path={path.replace(componentsBasePath, '')}
                  element={<Component />}
                />
              ))}
              <Route path="*" element={<Navigate replace to="/components/button" />} />
            </Routes>
          </ComponentPageMetadataProvider>
          {renderRelationships?.(activeRoute.id)}
        </DocumentationDetailShell>
      </Layout>
    </div>
  );
}
