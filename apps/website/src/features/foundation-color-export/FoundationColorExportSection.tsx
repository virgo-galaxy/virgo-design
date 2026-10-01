import { type ColorScale, type GeneratedColorPalette } from '@virgo-design/colors';
import { Button, SegmentedControl } from '@virgo-design/ui';
import { type CSSProperties, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSectionMotion } from '@/shared/hooks/use-section-motion';
import { useSourceCopy } from '@/shared/hooks/use-source-copy';

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

  const { state, copy } = useSourceCopy(code);

  return (
    <section
      ref={sectionRef}
      id="foundation-export"
      className={styles.section!}
      style={motionStyle}
    >
      <div className={styles.inner!}>
        <header className={styles.header!}>
          <div>
            <span>{t('foundations.colorExport.eyebrow')}</span>
            <h2>{t('foundations.colorExport.title')}</h2>
            <p>{t('foundations.colorExport.description')}</p>
          </div>
          <Button type="button" aria-busy={state === 'pending'} onClick={() => void copy()}>
            {state === 'success'
              ? t('foundations.colorExport.copied')
              : t('foundations.colorExport.copy')}
          </Button>
        </header>

        <div className={styles.exportContent!}>
          <div className={styles.controls!}>
            <SegmentedControl
              className={styles.tabs!}
              value={format}
              onValueChange={(next) => setFormat(next as FoundationExportFormat)}
              aria-label={t('foundations.colorExport.format')}
            >
              {(['css', 'scss', 'tailwind'] as const).map((item) => (
                <SegmentedControl.Item
                  key={item}
                  value={item}
                  className={item === format ? styles.active! : ''}
                >
                  {item === 'tailwind' ? 'Tailwind' : item.toUpperCase()}
                </SegmentedControl.Item>
              ))}
            </SegmentedControl>
            <div className={styles.naming!}>
              <span>{t('foundations.colorExport.scaleNaming')}</span>
              <SegmentedControl
                className={styles.namingOptions!}
                value={naming}
                onValueChange={(next) => setNaming(next as FoundationScaleNaming)}
                aria-label={t('foundations.colorExport.scaleNaming')}
              >
                <SegmentedControl.Item
                  value="conventional"
                  className={naming === 'conventional' ? styles.active! : ''}
                >
                  50–900
                </SegmentedControl.Item>
                <SegmentedControl.Item
                  value="virgo"
                  className={naming === 'virgo' ? styles.active! : ''}
                >
                  1–10
                </SegmentedControl.Item>
              </SegmentedControl>
            </div>
          </div>

          <pre className={styles.codeBlock!}>
            <code>{code}</code>
          </pre>
          <p className={styles.note!}>
            <span role="status">
              {state === 'error'
                ? t('foundations.colorExport.copyFailed')
                : state === 'success'
                  ? t('foundations.colorExport.copied')
                  : null}
            </span>{' '}
            {t('foundations.colorExport.note')}
          </p>
        </div>
      </div>
    </section>
  );
}
