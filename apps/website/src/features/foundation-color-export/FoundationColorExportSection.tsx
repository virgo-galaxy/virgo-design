import { type ColorScale, type GeneratedColorPalette } from '@virgo-design/colors';
import { type CSSProperties, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSectionMotion } from '@/shared/hooks/use-section-motion';

import {
  type FoundationExportFormat,
  type FoundationScaleNaming,
  generateFoundationColorCode,
} from './foundation-color-export';
import styles from './foundation-color-export.module.scss';

interface FoundationColorExportSectionProps {
  palette: GeneratedColorPalette;
  brandScale: ColorScale;
  neutralScale: ColorScale;
}

export function FoundationColorExportSection({
  palette,
  brandScale,
  neutralScale,
}: FoundationColorExportSectionProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const motion = useSectionMotion(sectionRef);
  const [format, setFormat] = useState<FoundationExportFormat>('css');
  const [naming, setNaming] = useState<FoundationScaleNaming>('conventional');
  const [copied, setCopied] = useState(false);
  const code = useMemo(
    () => generateFoundationColorCode({ palette, brandScale, neutralScale }, format, naming),
    [brandScale, format, naming, neutralScale, palette],
  );

  const entering = 1 - motion.enter;
  const motionStyle = {
    '--export-header-opacity': 0.08 + motion.presence * 0.92,
    '--export-header-y': `${entering * 30 - motion.exit * 20}px`,
    '--export-content-opacity': 0.12 + motion.presence * 0.88,
    '--export-content-x': `${entering * 36 - motion.exit * 28}px`,
    '--export-content-z': `${entering * 44}px`,
    '--export-content-angle': `${entering * -4 + motion.exit * 3}deg`,
    '--export-content-scale': 0.97 + motion.presence * 0.03,
  } as CSSProperties;

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section ref={sectionRef} id="foundation-export" className={styles.section} style={motionStyle}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <span>{t('foundationColorExport.eyebrow')}</span>
            <h2>{t('foundationColorExport.title')}</h2>
            <p>{t('foundationColorExport.description')}</p>
          </div>
          <button type="button" onClick={() => void copyCode()}>
            {copied ? t('foundationColorExport.copied') : t('foundationColorExport.copy')}
          </button>
        </header>

        <div className={styles.exportContent}>
          <div className={styles.controls}>
            <div className={styles.tabs} aria-label={t('foundationColorExport.format')}>
              {(['css', 'scss', 'tailwind'] as const).map((item) => (
                <button
                  key={item}
                  className={item === format ? styles.active : ''}
                  type="button"
                  onClick={() => setFormat(item)}
                >
                  {item === 'tailwind' ? 'Tailwind' : item.toUpperCase()}
                </button>
              ))}
            </div>
            <div className={styles.naming}>
              <span>{t('foundationColorExport.scaleNaming')}</span>
              <button
                className={naming === 'conventional' ? styles.active : ''}
                type="button"
                onClick={() => setNaming('conventional')}
              >
                50–900
              </button>
              <button
                className={naming === 'virgo' ? styles.active : ''}
                type="button"
                onClick={() => setNaming('virgo')}
              >
                1–10
              </button>
            </div>
          </div>

          <pre className={styles.codeBlock}>
            <code>{code}</code>
          </pre>
          <p className={styles.note}>{t('foundationColorExport.note')}</p>
        </div>
      </div>
    </section>
  );
}
