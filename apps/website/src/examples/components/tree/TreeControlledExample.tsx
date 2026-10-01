import { Button, Tree } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TreeControlledExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<readonly string[]>(['src']);
  const [selected, setSelected] = useState<readonly string[]>([]);
  return (
    <div className={styles.root!}>
      <Button onClick={() => setExpanded(expanded.length ? [] : ['src'])}>
        {t('examples.tree.copy.toggle')}
      </Button>
      <Tree
        aria-label={t('examples.tree.copy.files')}
        expandedValues={expanded}
        onExpandedValuesChange={setExpanded}
        selectedValues={selected}
        onSelectedValuesChange={setSelected}
      >
        <Tree.Item value="src" branch>
          <Tree.Label>
            <Tree.Toggle />
            {t('examples.tree.copy.source')}
          </Tree.Label>
          <Tree.Group>
            <Tree.Item value="app">
              <Tree.Label>App.tsx</Tree.Label>
            </Tree.Item>
          </Tree.Group>
        </Tree.Item>
        <Tree.Item value="readme">
          <Tree.Label>README.md</Tree.Label>
        </Tree.Item>
      </Tree>
      <p role="status">{t('examples.tree.copy.selected', { value: selected.join(', ') || '—' })}</p>
    </div>
  );
}
