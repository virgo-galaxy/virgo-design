import { Tree } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function TreeExample() {
  const { t } = useTranslation();

  return (
    <Tree data-docs-primitive="tree" aria-label={t('primitives.examples.file')}>
      <Tree.Item value="src" branch>
        <Tree.Label>
          <Tree.Toggle>{t('primitives.examples.file')}</Tree.Toggle>src
        </Tree.Label>
        <Tree.Group>
          <Tree.Item value="readme">
            <Tree.Label>README.md</Tree.Label>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
    </Tree>
  );
}
