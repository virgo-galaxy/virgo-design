// @vitest-environment jsdom
import { act, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { expect, it } from 'vitest';

import { CatalogResourceContext } from '@/features/catalog';

import { defaultTableSettings } from '../model/table-settings';
import { useTaskTableQuery } from './use-task-table-query';

it('commits one complete navigation per table action and reads browser navigation back into state', async () => {
  let query!: ReturnType<typeof useTaskTableQuery>;
  function Probe() {
    query = useTaskTableQuery(defaultTableSettings());
    return null;
  }
  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: (
          <CatalogResourceContext
            value={{
              data: { projects: [], metadata: { members: [], projects: [], referenceDate: '' } },
              error: null,
              loading: false,
              retry() {},
              setData() {},
            }}
          >
            <Probe />
          </CatalogResourceContext>
        ),
      },
    ],
    { initialEntries: ['/work/tasks?page=4&pageSize=10&search=before'] },
  );
  render(<RouterProvider router={router} />);
  const navigations: string[] = [];
  const stop = router.subscribe((state) => navigations.push(state.location.search));
  try {
    await act(() => query.changeColumnFilter('status', ['todo']));
    expect(navigations).toHaveLength(1);
    expect(query.page).toBe(1);
    expect(query.columnFilters.status).toEqual(['todo']);
    expect(query.filters.search).toBe('before');
    navigations.length = 0;
    await act(() => query.changePage(3, 20));
    expect(navigations).toHaveLength(1);
    expect(query).toMatchObject({ page: 3, pageSize: 20 });
    await act(() => router.navigate('/work/tasks?search=after&page=2'));
    expect(query.filters.search).toBe('after');
    expect(query.page).toBe(2);
    navigations.length = 0;
    await act(() => query.resetFilters());
    expect(navigations).toHaveLength(1);
    expect(query).toMatchObject({ page: 1, columnFilters: {}, columnSearch: {} });
    expect(query.filters.search).toBe('');
    navigations.length = 0;
    query.reconcileSettings({ ...defaultTableSettings(), striped: true });
    expect(navigations).toHaveLength(0);
  } finally {
    stop();
    router.dispose();
  }
});
