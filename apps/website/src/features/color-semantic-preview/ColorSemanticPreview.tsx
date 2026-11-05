import { useGSAP } from '@gsap/react';
import { COLOR_SEMANTIC_GROUPS, COLOR_SEMANTIC_ROLE_COUNT, themes } from '@virgo-design/tokens';
import { Switch } from '@virgo-design/ui';
import { gsap } from 'gsap';
import { type CSSProperties, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { useAppearance } from '@/shared/theme/use-appearance';

import { SemanticThemePreview } from './components/SemanticThemePreview';

import styles from './styles/color-semantic-preview.module.scss';

gsap.registerPlugin(useGSAP);

export function ColorSemanticPreview() {
  const { t } = useTranslation();
  const { appearance } = useAppearance();
  const [compareThemes, setCompareThemes] = useState(false);
  const comparisonRef = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP({ scope: comparisonRef });
  const previewThemes = compareThemes ? [themes.light, themes.dark] : [themes[appearance]];
  const handleComparisonChange = contextSafe((checked: boolean) => {
    const preview = comparisonRef.current;
    const height = preview?.getBoundingClientRect().height;

    if (preview) gsap.killTweensOf(preview);

    if (!preview || !height || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      if (preview) gsap.set(preview, { clearProps: 'height,opacity,transform,overflow' });
      setCompareThemes(checked);
      return;
    }

    flushSync(() => setCompareThemes(checked));
    gsap.fromTo(
      preview,
      { height, opacity: 0, y: 6, overflow: 'hidden' },
      {
        height: 'auto',
        opacity: 1,
        y: 0,
        duration: 0.32,
        ease: 'power2.out',
        clearProps: 'height,opacity,transform,overflow',
      },
    );
  });
  const pageStyle = {
    '--tokens-page-brand': themes.light.color.brand.primary,
    '--tokens-page-violet': themes.light.color.data.categorical[11],
  } as CSSProperties;

  return (
    <div className={styles.preview} style={pageStyle} data-testid="semantic-color-preview">
      <div className={styles.heroMeta}>
        <div>
          <strong>{COLOR_SEMANTIC_ROLE_COUNT}</strong>
          <span>{t('tokens.colors.semanticRoles')}</span>
        </div>
        <div>
          <strong>{COLOR_SEMANTIC_GROUPS.length}</strong>
          <span>{t('tokens.colors.colorGroups')}</span>
        </div>
        <div>
          <strong>{Object.keys(themes).length}</strong>
          <span>{t('tokens.colors.resolvedThemes')}</span>
        </div>
      </div>

      <div className={styles.sourceBar}>
        <div className={styles.sourceNote}>
          <span className={styles.sourceDot} />
          <div>
            <strong>{t('tokens.colors.sourceTitle')}</strong>
            <p>{t('tokens.colors.sourceDescription')}</p>
          </div>
        </div>
      </div>

      <div className={styles.previewControls}>
        <Switch checked={compareThemes} onCheckedChange={handleComparisonChange} size="small">
          {t('tokens.colors.compareThemes')}
        </Switch>
      </div>

      <section
        ref={comparisonRef}
        className={styles.comparison}
        data-compare={compareThemes}
        aria-label={t(
          compareThemes ? 'tokens.colors.comparisonLabel' : 'tokens.colors.previewLabel',
        )}
      >
        {previewThemes.map((theme) => (
          <SemanticThemePreview
            key={theme.mode}
            theme={theme}
            title={t(`tokens.colors.${theme.mode}.title`)}
            description={t(`tokens.colors.${theme.mode}.description`)}
          />
        ))}
      </section>
    </div>
  );
}
