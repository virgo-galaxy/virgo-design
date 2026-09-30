import { SearchIcon } from '@virgo-design/icons';
import { Empty } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './EmptySearchExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Empty size="sm" aria-label={t('examples.empty.copy.noSearchResults')} className={styles.root!}>
      <Empty.Icon>
        <SearchIcon />
      </Empty.Icon>
      <Empty.Title>{t('examples.empty.copy.noMatchingResults')}</Empty.Title>
      <Empty.Description>{t('examples.empty.copy.tryADifferentSearchTerm')}</Empty.Description>
    </Empty>
  );
}
