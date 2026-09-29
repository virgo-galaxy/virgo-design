import { useTranslation } from 'react-i18next';

import { ColorSemanticPreview } from '@/features/color-semantic-preview/ColorSemanticPreview';
import { SemanticColorExport } from '@/features/color-semantic-preview/SemanticColorExport';

import { TokenPage, TokenSection } from './TokenPage';

export function TokensColorPage() {
  const { t } = useTranslation();

  return (
    <TokenPage title={t('tokens.colors.title')} description={t('tokens.colors.description')}>
      <TokenSection
        eyebrow={t('tokens.colors.previewEyebrow')}
        title={t('tokens.colors.previewTitle')}
        description={t('tokens.colors.previewDescription')}
      >
        <ColorSemanticPreview />
      </TokenSection>

      <TokenSection
        id="semantic-color-export"
        eyebrow={t('tokens.colors.export.eyebrow')}
        title={t('tokens.colors.export.title')}
        description={t('tokens.colors.export.description')}
      >
        <SemanticColorExport />
      </TokenSection>
    </TokenPage>
  );
}
