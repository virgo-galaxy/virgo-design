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

      <section className={styles.comparison} aria-label={t('tokens.colors.comparisonLabel')}>
        <SemanticThemePreview
          theme={themes.light}
          title={t('tokens.colors.light.title')}
          description={t('tokens.colors.light.description')}
        />
        <SemanticThemePreview
          theme={themes.dark}
          title={t('tokens.colors.dark.title')}
          description={t('tokens.colors.dark.description')}
        />
      </section>
    </div>
  );
}
