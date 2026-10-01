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
});
