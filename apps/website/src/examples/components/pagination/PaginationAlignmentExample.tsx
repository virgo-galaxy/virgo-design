import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './PaginationAlignmentExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['left', 'center', 'right'] as const).map((align) => (
        <Pagination
          key={align}
          total={50}
          align={align}
          aria-label={t('examples.pagination.details.valuePagination', {
            v0: translateExampleText(t, 'pagination', String(align)),
          })}
        />
      ))}
    </div>
  );
}
