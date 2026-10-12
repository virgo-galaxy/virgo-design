import { Table } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TableBasicExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <Table.Viewport className={styles.root!} aria-label={t('examples.table.copy.records')}>
      <Table hoverable>
        <Table.Caption>{t('examples.table.copy.records')}</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>{t('examples.table.copy.project')}</Table.Head>
            <Table.Head align="end">{t('examples.table.copy.count')}</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row selected>
            <Table.Head scope="row">Item A</Table.Head>
            <Table.Cell align="end">48</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Head scope="row">Item B</Table.Head>
            <Table.Cell align="end">8</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Head scope="row">{t('examples.table.copy.total')}</Table.Head>
            <Table.Cell align="end">56</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Table.Viewport>
  );
}
