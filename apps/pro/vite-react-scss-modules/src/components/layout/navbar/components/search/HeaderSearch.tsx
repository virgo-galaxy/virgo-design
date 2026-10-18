import { SearchIcon } from '@virgo-design/icons';
import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './HeaderSearch.module.scss';

export function HeaderSearch() {
  const { t } = useTranslation();

  return (
    <Input
      rootClassName={styles.search!}
      suffix={<SearchIcon />}
      aria-label={t('app.searchPlaceholder')}
      placeholder={t('app.searchPlaceholder')}
      size="medium"
    />
  );
}
