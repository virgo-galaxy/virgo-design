import '@virgo-design/tokens/styles.css';
import './styles.scss';

import { DashboardIcon } from '@virgo-design/icons';
import { Breadcrumb, Layout, Surface } from '@virgo-design/ui';
import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';

import { VirgoBrand } from '@/components/brand/VirgoBrand/VirgoBrand';
import { useAppearance } from '@/shared/theme/use-appearance';

import { componentGroups, componentRoutes, type ComponentSlug } from './app/componentRoutes';

const componentsBasePath = '/components/';

export interface UIPlaygroundProps {
  renderFooter?: (componentSlug: ComponentSlug) => ReactNode;
}

export function UIPlayground({ renderFooter }: UIPlaygroundProps) {
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
    <div className="ui-playground-feature" data-playground="ui">
      <Layout className="playground-shell" data-theme={appearance} direction="horizontal">
        <Layout.Sidebar
          className="component-navigation"
          width="var(--playground-navigation-width)"
          surface={{ border: 'none' }}
        >
          <div className="brand-lockup">
            <VirgoBrand />
            <span className="brand-context">UI Laboratory</span>
          </div>

          <nav aria-label="Component navigation">
            <p className="navigation-label">Components</p>
            <div className="component-groups">
              {componentGroups.map((group) => {
                const routes = componentRoutes.filter((route) => route.group === group.id);

                if (routes.length === 0) {
                  return null;
                }

                return (
                  <section className="component-group" key={group.id}>
                    <p className="component-group-label">{group.label}</p>

                    <div className="component-link-list">
                      {routes.map((route) => (
                        <NavLink
                          className={({ isActive }) =>
                            `component-link${isActive ? ' component-link--active' : ''}`
                          }
                          key={route.id}
                          to={route.path}
                        >
                          <span className="component-number">{route.index}</span>
                          <span>
                            <strong>{route.name}</strong>
                            <small>{route.category}</small>
                          </span>
                          <span className="component-status" data-status={route.status}>
                            {route.version.replace(/^V/, '')}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </nav>

          <div className="navigation-note">
            <span className="status-light" />
            <div>
              <strong>Stable build</strong>
              <span>Multi-component shell</span>
            </div>
          </div>
        </Layout.Sidebar>

        <Layout className="workspace">
          <Layout.Header className="workspace-header">
            <Surface material="glass" border="none" className="workspace-header-surface">
              <Breadcrumb className="workspace-breadcrumb">
                <Breadcrumb.Item aria-current={false} icon={<DashboardIcon />}>
                  Components
                </Breadcrumb.Item>
                <Breadcrumb.Item>{activeRoute.name}</Breadcrumb.Item>
              </Breadcrumb>
            </Surface>
          </Layout.Header>

          <Layout.Content className="workspace-content">
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
            {renderFooter?.(activeRoute.id)}
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}
