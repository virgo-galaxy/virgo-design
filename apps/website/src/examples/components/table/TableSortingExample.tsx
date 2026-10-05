import { Table, type TableSortDirection } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TableSortingExample.module.scss';
const records = [
  { name: 'Virgo Design', count: 48 },
  { name: 'Virgo Pro', count: 8 },
  { name: 'Virgo Icons', count: 67 },
];
export default function TableSortingExample() {
  const { t } = useTranslation();
  const [direction, setDirection] = useState<TableSortDirection>('none');
  const rows =
    direction === 'none'
      ? records
      : [...records].sort((a, b) => (direction === 'ascending' ? 1 : -1) * (a.count - b.count));
  return (
    <Table.Viewport className={styles.root!} aria-label={t('examples.table.copy.records')}>
      <Table hoverable border="separators">
        <Table.Caption>{t('examples.table.copy.description3')}</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>{t('examples.table.copy.project')}</Table.Head>
            <Table.Head controls={{ sort: { direction, onDirectionChange: setDirection } }}>
              {t('examples.table.copy.count')}
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.name}>
              <Table.Head scope="row">{row.name}</Table.Head>
              <Table.Cell align="end">{row.count}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Viewport>
  );
}
