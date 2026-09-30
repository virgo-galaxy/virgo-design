import { useTranslation } from 'react-i18next';

import { IconsExplorer } from '@/features/icons/IconsExplorer';

import { FoundationPage } from './FoundationPage';

export function IconsPage() {
  const { t } = useTranslation();
  return (
    <FoundationPage
      title={t('foundations.icons.title')}
      description={t('foundations.icons.description')}
    >
      <IconsExplorer />
    </FoundationPage>
  );
}
