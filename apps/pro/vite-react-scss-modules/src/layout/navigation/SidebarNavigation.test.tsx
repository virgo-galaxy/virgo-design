// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, it } from 'vitest';

import { SessionContext } from '@/features/auth';
import { demoAccounts } from '@/mock/fixtures/accounts';

import { SidebarNavigation } from './SidebarNavigation';

it.each([
  { path: '/work/tasks/task-1/edit', label: 'Tasks', href: '/work/tasks' },
  { path: '/work/projects/project-1/handoff', label: 'Projects', href: '/work/projects' },
])(
  'selects $label for the nested route $path while linking to its list',
  ({ path, label, href }) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <SessionContext
          value={{ user: demoAccounts[0]!, signOut: async () => {}, resetDemo: async () => {} }}
        >
          <SidebarNavigation
            collapsed={false}
            railIconSize="regular"
            pathname={path}
            showSubmenuHeader
            sidebarStyle="collapsible"
            showOverlayArrows={false}
          />
        </SessionContext>
      </MemoryRouter>,
    );

    const selected = screen.getByRole('link', { current: 'page' });

    expect(selected).toHaveAccessibleName(label);
    expect(selected).toHaveAttribute('href', href);
  },
);
