import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { generateSemanticColorCss } from './semantic-color-export';
import styles from './styles/semantic-color-export.module.scss';

export function SemanticColorExport() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const code = generateSemanticColorCss();

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={styles.export} data-semantic-color-export>
      <div className={styles.controls}>
        <code>CSS</code>
        <button type="button" onClick={() => void copyCode()}>
          {copied ? t('tokens.colors.export.copied') : t('tokens.colors.export.copy')}
        </button>
      </div>
      <pre className={styles.codeBlock}>
        <code>{code}</code>
      </pre>
      <p>{t('tokens.colors.export.note')}</p>
    </div>
  );
}
