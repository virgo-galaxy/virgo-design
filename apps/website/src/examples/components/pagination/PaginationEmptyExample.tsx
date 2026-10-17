import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './PaginationEmptyExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Pagination
        total={0}
        showAll
        showTotal={(total, [start, end]) =>
          t('examples.pagination.details.valueValueOfValueItems', {
            v0: translateExampleText(t, 'pagination', String(start)),
            v1: translateExampleText(t, 'pagination', String(end)),
            v2: translateExampleText(t, 'pagination', String(total)),
          })
        }
        aria-label={t('examples.pagination.copy.emptyPagination')}
      />
    </div>
  );
}
