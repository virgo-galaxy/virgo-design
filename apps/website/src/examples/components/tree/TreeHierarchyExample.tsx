import { Tree } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TreeHierarchyExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <Tree
      className={styles.root!}
      aria-label={t('examples.tree.copy.files')}
      defaultExpandedValues={['src']}
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
          <Tree.Item value="components" branch>
            <Tree.Label>
              <Tree.Toggle />
              {t('examples.tree.copy.components')}
            </Tree.Label>
            <Tree.Group>
              <Tree.Item value="button">
                <Tree.Label>Button.tsx</Tree.Label>
              </Tree.Item>
            </Tree.Group>
          </Tree.Item>
          <Tree.Item value="locked" disabled>
            <Tree.Label>{t('examples.tree.copy.locked')}</Tree.Label>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
      <Tree.Item value="readme">
        <Tree.Label>README.md</Tree.Label>
      </Tree.Item>
    </Tree>
  );
}
