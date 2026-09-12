import {
  type ColorFamily,
  type ColorScaleStep,
  type GeneratedColorPalette,
} from '@virgo-design/colors';
import { useTranslation } from 'react-i18next';

import { CopyToast } from '@/components/feedback/CopyToast';
import { useCopyToast } from '@/hooks/use-copy-toast';

import type { ChromaticMode } from '../model/types';
import styles from '../styles/color-studio.module.scss';
import { ColorFamilyCarousel } from './ColorFamilyCarousel';

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const satisfies readonly ColorScaleStep[];

interface LivePreviewProps {
  mode: ChromaticMode;
  palette: GeneratedColorPalette;
  selectedFamily: ColorFamily;
  onSelectedFamilyChange: (family: ColorFamily) => void;
}

export function LivePreview({
  mode,
  palette,
  selectedFamily,
  onSelectedFamilyChange,
}: LivePreviewProps) {
  const { t } = useTranslation();
  const { toast, copy } = useCopyToast();
  const selectedScale = palette.scales[selectedFamily];
  const selectedBase = palette.bases[selectedFamily];

  const copyStep = async (step: ColorScaleStep) => {
    const hex = selectedScale[step].toUpperCase();
    const token = `@${selectedFamily}-${step}`;

    await copy(
      hex,
      t('common.colorCopied', {
        token,
        value: hex,
      }),
    );
  };

  return (
    <section className={styles.livePanel}>
      <CopyToast key={toast?.id} toast={toast} />

      <div className={styles.panelHeading}>
        <div>
          <span className={styles.panelEyebrow}>{t('preview.eyebrow')}</span>
          <h2>{t('preview.title')}</h2>
        </div>

        <div className={styles.liveBadge}>
          <span />
          {t('common.live')}
        </div>
      </div>

      {mode === 'linked' ? (
        <div className={styles.anchorHero}>
          <div
            className={styles.anchorHeroColor}
            style={{
              backgroundColor: palette.bases.blue,
            }}
          />

          <div>
            <span>{t('preview.paletteAnchor')}</span>
            <strong>{palette.bases.blue.toUpperCase()}</strong>
            <small>{palette.model.toUpperCase()}</small>
          </div>
        </div>
      ) : (
        <div className={styles.foundationSummary}>
          <span>
            {t(mode === 'official' ? 'preview.foundationEyebrow' : 'preview.customEyebrow')}
          </span>
          <strong>
            {t(mode === 'official' ? 'preview.foundationTitle' : 'preview.customTitle')}
          </strong>
          <small>
            {t(mode === 'official' ? 'preview.foundationDescription' : 'preview.customDescription')}
          </small>
        </div>
      )}

      <ColorFamilyCarousel
        bases={palette.bases}
        selectedFamily={selectedFamily}
        onSelectedFamilyChange={onSelectedFamilyChange}
      />

      <div className={styles.selectedScale}>
        <div className={styles.selectedScaleHeading}>
          <div>
            <span>{t('preview.selectedFamily')}</span>
            <strong>{t(`families.${selectedFamily}`)}</strong>
          </div>

          <code>{selectedBase.toUpperCase()}</code>
        </div>

        <div className={styles.scaleGrid}>
          {steps.map((step) => (
            <button
              className={styles.scaleItem}
              key={step}
              type="button"
              aria-label={t('preview.copyStep', {
                family: t(`families.${selectedFamily}`),
                step,
              })}
              onClick={() => void copyStep(step)}
            >
              <div
                className={styles.scaleColor}
                style={{
                  backgroundColor: selectedScale[step],
                }}
              >
                {step === 6 ? <span>BASE</span> : null}
              </div>

              <div className={styles.scaleMeta}>
                <strong>{step}</strong>
                <code>{selectedScale[step].toUpperCase()}</code>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
