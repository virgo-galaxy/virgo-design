import { Empty } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './EmptyBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Empty aria-label={t('examples.empty.copy.emptyDocuments')}>
        <Empty.Title>{t('examples.empty.copy.noDocuments')}</Empty.Title>
      </Empty>
      <Empty aria-label={t('examples.empty.copy.emptyProjects')}>
        <Empty.Title>{t('examples.empty.copy.noProjectsYet')}</Empty.Title>
        <Empty.Description>
          {t('examples.empty.copy.createAProjectToOrganizeYourTeamSWork')}
        </Empty.Description>
      </Empty>
    </div>
  );
}
