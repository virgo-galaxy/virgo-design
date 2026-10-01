import { Surface, Table } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TableDensityExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root!}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Table key={size} size={size} border="all" striped>
          <Table.Caption>{size}</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head>{t('examples.table.copy.project')}</Table.Head>
              <Table.Head align="end">{t('examples.table.copy.count')}</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Virgo Design</Table.Cell>
              <Table.Cell align="end">48</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Virgo Pro</Table.Cell>
              <Table.Cell align="end">8</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ))}
      <Surface border="subtle" radius={12} className={styles.frame}>
        <Table border="separators">
          <Table.Header>
            <Table.Row>
              <Table.Head>{t('examples.table.copy.project')}</Table.Head>
              <Table.Head align="end">{t('examples.table.copy.count')}</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Virgo Design</Table.Cell>
              <Table.Cell align="end">48</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Virgo Pro</Table.Cell>
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
      </Surface>
    </div>
  );
}
