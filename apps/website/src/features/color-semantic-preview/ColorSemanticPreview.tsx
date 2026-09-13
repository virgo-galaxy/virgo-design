import { COLOR_SEMANTIC_GROUPS, COLOR_SEMANTIC_ROLE_COUNT, themes } from '@virgo-design/tokens';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { SemanticThemePreview } from './components/SemanticThemePreview';
import styles from './styles/color-semantic-preview.module.scss';

export function ColorSemanticPreview() {
  const { t } = useTranslation();
  const pageStyle = {
    '--tokens-page-brand': themes.light.color.brand.primary,
    '--tokens-page-violet': themes.light.color.data.categorical[11],
  } as CSSProperties;

  return (
    <main className={styles.page} style={pageStyle}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>{t('tokensPage.eyebrow')}</span>
          <h1>{t('tokensPage.title')}</h1>
          <p>{t('tokensPage.description')}</p>
        </div>

        <div className={styles.heroMeta}>
          <div>
            <strong>{COLOR_SEMANTIC_ROLE_COUNT}</strong>
            <span>{t('tokensPage.semanticRoles')}</span>
          </div>
          <div>
            <strong>{COLOR_SEMANTIC_GROUPS.length}</strong>
            <span>{t('tokensPage.colorGroups')}</span>
          </div>
          <div>
            <strong>{Object.keys(themes).length}</strong>
            <span>{t('tokensPage.resolvedThemes')}</span>
          </div>
        </div>
      </header>

      <div className={styles.sourceBar}>
        <div className={styles.sourceNote}>
          <span className={styles.sourceDot} />
          <div>
            <strong>{t('tokensPage.sourceTitle')}</strong>
            <p>{t('tokensPage.sourceDescription')}</p>
          </div>
        </div>
      </div>

      <section className={styles.comparison} aria-label={t('tokensPage.comparisonLabel')}>
        <SemanticThemePreview
          theme={themes.light}
          title={t('tokensPage.light.title')}
          description={t('tokensPage.light.description')}
        />
        <SemanticThemePreview
          theme={themes.dark}
          title={t('tokensPage.dark.title')}
          description={t('tokensPage.dark.description')}
        />
      </section>
    </main>
  );
}
