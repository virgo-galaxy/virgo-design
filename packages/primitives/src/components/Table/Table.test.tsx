import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table } from './index';
describe('native Table', () => {
  it('preserves native structure, scopes, caption, spans and consumer selected state', () => {
    render(
      <Table.Viewport aria-label="Records">
        <Table>
          <Table.Caption>Projects</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Count</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row selected>
              <Table.Head scope="row">Alpha</Table.Head>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan={2}>Total: 2</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Table.Viewport>,
    );
    expect(screen.getByRole('table', { name: 'Projects' }).tagName).toBe('TABLE');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('rowheader', { name: 'Alpha' })).toHaveAttribute('scope', 'row');
    expect(screen.getByText('Alpha').closest('tr')).toHaveAttribute('data-selected', 'true');
    expect(screen.getByText('Alpha').closest('tr')).not.toHaveAttribute('aria-selected');
    expect(screen.getByText('Total: 2')).toHaveAttribute('colspan', '2');
    expect(screen.getByRole('region', { name: 'Records' })).toHaveAttribute('tabindex', '0');
  });
});
