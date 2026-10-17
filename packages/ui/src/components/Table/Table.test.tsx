import { fireEvent, render, screen, within } from '@testing-library/react';
import type { CSSProperties } from 'react';
import { describe, expect, it } from 'vitest';

import { Table } from './index';

describe('styled Table', () => {
  it.each(['mini', 'compact', 'default', 'comfortable'] as const)(
    'preserves semantics and %s density with visual options',
    (density) => {
      render(
        <Table density={density} border="all" striped hoverable stickyHeader className="custom">
          <Table.Caption>Records</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head align="end">Count</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row selected>
              <Table.Cell align="end">2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );
      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('data-density', density);
      expect(table).not.toHaveAttribute('density');
      expect(table).toHaveAttribute('data-border', 'all');
      expect(table).toHaveClass('custom');
      expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'col');
      expect(screen.getByRole('cell')).toHaveAttribute('data-align', 'end');
      expect(screen.getByRole('cell').closest('tr')).toHaveAttribute('data-selected', 'true');
    },
  );

  it('defaults to standard density and forwards public geometry overrides', () => {
    const style = {
      '--table-cell-padding-inline': '24px',
      '--table-cell-padding-block': '10px',
      '--table-header-height': '50px',
      '--table-row-height': '60px',
      '--table-cell-vertical-align': 'top',
    } as CSSProperties;
    render(
      <Table style={style} className="custom-geometry">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Wrapped content can grow naturally</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('data-density', 'default');
    expect(table).toHaveClass('custom-geometry');
    for (const [property, value] of Object.entries(style))
      expect(table.style.getPropertyValue(property)).toBe(value);
  });

  it.each(['none', 'rows', 'separators', 'all'] as const)(
    'keeps native section and cell semantics with %s borders',
    (border) => {
      render(
        <Table border={border}>
          <Table.Caption>Report</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head>Item</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Head scope="row">Example</Table.Head>
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell>Total</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>,
      );
      const table = screen.getByRole('table', { name: 'Report' });
      expect(table).toHaveAttribute('data-border', border);
      expect(table).not.toHaveAttribute('border');
      expect(screen.getByRole('columnheader').closest('thead')?.parentElement).toBe(table);
      expect(screen.getByRole('rowheader').closest('tbody')?.parentElement).toBe(table);
      expect(screen.getByRole('cell').closest('tfoot')?.parentElement).toBe(table);
    },
  );
});

it('composes a sortable heading, updates aria-sort and explains the next action', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  const { useState } = await import('react');
  function Example() {
    const [direction, setDirection] = useState<'none' | 'ascending' | 'descending'>('none');
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head controls={{ sort: { direction, onDirectionChange: setDirection } }}>
              Count
            </Table.Head>
          </Table.Row>
        </Table.Header>
      </Table>
    );
  }
  render(<Example />);
  const button = screen.getByRole('button', { name: 'Count' });
  const heading = screen.getByRole('columnheader');
  await user.hover(button);
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Click to sort ascending');
  expect(heading).toHaveAttribute('aria-sort', 'none');
  await user.click(button);
  expect(heading).toHaveAttribute('aria-sort', 'ascending');
  expect(screen.getByRole('tooltip')).toHaveTextContent('Click to sort descending');
  await user.click(button);
  expect(heading).toHaveAttribute('aria-sort', 'descending');
  expect(screen.getByRole('tooltip')).toHaveTextContent('Click to cancel sorting');
  await user.click(button);
  expect(heading).toHaveAttribute('aria-sort', 'none');
  expect(button.querySelector('[data-slot="sort-indicator"]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  expect(screen.getByRole('tooltip').querySelector('[data-slot="arrow"]')).toBeNull();
});

it('supports an independent uncontrolled SortButton, native handlers and button ref', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  const { createRef } = await import('react');
  const ref = createRef<HTMLButtonElement>();
  render(
    <Table.SortButton ref={ref} defaultDirection="descending">
      Records
    </Table.SortButton>,
  );
  const button = screen.getByRole('button', { name: 'Records' });
  expect(ref.current).toBe(button);
  await user.click(button);
  expect(button).toHaveAttribute('data-direction', 'none');
  await user.click(button);
  expect(button).toHaveAttribute('data-direction', 'ascending');
});

