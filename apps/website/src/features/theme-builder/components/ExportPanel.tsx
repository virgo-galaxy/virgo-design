import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ExportFormat, ScaleNaming } from '../model/types';
import styles from '../theme-builder.module.scss';

interface ExportPanelProps {
  code: string;
  format: ExportFormat;
  scaleNaming: ScaleNaming;
  onFormatChange: (format: ExportFormat) => void;
  onScaleNamingChange: (naming: ScaleNaming) => void;
}

const FORMATS: readonly ExportFormat[] = ['css', 'scss', 'tailwind'];

export function ExportPanel({
  code,
  format,
  scaleNaming,
  onFormatChange,
  onScaleNamingChange,
}: ExportPanelProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [code]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1400);
  };

  return (
    <section className={styles.exportPanel}>
      <header className={styles.exportHeader}>
        <div>
          <span className={styles.panelEyebrow}>{t('themeBuilder.exportEyebrow')}</span>
          <h3>{t('themeBuilder.exportTitle')}</h3>
        </div>

        <button className={styles.copyButton} type="button" onClick={() => void copyCode()}>
          {copied ? t('themeBuilder.copied') : t('themeBuilder.copy')}
        </button>
      </header>

      <div className={styles.exportControls}>
        <div className={styles.exportTabs}>
          {FORMATS.map((item) => (
            <button
              key={item}
              className={item === format ? styles.exportTabActive : ''}
              type="button"
              onClick={() => onFormatChange(item)}
            >
              {item === 'tailwind' ? 'Tailwind' : item.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={styles.namingControl}>
          <span>{t('themeBuilder.scaleNaming')}</span>

          <div>
            <button
              className={scaleNaming === 'conventional' ? styles.namingActive : ''}
              type="button"
              onClick={() => onScaleNamingChange('conventional')}
            >
              50–900
            </button>

            <button
              className={scaleNaming === 'virgo' ? styles.namingActive : ''}
              type="button"
              onClick={() => onScaleNamingChange('virgo')}
            >
              1–10
            </button>
          </div>
        </div>
      </div>

      <pre className={styles.codeBlock}>
        <code>{code}</code>
      </pre>

      <p className={styles.staticNote}>{t('themeBuilder.staticNote')}</p>
    </section>
  );
}
