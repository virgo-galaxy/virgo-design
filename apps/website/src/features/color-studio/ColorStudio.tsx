import { type CSSProperties, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ScrollCue } from '@/components/section/ScrollCue';
import { useSectionMotion } from '@/hooks/use-section-motion';

import { BrandNeutralPage } from './components/BrandNeutralPage';
import { FamilyEditorPanel } from './components/FamilyEditorPanel';
import { LivePreview } from './components/LivePreview';
import { SettingsPanel } from './components/SettingsPanel';
import { useFoundationPager } from './hooks/use-foundation-pager';
import type { ColorStudioController } from './model/use-color-studio';
import styles from './styles/color-studio.module.scss';
import pagerStyles from './styles/foundation-pager.module.scss';

interface ColorStudioProps {
  studio: ColorStudioController;
}

export function ColorStudio({ studio }: ColorStudioProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);
  const motion = useSectionMotion(sectionRef);

  useFoundationPager({
    ref: pagerRef,
    page: studio.state.foundationPage,
    onPageChange: studio.setFoundationPage,
  });

  const independent = studio.state.chromaticMode === 'custom';
  const official = studio.state.chromaticMode === 'official';

  const motionStyle = {
    '--studio-motion-y': `${motion.exit * -22}px`,
    '--studio-motion-scale': 1 - motion.exit * 0.025,
    '--studio-motion-opacity': 1 - motion.exit * 0.42,
    '--studio-header-y': `${motion.exit * -14}px`,
    '--studio-header-opacity': 1 - motion.exit * 0.58,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="color-studio"
      className={styles.studio}
      data-theme={studio.state.appearance}
      style={motionStyle}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <div className={styles.eyebrow}>{t('hero.eyebrow')}</div>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.description')}</p>
          </div>
        </header>

        <div ref={pagerRef} className={pagerStyles.viewport}>
          <div className={pagerStyles.track} data-page={studio.state.foundationPage}>
            <div className={pagerStyles.page}>
              <div className={pagerStyles.pageInner}>
                <main
                  className={`${styles.workspace} ${
                    independent ? styles.workspaceIndependent : styles.workspaceLinked
                  }`}
                >
                  <SettingsPanel
                    mode={studio.state.chromaticMode}
                    anchor={studio.state.anchor}
                    model={studio.state.model}
                    hueSpread={studio.state.hueSpread}
                    distributionCurve={studio.state.distributionCurve}
                    onModeChange={studio.setChromaticMode}
                    onAnchorChange={studio.setAnchor}
                    onModelChange={studio.setModel}
                    onHueSpreadChange={studio.setHueSpread}
                    onDistributionCurveChange={studio.setDistributionCurve}
                    onReset={studio.reset}
                  />

                  <FamilyEditorPanel
                    active={independent}
                    bases={studio.state.customBases}
                    selectedFamily={studio.state.selectedFamily}
                    onChange={studio.setCustomBase}
                    onSelect={studio.setSelectedFamily}
                  />

                  <LivePreview
                    mode={studio.state.chromaticMode}
                    palette={studio.palette}
                    selectedFamily={studio.state.selectedFamily}
                    onSelectedFamilyChange={studio.setSelectedFamily}
                  />
                </main>
              </div>
            </div>

            <div className={pagerStyles.page}>
              <div className={pagerStyles.pageInner}>
                <BrandNeutralPage
                  brandBase={studio.brandBase}
                  brandScale={studio.brandScale}
                  neutralBase={studio.neutralBase}
                  neutralScale={studio.neutralScale}
                  onBrandBaseChange={studio.setBrandBase}
                  onNeutralBaseChange={studio.setNeutralBase}
                  onBrandReset={studio.resetBrand}
                  onNeutralReset={studio.resetNeutral}
                  onBrandSelect={() => studio.setSelectedFoundation('brand')}
                  onNeutralSelect={() => studio.setSelectedFoundation('neutral')}
                  disabled={official}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={pagerStyles.hint}>{t('extensions.swipeHint')}</div>
      <div
        className={pagerStyles.indicator}
        data-page={studio.state.foundationPage}
        aria-hidden="true"
      >
        <div className={pagerStyles.indicatorThumb} />
      </div>

      <ScrollCue
        targetId="palette-gallery"
        ariaLabel={t('common.explorePalette')}
        visible={motion.exit < 0.08}
      />
    </section>
  );
}