it('renders header controls in fixed order and removes disabled controls independently', () => {
  const fixture = (enabled: boolean) => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head
            controls={{
              align: 'center',
              sort: { enabled, mode: 'ascending' },
              filter: { options: [{ value: 'open', label: 'Open' }] },
              search: enabled ? {} : false,
            }}
          >
            Status
          </Table.Head>
        </Table.Row>
      </Table.Header>
    </Table>
  );
  const { rerender } = render(fixture(true));
  const head = screen.getByRole('columnheader');
  expect(head).toHaveAttribute('aria-sort', 'none');
  expect(
    within(head)
      .getAllByRole('button')
      .map((button) => button.getAttribute('aria-label')),
  ).toEqual(['Status', 'Filter Status', 'Search Status']);
  fireEvent.click(within(head).getByRole('button', { name: 'Status' }));
  expect(head).toHaveAttribute('aria-sort', 'ascending');
  rerender(fixture(false));
  expect(head).not.toHaveAttribute('aria-sort');
  expect(within(head).getAllByRole('button')).toHaveLength(1);
  expect(within(head).getByRole('button', { name: 'Filter Status' })).toBeInTheDocument();
});

it('shows header dividers by default and keeps resizing opt-in', () => {
  const fixture = (resizable = false, headerDividers = true) => (
    <Table resizable={resizable} headerDividers={headerDividers}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Item</Table.Head>
          <Table.Head>Owner</Table.Head>
        </Table.Row>
      </Table.Header>
    </Table>
  );
  const { rerender } = render(fixture());
  expect(screen.getByRole('table')).toHaveAttribute('data-header-dividers', 'true');
  expect(screen.queryByRole('separator')).toBeNull();
  rerender(fixture(true, false));
  expect(screen.getAllByRole('separator')).toHaveLength(2);
  expect(screen.getByRole('table')).toHaveAttribute('data-header-dividers', 'false');
});

it.each([undefined, 'medium'] as const)(
  'confirms, cancels and resets draft filters with action size %s',
  async (size) => {
    const user = (await import('@testing-library/user-event')).default.setup();
    const { useState } = await import('react');
    function Example() {
      const [owners, setOwners] = useState<string[]>([]);
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head
                controls={{
                  sort: { onDirectionChange: () => {} },
                  filter: {
                    size,
                    value: owners,
                    onValueChange: setOwners,
                    options: [
                      { value: 'option-a', label: 'Option A' },
                      { value: 'option-b', label: 'Option B' },
                      { value: 'option-c', label: 'Option C', disabled: true },
                    ],
                  },
                }}
              >
                Owner
              </Table.Head>
            </Table.Row>
          </Table.Header>
        </Table>
      );
    }
    const { container } = render(<Example />);
    expect(container.querySelector('button button')).toBeNull();
    const trigger = screen.getByRole('button', { name: 'Filter Owner' });
    await user.click(trigger);
    expect(screen.getByRole('button', { name: 'Confirm' })).toHaveAttribute(
      'data-size',
      size ?? 'mini',
    );
    expect(screen.getByRole('button', { name: 'Reset' })).toHaveAttribute(
      'data-size',
      size ?? 'mini',
    );
    await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
    expect(trigger).not.toHaveAttribute('data-active');
    expect(screen.getByRole('checkbox', { name: 'Option C' })).toBeDisabled();
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    expect(screen.getByRole('checkbox', { name: 'Option A' })).not.toBeChecked();
    await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
    await user.click(screen.getByRole('checkbox', { name: 'Option B' }));
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(trigger).toHaveAttribute('data-active', 'true');
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Option B' })).toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(trigger).not.toHaveAttribute('data-active');
  },
);

it('resizes a column with arrow keys while preserving adjacent column widths', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  render(
    <Table resizable minColumnWidth={80}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Item</Table.Head>
          <Table.Head>Owner</Table.Head>
        </Table.Row>
      </Table.Header>
    </Table>,
  );
  for (const head of screen.getAllByRole('columnheader'))
    head.getBoundingClientRect = () => ({ width: 150 }) as DOMRect;
  const handle = screen.getByRole('separator', { name: 'Resize Item column' });
  handle.focus();
  await user.keyboard('{ArrowRight}');
  expect([...document.querySelectorAll('col')].map((col) => col.style.width)).toEqual([
    '160px',
    '150px',
  ]);
  await user.keyboard('{Home}');
  expect([...document.querySelectorAll('col')].map((col) => col.style.width)).toEqual([
    '80px',
    '150px',
  ]);
});

it('describes the filter trigger with a tooltip and dismisses the hint when filtering', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  render(<Table.Filter label="Group" options={[{ value: 'option-a', label: 'Option A' }]} />);
  const trigger = screen.getByRole('button', { name: 'Filter Group' });
  await user.hover(trigger);
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Filter');
  expect(screen.getByRole('tooltip')).not.toHaveTextContent('Group');
  expect(trigger).toHaveAttribute('aria-describedby');
  await user.click(trigger);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(screen.getByRole('dialog', { name: 'Filter Group' })).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeInTheDocument();
});

