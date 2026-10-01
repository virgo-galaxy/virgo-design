import { Empty, Table } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TableEmptyExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <Table.Viewport className={styles.scroll!} aria-label={t('examples.table.copy.records')}>
      <Table stickyHeader border="none">
        <Table.Caption>{t('examples.table.copy.records')}</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>{t('examples.table.copy.project')}</Table.Head>
            <Table.Head align="end">{t('examples.table.copy.count')}</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={2}>
              <Empty>
                <Empty.Title>{t('examples.table.copy.empty')}</Empty.Title>
                <Empty.Description>{t('examples.table.copy.add')}</Empty.Description>
              </Empty>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Table.Viewport>
  );
}
