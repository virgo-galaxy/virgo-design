import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useSourceCopy } from '@/shared/hooks/use-source-copy';

import { generateSemanticColorCss } from './semantic-color-export';
import styles from './styles/semantic-color-export.module.scss';

export function SemanticColorExport() {
  const { t } = useTranslation();
  const code = generateSemanticColorCss();

  const { state, copy } = useSourceCopy(code);

  return (
    <div className={styles.export} data-semantic-color-export>
      <div className={styles.controls}>
        <code>CSS</code>
        <Button type="button" aria-busy={state === 'pending'} onClick={() => void copy()}>
          {state === 'success' ? t('tokens.colors.export.copied') : t('tokens.colors.export.copy')}
        </Button>
      </div>
      <pre className={styles.codeBlock}>
        <code>{code}</code>
      </pre>
      <p>
        <span role="status">
          {state === 'error'
            ? t('tokens.colors.export.copyFailed')
            : state === 'success'
              ? t('tokens.colors.export.copied')
              : null}
        </span>{' '}
        {t('tokens.colors.export.note')}
      </p>
    </div>
  );
}