it('lets consumers customize or omit the filter hint', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  const { rerender } = render(<Table.Filter label="Owner" options={[]} tooltip="Choose entries" />);
  await user.hover(screen.getByRole('button'));
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Choose entries');
  rerender(<Table.Filter label="Owner" options={[]} tooltip={false} />);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

it.each(['filter', 'search'] as const)(
  'keeps the %s hint closed after applying and restoring trigger focus',
  async (kind) => {
    const user = (await import('@testing-library/user-event')).default.setup();
    render(
      <>
        {kind === 'filter' ? (
          <Table.Filter label="Owner" options={[{ value: 'option-a', label: 'Option A' }]} />
        ) : (
          <Table.Search label="Owner" />
        )}
        <button>Next control</button>
      </>,
    );
    const trigger = screen.getByRole('button', {
      name: kind === 'filter' ? 'Filter Owner' : 'Search Owner',
    });
    await user.hover(trigger);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    await user.click(trigger);
    if (kind === 'filter') await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
    else await user.type(screen.getByRole('textbox'), 'option-a');
    await user.click(
      screen.getByRole('button', { name: kind === 'filter' ? 'Confirm' : 'Search' }),
    );
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(trigger);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.tab();
    await user.tab({ shift: true });
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    await user.keyboard('{Enter}{Escape}');
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  },
);

it.each(['ascending', 'descending'] as const)(
  'renders and cycles the single %s indicator',
  async (sortMode) => {
    const user = (await import('@testing-library/user-event')).default.setup();
    render(<Table.SortButton sortMode={sortMode}>Hours</Table.SortButton>);
    const button = screen.getByRole('button', { name: 'Hours' });
    expect(button.querySelector('[data-slot="sort-indicator"]')).toHaveAttribute(
      'data-mode',
      sortMode,
    );
    await user.click(button);
    expect(button).toHaveAttribute('data-direction', sortMode);
    await user.click(button);
    expect(button).toHaveAttribute('data-direction', 'none');
  },
);

it('enforces per-column resize bounds, keeps controlled widths and pins cell offsets', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  const changes: number[][] = [];
  const { rerender } = render(
    <Table
      resizable
      columnWidths={[150, 100]}
      onColumnWidthsChange={(value) => changes.push(value)}
    >
      <Table.Header>
        <Table.Row>
          <Table.Head fixed="start" stickyOffset={48} minWidth={120} maxWidth={180}>
            Name
          </Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell fixed="start" stickyOffset={48}>
            A
          </Table.Cell>
          <Table.Cell>Open</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>,
  );
  for (const head of screen.getAllByRole('columnheader'))
    head.getBoundingClientRect = () => ({ width: 150 }) as DOMRect;
  const handle = screen.getByRole('separator', { name: 'Resize Name column' });
  expect(handle).toHaveAttribute('aria-valuemin', '120');
  expect(handle).toHaveAttribute('aria-valuemax', '180');
  expect(screen.getAllByRole('separator')).toHaveLength(2);
  handle.focus();
  await user.keyboard('{End}{Home}');
  expect(changes).toEqual([
    [180, 150],
    [120, 150],
  ]);
  expect(document.querySelector('col')?.style.width).toBe('150px');
  expect(screen.getByRole('cell', { name: 'A' }).style.insetInlineStart).toBe('48px');
  rerender(
    <Table resizable={false} columnWidths={[150, 100]}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
    </Table>,
  );
  expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  expect(document.querySelector('col')?.style.width).toBe('150px');
});

it('applies column search only on submit and resets it through the public control', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  const applied: string[] = [];
  render(<Table.Search label="Name" onValueChange={(value) => applied.push(value)} />);
  await user.click(screen.getByRole('button', { name: 'Search Name' }));
  await user.type(screen.getByRole('textbox', { name: 'Search Name' }), '  release  ');
  expect(applied).toEqual([]);
  await user.click(screen.getByRole('button', { name: 'Search' }));
  expect(applied).toEqual(['release']);
  const trigger = screen.getByRole('button', { name: 'Search Name' });
  expect(trigger).toHaveAttribute('data-active', 'true');
  await user.click(trigger);
  await user.click(screen.getByRole('button', { name: 'Reset' }));
  expect(applied).toEqual(['release', '']);
  expect(trigger).not.toHaveAttribute('data-active');
});
