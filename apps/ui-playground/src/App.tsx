import { DashboardIcon } from '@virgo-design/icons';
import { Breadcrumb, Layout, Surface } from '@virgo-design/ui';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';

import { componentGroups, componentRoutes } from './app/componentRoutes';

type PlaygroundTheme = 'light' | 'dark';

export function App() {
  const [theme, setTheme] = useState<PlaygroundTheme>('light');
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <Layout className="playground-shell" data-theme={theme} direction="horizontal">
      <Layout.Sidebar
        className="component-navigation"
        width="var(--playground-navigation-width)"
        surface={{ border: 'none' }}
      >
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            V
          </div>
          <div>
            <strong>Virgo Design</strong>
            <span>UI Laboratory</span>
          </div>
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

            <div className="theme-control" role="group" aria-label="Preview theme">
              {(['light', 'dark'] as const).map((candidate) => (
                <button
                  key={candidate}
                  type="button"
                  aria-pressed={theme === candidate}
                  onClick={() => setTheme(candidate)}
                >
                  {candidate}
                </button>
              ))}
            </div>
          </Surface>
        </Layout.Header>

        <Layout.Content className="workspace-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/components/button" />} />
            {componentRoutes.map(({ Component, id, path }) => (
              <Route key={id} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate replace to="/components/button" />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
