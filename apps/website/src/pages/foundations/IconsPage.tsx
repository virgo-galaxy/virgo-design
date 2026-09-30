import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { IconCatalogue } from '@/features/icons/IconCatalogue';
import { IconDetail } from '@/features/icons/IconDetail';
import { IconStudio } from '@/features/icons/IconStudio';

import { FoundationPage } from './FoundationPage';
export function IconsPage() {
  const { t } = useTranslation();
  const { iconId } = useParams();
  return (
    <FoundationPage title={t('icons.title')} description={t('icons.description')}>
      {iconId === 'studio' ? (
        <IconStudio />
      ) : iconId ? (
        <IconDetail id={iconId} />
      ) : (
        <IconCatalogue />
      )}
    </FoundationPage>
  );
}
