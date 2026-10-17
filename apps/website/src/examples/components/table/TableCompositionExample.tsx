import { Table, type TableSortDirection } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TableCompositionExample.module.scss';

const records = [
  { project: 'Item A', count: 48, assignee: 'Sample A' },
  { project: 'Item B', count: 8, assignee: 'Sample C' },
  { project: 'Item C', count: 67, assignee: 'Sample B' },
];
type Column = keyof (typeof records)[number];

export default function TableCompositionExample() {
  const { t } = useTranslation();
  const [widths, setWidths] = useState([240, 480, 180]);
  const [sort, setSort] = useState<{ column: Column; direction: TableSortDirection } | null>(null);
  const [filter, setFilter] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const direction = (column: Column) => (sort?.column === column ? sort.direction : 'none');
  const rows = records
    .filter((row) => !filter.length || filter.includes(row.project))
    .filter((row) => row.project.toLowerCase().includes(search.toLowerCase()));
  if (sort && sort.direction !== 'none') {
    const { column, direction: order } = sort;
    rows.sort(
      (a, b) =>
        (order === 'ascending' ? 1 : -1) *
        (column === 'count' ? a.count - b.count : a[column].localeCompare(b[column])),
    );
  }
  return (
    <Table.Viewport className={styles.root!} aria-label={t('examples.table.copy.records')}>
      <Table
        density="compact"
        stickyHeader
        hoverable
        resizable
        columnWidths={widths}
        onColumnWidthsChange={setWidths}
      >
        <Table.Header>
          <Table.Row>
            <Table.Head
              fixed="start"
              minWidth={180}
              maxWidth={360}
              controls={{
                align: 'start',
                sort: {
                  direction: direction('project'),
                  onDirectionChange: (direction) => setSort({ column: 'project', direction }),
                },
                filter: {
                  value: filter,
                  onValueChange: setFilter,
                  options: records.map((row) => ({ value: row.project, label: row.project })),
                },
                search: { value: search, onValueChange: setSearch },
              }}
            >
              {t('examples.table.copy.project')}
            </Table.Head>
            <Table.Head
              minWidth={160}
              maxWidth={600}
              controls={{
                layout: 'joined',
                align: 'end',
                sort: {
                  mode: 'ascending',
                  direction: direction('count'),
                  onDirectionChange: (direction) => setSort({ column: 'count', direction }),
                },
              }}
            >
              {t('examples.table.copy.count')}
            </Table.Head>
            <Table.Head
              fixed="end"
              controls={{
                sort: {
                  mode: 'descending',
                  direction: direction('assignee'),
                  onDirectionChange: (direction) => setSort({ column: 'assignee', direction }),
                },
              }}
            >
              {t('examples.table.copy.assignee')}
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.project}>
              <Table.Cell fixed="start">{row.project}</Table.Cell>
              <Table.Cell align="end">{row.count}</Table.Cell>
              <Table.Cell fixed="end">{row.assignee}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Viewport>
  );
}
