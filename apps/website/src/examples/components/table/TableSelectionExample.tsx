import { Checkbox, Table } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TableSelectionExample.module.scss';

const rows = ['Item A', 'Item D', 'Example', 'Item E'];

export default function App() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState(true);
  return (
    <div className={styles.root}>
      <Checkbox checked={showMenu} onChange={(event) => setShowMenu(event.target.checked)}>
        {t('examples.table.copy.showSelectionMenu')}
      </Checkbox>
      <Table.Viewport aria-label={t('examples.table.copy.records')}>
        <Table hoverable>
          <Table.Header>
            <Table.Row>
              <Table.Head>
                <Table.Selection
                  rowKeys={rows}
                  value={selected}
                  onValueChange={setSelected}
                  selections={
                    showMenu
                      ? [
                          'all',
                          'invert',
                          'none',
                          {
                            key: 'odd',
                            label: t('examples.table.copy.selectOddRows'),
                            onSelect: (keys) => keys.filter((_, index) => index % 2 === 0),
                          },
                          {
                            key: 'even',
                            label: t('examples.table.copy.selectEvenRows'),
                            onSelect: (keys) => keys.filter((_, index) => index % 2 === 1),
                          },
                        ]
                      : false
                  }
                />
              </Table.Head>
              <Table.Head>{t('examples.table.copy.project')}</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((key) => (
              <Table.Row key={key} selected={selected.includes(key)}>
                <Table.Cell>
                  <Checkbox
                    aria-label={key}
                    checked={selected.includes(key)}
                    onChange={(event) =>
                      setSelected((previous) =>
                        event.target.checked
                          ? [...previous, key]
                          : previous.filter((value) => value !== key),
                      )
                    }
                  />
                </Table.Cell>
                <Table.Cell>{key}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.Viewport>
    </div>
  );
}
