import { Carousel } from '@virgo-design/ui';
import { type CSSProperties, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useSectionMotion } from '@/shared/hooks/use-section-motion';
import type { Appearance } from '@/shared/theme/types';
import { ScrollCue } from '@/shared/ui/scroll-cue/ScrollCue';

import { BrandNeutralPage } from './components/BrandNeutralPage';
import { FamilyEditorPanel } from './components/FamilyEditorPanel';
import { LivePreview } from './components/LivePreview';
import { SettingsPanel } from './components/SettingsPanel';
import type { ColorStudioController } from './model/use-color-studio';
import styles from './styles/color-studio.module.scss';
import pagerStyles from './styles/foundation-pager.module.scss';

interface ColorStudioProps {
  studio: ColorStudioController;
  appearance: Appearance;
}

export function ColorStudio({ studio, appearance }: ColorStudioProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const motion = useSectionMotion(sectionRef);

  const independent = studio.state.chromaticMode === 'custom';
  const official = studio.state.chromaticMode === 'official';

  const entering = 1 - motion.enter;
  const presence = motion.presence;
  const motionStyle = {
    '--studio-motion-y': `${entering * 18 - motion.exit * 22}px`,
    '--studio-motion-scale': 0.985 + presence * 0.015,
    '--studio-motion-opacity': 0.3 + presence * 0.7,
    '--studio-header-y': `${entering * 34 - motion.exit * 20}px`,
    '--studio-header-opacity': 0.08 + presence * 0.92,
    '--studio-panel-y': `${entering * 28 - motion.exit * 16}px`,
    '--studio-left-x': `${entering * -52 - motion.exit * 30}px`,
    '--studio-right-x': `${entering * 52 + motion.exit * 30}px`,
    '--studio-left-angle': `${entering * -5 - motion.exit * 2}deg`,
    '--studio-right-angle': `${entering * 5 + motion.exit * 2}deg`,
    '--studio-panel-scale': 0.965 + presence * 0.035,
    '--studio-panel-opacity': 0.08 + presence * 0.92,
    '--studio-footer-opacity': Math.max(0, Math.min(1, (presence - 0.68) / 0.32)),
    '--studio-footer-y': `${(1 - presence) * 12}px`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="color-studio"
      className={styles.studio}
      data-theme={appearance}
      style={motionStyle}
    >
      <Carousel
        count={2}
        index={studio.state.foundationPage === 'chromatic' ? 0 : 1}
        onIndexChange={(index) =>
          studio.setFoundationPage(index === 0 ? 'chromatic' : 'brand-neutral')
        }
        wheel
        stackBelow={900}
        className={pagerStyles.pager}
        aria-label={t('foundations.colorStudio.hero.title')}
      >
        <div className={styles.shell}>
          <header className={styles.header}>
            <div>
              <div className={styles.eyebrow}>{t('foundations.colorStudio.hero.eyebrow')}</div>
              <h2>{t('foundations.colorStudio.hero.title')}</h2>
              <p>{t('foundations.colorStudio.hero.description')}</p>
            </div>
          </header>

          <Carousel.Viewport className={pagerStyles.viewport}>
            <Carousel.Track>
              <Carousel.Item index={0}>
                <div className={pagerStyles.pageInner}>
                  <div
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
                  </div>
                </div>
              </Carousel.Item>

              <Carousel.Item index={1}>
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
              </Carousel.Item>
            </Carousel.Track>
          </Carousel.Viewport>
        </div>

        <div className={pagerStyles.hint}>{t('foundations.colorStudio.extensions.swipeHint')}</div>
        <Carousel.Indicators
          variant="bar"
          className={pagerStyles.indicator}
          getSlideLabel={(index) =>
            index === 0
              ? t('foundations.colorStudio.carousel.chromatic')
              : t('foundations.colorStudio.carousel.brandNeutral')
          }
        />
      </Carousel>

      <ScrollCue
        targetId="palette-gallery"
        ariaLabel={t('foundations.colorStudio.actions.explorePalette')}
        visible={motion.enter >= 0.84 && motion.exit < 0.08}
      />
    </section>
  );
}
