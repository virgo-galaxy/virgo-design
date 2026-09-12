import { type ColorScale, type GeneratedColorPalette } from '@virgo-design/colors';
import { type CSSProperties, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { Appearance } from '@/features/color-studio/model/types';
import { useSectionMotion } from '@/hooks/use-section-motion';

import { ExportPanel } from './components/ExportPanel';
import { SemanticRoleEditor } from './components/SemanticRoleEditor';
import { generateThemeCode } from './lib/export-theme';
import type { SemanticRole, ThemeMode } from './model/types';
import { useThemeBuilder } from './model/use-theme-builder';
import styles from './theme-builder.module.scss';

interface ThemeBuilderSectionProps {
  appearance: Appearance;
  palette: GeneratedColorPalette;
  brandScale: ColorScale;
  neutralScale: ColorScale;
}

const SEMANTIC_ROLES = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
] as const satisfies readonly SemanticRole[];

export function ThemeBuilderSection({
  appearance,
  palette,
  brandScale,
  neutralScale,
}: ThemeBuilderSectionProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const motion = useSectionMotion(sectionRef);
  const builder = useThemeBuilder();
  const theme: ThemeMode = appearance;

  const code = useMemo(
    () => generateThemeCode(palette, brandScale, neutralScale, builder.state),
    [brandScale, builder.state, neutralScale, palette],
  );

  const fold = 1 - motion.presence;
  const motionStyle = {
    '--theme-hero-opacity': 0.22 + motion.presence * 0.78,
    '--theme-hero-y': `${fold * 28}px`,
    '--theme-left-x': `${fold * -34}px`,
    '--theme-right-x': `${fold * 34}px`,
    '--theme-panel-z': `${fold * 100}px`,
    '--theme-panel-scale': 1 + fold * 0.075,
    '--theme-left-angle': `${fold * 13}deg`,
    '--theme-right-angle': `${fold * -13}deg`,
    '--theme-panel-opacity': 0.18 + motion.presence * 0.82,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="theme-builder"
      className={styles.section}
      data-theme={appearance}
      style={motionStyle}
    >
      <div className={styles.inner}>
        <header className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>{t('themeBuilder.eyebrow')}</div>
            <h2>{t('themeBuilder.title')}</h2>
            <p>{t('themeBuilder.description')}</p>
          </div>

          <div className={styles.staticBadge}>{t('themeBuilder.staticExport')}</div>
        </header>

        <div className={styles.builderLayout}>
          <section className={styles.builderPanel}>
            <header className={styles.panelHeader}>
              <div>
                <span className={styles.panelEyebrow}>{t('themeBuilder.configureEyebrow')}</span>
                <h3>{t('themeBuilder.configureTitle')}</h3>
              </div>

              <button className={styles.resetButton} type="button" onClick={builder.reset}>
                {t('common.reset')}
              </button>
            </header>

            <div className={styles.identityGrid}>
              <label>
                <span>{t('themeBuilder.themeName')}</span>
                <input
                  value={builder.state.themeName}
                  onChange={(event) => builder.setThemeName(event.target.value)}
                />
              </label>

              <label>
                <span>{t('themeBuilder.prefix')}</span>
                <input
                  value={builder.state.prefix}
                  spellCheck={false}
                  onChange={(event) => builder.setPrefix(event.target.value)}
                />
              </label>
            </div>

            <div className={styles.semanticHeading}>
              <div>
                <strong>{t('themeBuilder.semanticColors')}</strong>
                <span>
                  {t('themeBuilder.semanticDescription', {
                    theme: t(`themeBuilder.${theme}`),
                  })}
                </span>
              </div>

              <div className={styles.semanticColumns} aria-hidden="true">
                <span>{t('themeBuilder.family')}</span>
                <span>{t('themeBuilder.step')}</span>
              </div>
            </div>

            <div className={styles.semanticList}>
              {SEMANTIC_ROLES.map((role) => (
                <SemanticRoleEditor
                  key={role}
                  role={role}
                  assignment={builder.state.semantics[theme][role]}
                  palette={palette}
                  brandScale={brandScale}
                  onFamilyChange={(family) => builder.setSemanticFamily(theme, role, family)}
                  onStepChange={(step) => builder.setSemanticStep(theme, role, step)}
                />
              ))}
            </div>

            <div className={styles.derivedAliases}>
              <div>
                <span>{t('themeBuilder.roles.link')}</span>
                <strong>→ {t('themeBuilder.roles.primary')}</strong>
              </div>

              <div>
                <span>{t('themeBuilder.roles.focus')}</span>
                <strong>→ {t('themeBuilder.roles.primary')}</strong>
              </div>
            </div>
          </section>

          <ExportPanel
            code={code}
            format={builder.state.exportFormat}
            scaleNaming={builder.state.scaleNaming}
            onFormatChange={builder.setExportFormat}
            onScaleNamingChange={builder.setScaleNaming}
          />
        </div>
      </div>
    </section>
  );
}
