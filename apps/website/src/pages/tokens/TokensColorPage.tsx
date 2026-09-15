import { useTranslation } from 'react-i18next';

import { ColorSemanticPreview } from '@/features/color-semantic-preview/ColorSemanticPreview';
import { SemanticColorExport } from '@/features/color-semantic-preview/SemanticColorExport';

import { TokenPage, TokenSection } from './TokenPage';

export function TokensColorPage() {
  const { t } = useTranslation();

  return (
    <TokenPage title={t('tokensPage.title')} description={t('tokensPage.description')}>
      <TokenSection
        eyebrow={t('tokensPage.previewEyebrow')}
        title={t('tokensPage.previewTitle')}
        description={t('tokensPage.previewDescription')}
      >
        <ColorSemanticPreview />
      </TokenSection>

      <TokenSection
        id="semantic-color-export"
        eyebrow={t('tokensPage.export.eyebrow')}
        title={t('tokensPage.export.title')}
        description={t('tokensPage.export.description')}
      >
        <SemanticColorExport />
      </TokenSection>
    </TokenPage>
  );
}
