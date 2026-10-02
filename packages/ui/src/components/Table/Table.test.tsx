import { render, screen } from '@testing-library/react';
import type { CSSProperties } from 'react';
import { describe, expect, it } from 'vitest';

import { Table } from './index';
describe('styled Table', () => {
  it.each(['small', 'medium', 'large'] as const)(
    'preserves semantics and %s density with visual options',
    (size) => {
      render(
        <Table size={size} border="all" striped hoverable stickyHeader className="custom">
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
      expect(table).toHaveAttribute('data-size', size);
      expect(table).toHaveAttribute(
        'data-density',
        { small: 'compact', medium: 'default', large: 'comfortable' }[size],
      );
      expect(table).toHaveAttribute('data-border', 'all');
      expect(table).toHaveClass('custom');
      expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'col');
      expect(screen.getByRole('cell')).toHaveAttribute('data-align', 'end');
      expect(screen.getByRole('cell').closest('tr')).toHaveAttribute('data-selected', 'true');
    },
  );

  it.each(['compact', 'default', 'comfortable'] as const)(
    'supports explicit %s density independently of the legacy size',
    (density) => {
      render(
        <Table density={density} size="large" aria-label="Density override">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Record</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );
      const table = screen.getByRole('table', { name: 'Density override' });
      expect(table).toHaveAttribute('data-density', density);
      expect(table).not.toHaveAttribute('density');
      expect(table).not.toHaveAttribute('size');
      expect(screen.getByRole('cell').closest('tr')?.parentElement?.parentElement).toBe(table);
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
              <Table.Head>Project</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Head scope="row">Virgo</Table.Head>
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
            <Table.Head sortDirection={direction} onSortChange={setDirection}>
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
