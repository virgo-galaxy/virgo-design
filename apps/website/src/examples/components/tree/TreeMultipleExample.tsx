import { Tree } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TreeMultipleExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<readonly string[]>([]);
  return (
    <div className={styles.root!}>
      <p>{t('examples.tree.copy.instructions')}</p>
      <Tree
        size="small"
        aria-label={t('examples.tree.copy.files')}
        selectionMode="multiple"
        selectedValues={selected}
        onSelectedValuesChange={setSelected}
      >
        <Tree.Item value="design">
          <Tree.Label>Design.tsx</Tree.Label>
        </Tree.Item>
        <Tree.Item value="tokens">
          <Tree.Label>Tokens.ts</Tree.Label>
        </Tree.Item>
        <Tree.Item value="icons">
          <Tree.Label>Icons.ts</Tree.Label>
        </Tree.Item>
      </Tree>
      <p role="status">{t('examples.tree.copy.selected', { value: selected.join(', ') || '—' })}</p>
    </div>
  );
}
