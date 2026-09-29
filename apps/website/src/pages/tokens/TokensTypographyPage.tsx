import { useTranslation } from 'react-i18next';

import { SemanticTypographyTables } from './components/SemanticTypographyTables';
import { TypographyCompositionPreview } from './components/TypographyCompositionPreview';
import { TokenPage, TokenSection } from './TokenPage';

export function TokensTypographyPage() {
  const { t } = useTranslation();

  return (
    <TokenPage
      title={t('tokens.typography.title')}
      description={t('tokens.typography.description')}
    >
      <TokenSection
        id="semantic-typography"
        eyebrow={t('tokens.typography.semanticTypography.eyebrow')}
        title={t('tokens.typography.semanticTypography.title')}
        description={t('tokens.typography.semanticTypography.description')}
      >
        <SemanticTypographyTables />
      </TokenSection>

      <TokenSection
        id="composition-preview"
        eyebrow={t('tokens.typography.compositionPreview.eyebrow')}
        title={t('tokens.typography.compositionPreview.title')}
        description={t('tokens.typography.compositionPreview.description')}
      >
        <TypographyCompositionPreview />
      </TokenSection>
    </TokenPage>
  );
}
