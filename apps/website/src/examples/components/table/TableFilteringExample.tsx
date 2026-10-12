import { Checkbox, Table } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TableFilteringExample.module.scss';

const rows = [
  { project: 'Item A', owner: 'Sample A' },
  { project: 'Item D', owner: 'Sample B' },
  { project: 'Example', owner: 'Sample C' },
  { project: 'Item E', owner: 'Sample A' },
];
const options = ['Sample A', 'Sample B', 'Sample C'].map((value) => ({ value, label: value }));

export default function App() {
  const { t } = useTranslation();
  const [owners, setOwners] = useState<string[]>([]);
  const [resizable, setResizable] = useState(false);
  const [dividers, setDividers] = useState(true);
  const visible = rows.filter((row) => !owners.length || owners.includes(row.owner));
  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <Checkbox checked={resizable} onChange={(event) => setResizable(event.target.checked)}>
          {t('examples.table.copy.resizeColumns')}
        </Checkbox>
        <Checkbox checked={dividers} onChange={(event) => setDividers(event.target.checked)}>
          {t('examples.table.copy.headerDividers')}
        </Checkbox>
      </div>
      <Table.Viewport aria-label={t('examples.table.copy.records')}>
        <Table resizable={resizable} headerDividers={dividers}>
          <Table.Header>
            <Table.Row>
              <Table.Head>{t('examples.table.copy.project')}</Table.Head>
              <Table.Head
                controls={{
                  filter: { options, value: owners, onValueChange: setOwners },
                }}
              >
                {t('examples.table.copy.assignee')}
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {visible.map((row) => (
              <Table.Row key={row.project}>
                <Table.Cell>{row.project}</Table.Cell>
                <Table.Cell>{row.owner}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.Viewport>
    </div>
  );
}
