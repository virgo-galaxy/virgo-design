import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table } from './index';
describe('native Table', () => {
  it('preserves native structure, scopes, caption, spans and consumer selected state', () => {
    render(
      <Table.Viewport aria-label="Records">
        <Table>
          <Table.Caption>Items</Table.Caption>
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
    expect(screen.getByRole('table', { name: 'Items' }).tagName).toBe('TABLE');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('rowheader', { name: 'Alpha' })).toHaveAttribute('scope', 'row');
    expect(screen.getByText('Alpha').closest('tr')).toHaveAttribute('data-selected', 'true');
    expect(screen.getByText('Alpha').closest('tr')).not.toHaveAttribute('aria-selected');
    expect(screen.getByText('Total: 2')).toHaveAttribute('colspan', '2');
    expect(screen.getByRole('region', { name: 'Records' })).toHaveAttribute('tabindex', '0');
  });
});

it('cycles sorting without submitting a form and supports keyboard activation', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  const { createRef } = await import('react');
  const ref = createRef<HTMLButtonElement>();
  const changes: string[] = [];
  render(
    <Table.SortButton ref={ref} onDirectionChange={(value) => changes.push(value)}>
      Count
    </Table.SortButton>,
  );
  const button = screen.getByRole('button', { name: 'Count' });
  expect(ref.current).toBe(button);
  expect(button).toHaveAttribute('type', 'button');
  await user.tab();
  await user.keyboard('{Enter}');
  expect(button).toHaveAttribute('data-direction', 'ascending');
  await user.keyboard(' ');
  expect(button).toHaveAttribute('data-direction', 'descending');
  await user.click(button);
  expect(changes).toEqual(['ascending', 'descending', 'none']);
});

it('preserves controlled direction, cancellation and disabled behavior', async () => {
  const user = (await import('@testing-library/user-event')).default.setup();
  const changes: string[] = [];
  const { rerender } = render(
    <Table.SortButton direction="ascending" onDirectionChange={(value) => changes.push(value)}>
      Count
    </Table.SortButton>,
  );
  const button = screen.getByRole('button');
  await user.click(button);
  expect(changes).toEqual(['descending']);
  expect(button).toHaveAttribute('data-direction', 'ascending');
  rerender(
    <Table.SortButton disabled onDirectionChange={(value) => changes.push(value)}>
      Count
    </Table.SortButton>,
  );
  await user.click(button);
  rerender(
    <Table.SortButton
      onClick={(event) => event.preventDefault()}
      onDirectionChange={(value) => changes.push(value)}
    >
      Count
    </Table.SortButton>,
  );
  await user.click(button);
  expect(changes).toEqual(['descending']);
});

it.each(['ascending', 'descending'] as const)(
  'cycles a single %s direction back to none',
  async (direction) => {
    const user = (await import('@testing-library/user-event')).default.setup();
    render(<Table.SortButton directions={[direction]}>Sort</Table.SortButton>);
    const button = screen.getByRole('button', { name: 'Sort' });
    expect(button).toHaveAttribute('data-direction', 'none');
    await user.click(button);
    expect(button).toHaveAttribute('data-direction', direction);
    await user.click(button);
    expect(button).toHaveAttribute('data-direction', 'none');
  },
);
