import { useTranslation } from 'react-i18next';

import { SemanticTypographyTables } from './components/SemanticTypographyTables';
import { TypographyCompositionPreview } from './components/TypographyCompositionPreview';
import { TokenPage, TokenSection } from './TokenPage';

export function TokensTypographyPage() {
  const { t } = useTranslation();

  return (
    <TokenPage title={t('tokensTypography.title')} description={t('tokensTypography.description')}>
      <TokenSection
        id="semantic-typography"
        eyebrow={t('tokensTypography.semanticTypography.eyebrow')}
        title={t('tokensTypography.semanticTypography.title')}
        description={t('tokensTypography.semanticTypography.description')}
      >
        <SemanticTypographyTables />
      </TokenSection>

      <TokenSection
        id="composition-preview"
        eyebrow={t('tokensTypography.compositionPreview.eyebrow')}
        title={t('tokensTypography.compositionPreview.title')}
        description={t('tokensTypography.compositionPreview.description')}
      >
        <TypographyCompositionPreview />
      </TokenSection>
    </TokenPage>
  );
}
