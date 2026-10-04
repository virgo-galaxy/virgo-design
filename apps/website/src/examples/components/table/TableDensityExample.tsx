import { Surface, Table } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TableDensityExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root!}>
      <div className={styles.comparison}>
        {(['compact', 'default', 'comfortable'] as const).map((density) => (
          <Table key={density} density={density} border="all" striped hoverable>
            <Table.Caption>density="{density}"</Table.Caption>
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
      </div>
      <p className={styles.geometryNote}>
        {t('examples.table.copy.geometry')}
        <br />
        <code>--table-cell-padding-inline</code>, <code>--table-cell-padding-block</code>,{' '}
        <code>--table-header-height</code>, <code>--table-row-height</code>,{' '}
        <code>--table-cell-vertical-align</code>, <code>--table-header-radius</code>
      </p>
      <p className={styles.geometryNote}>
        {t('examples.table.copy.colorLayers')}
        <br />
        <code>--table-header-background</code>, <code>--table-header-foreground</code>,{' '}
        <code>--table-header-font-weight</code>, <code>--table-separator-color</code>,{' '}
        <code>--table-selection-color</code>, <code>--table-row-hover-background</code>,{' '}
        <code>--table-row-selected-background</code>,{' '}
        <code>--table-row-selected-hover-background</code>
      </p>
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
