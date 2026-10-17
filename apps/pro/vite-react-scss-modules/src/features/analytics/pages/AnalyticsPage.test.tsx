// @vitest-environment jsdom
import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { CatalogResourceContext } from '@/features/catalog';
import { analyticsSnapshot } from '@/mock/fixtures/analytics';
import { initialTaskState } from '@/mock/fixtures/tasks';
import { members } from '@/mock/fixtures/workplace';

import { OwnerCapacityPanel } from '../components/OwnerCapacityPanel';

vi.mock('@virgo-design/charts', () => ({
  Chart: Object.fromEntries(
    [
      'Root',
      'Cartesian',
      'Line',
      'Bar',
      'Area',
      'Donut',
      'XAxis',
      'YAxis',
      'Grid',
      'Tooltip',
      'Legend',
    ].map((name) => [name, () => null]),
  ),
}));
it('pages through all owners with continuous ranks, colored effort bars and a shared team scale', () => {
  render(
    <CatalogResourceContext.Provider
      value={{
        data: { projects: [], metadata: { members, projects: [], referenceDate: '2026-10-01' } },
        error: null,
        loading: false,
        retry: vi.fn(),
        setData: vi.fn(),
      }}
    >
      <OwnerCapacityPanel capacity={analyticsSnapshot(initialTaskState.tasks).ownerCapacity} />
    </CatalogResourceContext.Provider>,
  );
  const owners = members
    .map((member) => ({
      member,
      hours: initialTaskState.tasks
        .filter((task) => task.status !== 'done' && task.assignee === member.id)
        .reduce((sum, task) => sum + task.estimateHours, 0),
    }))
    .sort((a, b) => b.hours - a.hours);
  const region = screen.getByRole('region', { name: 'Team capacity' });
  const pages = within(region).getByRole('navigation', { name: 'Team capacity pages' });
  const seen: string[] = [];
  const pageSize = 5;
  const pageCount = Math.ceil(owners.length / pageSize);
  for (let page = 1; page <= pageCount; page++) {
    if (page > 1) fireEvent.click(within(pages).getByRole('button', { name: `Page ${page}` }));
    const list = within(region).getByRole('list', { name: 'Team capacity' });
    const rows = within(list).getAllByRole('listitem');
    expect(rows).toHaveLength(Math.min(pageSize, owners.length - (page - 1) * pageSize));
    expect(list).toHaveAttribute('start', String((page - 1) * 5 + 1));
    rows.forEach((row, index) => {
      const rank = (page - 1) * 5 + index;
      const owner = owners[rank]!;
      expect(within(row).getByText(owner.member.name)).toBeInTheDocument();
      expect(within(row).getByText(String(rank + 1).padStart(2, '0'))).toBeInTheDocument();
      const bar = row.querySelector<HTMLSpanElement>('span[style]')!;
      expect(bar.style.background).not.toBe('');
      expect(parseFloat(bar.style.width)).toBeCloseTo((owner.hours / owners[0]!.hours) * 100);
      seen.push(owner.member.id);
    });
  }
  expect(new Set(seen)).toEqual(new Set(owners.map(({ member }) => member.id)));
  expect(pages).toHaveTextContent(
    `${(pageCount - 1) * pageSize + 1}–${owners.length} of ${owners.length} people`,
  );
  expect(within(pages).getByRole('button', { name: 'Next page' })).toBeDisabled();
});
