import { render, screen } from '@testing-library/react';
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
      expect(table).toHaveAttribute('data-border', 'all');
      expect(table).toHaveClass('custom');
      expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'col');
      expect(screen.getByRole('cell')).toHaveAttribute('data-align', 'end');
      expect(screen.getByRole('cell').closest('tr')).toHaveAttribute('data-selected', 'true');
    },
  );

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
