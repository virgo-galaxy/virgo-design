import {
  type ColorFamily,
  type ColorScaleStep,
  type GeneratedColorPalette,
} from '@virgo-design/colors';
import { useTranslation } from 'react-i18next';

import { useCopyToast } from '@/shared/hooks/use-copy-toast';
import { CopyToast } from '@/shared/ui/copy-toast/CopyToast';

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

    await copy(hex, 'foundations.colors.colorCopied', {
      token,
      value: hex,
    });
  };

  return (
    <section className={styles.livePanel}>
      <CopyToast key={toast?.id} toast={toast} />

      <div className={styles.panelHeading}>
        <div>
          <span className={styles.panelEyebrow}>
            {t('foundations.colorStudio.preview.eyebrow')}
          </span>
          <h2>{t('foundations.colorStudio.preview.title')}</h2>
        </div>

        <div className={styles.liveBadge}>
          <span />
          {t('foundations.colorStudio.preview.live')}
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
            <span>{t('foundations.colorStudio.preview.paletteAnchor')}</span>
            <strong>{palette.bases.blue.toUpperCase()}</strong>
            <small>{palette.model.toUpperCase()}</small>
          </div>
        </div>
      ) : (
        <div className={styles.foundationSummary}>
          <span>
            {t(
              mode === 'official'
                ? 'foundations.colorStudio.preview.foundationEyebrow'
                : 'foundations.colorStudio.preview.customEyebrow',
            )}
          </span>
          <strong>
            {t(
              mode === 'official'
                ? 'foundations.colorStudio.preview.foundationTitle'
                : 'foundations.colorStudio.preview.customTitle',
            )}
          </strong>
          <small>
            {t(
              mode === 'official'
                ? 'foundations.colorStudio.preview.foundationDescription'
                : 'foundations.colorStudio.preview.customDescription',
            )}
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
            <span>{t('foundations.colorStudio.preview.selectedFamily')}</span>
            <strong>{t(`foundations.paletteGallery.families.${selectedFamily}`)}</strong>
          </div>

          <code>{selectedBase.toUpperCase()}</code>
        </div>

        <div className={styles.scaleGrid}>
          {steps.map((step) => (
            <button
              className={styles.scaleItem}
              key={step}
              type="button"
              aria-label={t('foundations.colors.copyStep', {
                family: t(`foundations.paletteGallery.families.${selectedFamily}`),
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
                {step === 6 ? <span>{t('foundations.colorStudio.baseLabel')}</span> : null}
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
