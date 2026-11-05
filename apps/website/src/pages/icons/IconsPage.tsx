import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { DocumentationCatalogue } from '@/components/docs/DocumentationCatalogue';
import { IconCatalogue } from '@/features/icons/IconCatalogue';
import { IconDetail } from '@/features/icons/IconDetail';
import { IconStudio } from '@/features/icons/IconStudio';

export function IconsPage() {
  const { t } = useTranslation();
  const { iconId } = useParams();

  return (
    <DocumentationCatalogue
      pageId="icons"
      eyebrow="@virgo-design/icons"
      title={t('icons.title')}
      description={t('icons.description')}
    >
      {iconId === 'studio' ? (
        <IconStudio />
      ) : iconId ? (
        <IconDetail id={iconId} />
      ) : (
        <IconCatalogue />
      )}
    </DocumentationCatalogue>
  );
}
