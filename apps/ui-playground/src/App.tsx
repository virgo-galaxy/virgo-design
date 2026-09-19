import { useEffect, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';

import { componentGroups, componentRoutes } from './app/componentRoutes';

type PlaygroundTheme = 'light' | 'dark';

export function App() {
  const [theme, setTheme] = useState<PlaygroundTheme>('light');
  const location = useLocation();
  const activeRoute =
    componentRoutes.find((route) => route.path === location.pathname) ?? componentRoutes[0];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="playground-shell" data-theme={theme}>
      <aside className="component-navigation">
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
                        <span className="component-status">
                          {route.status.toUpperCase()} · {route.version}
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
            <strong>Review build</strong>
            <span>Multi-component shell</span>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header className="workspace-header">
          <div className="breadcrumb" aria-label="Breadcrumb">
            <span>Components</span>
            <span aria-hidden="true">/</span>
            <strong>{activeRoute.name}</strong>
          </div>

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
        </header>

        <Routes>
          <Route path="/" element={<Navigate replace to="/components/button" />} />
          {componentRoutes.map(({ Component, id, path }) => (
            <Route key={id} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate replace to="/components/button" />} />
        </Routes>
      </div>
    </div>
  );
}
