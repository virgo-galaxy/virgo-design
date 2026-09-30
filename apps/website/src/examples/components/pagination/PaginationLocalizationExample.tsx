import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './PaginationLocalizationExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Pagination
        total={85}
        showAll
        previousLabel={t('examples.pagination.details.previousPage')}
        nextLabel={t('examples.pagination.details.nextPage')}
        labels={{
          navigation: t('examples.pagination.details.pagination'),
          previous: t('examples.pagination.details.previousPage'),
          next: t('examples.pagination.details.nextPage'),
          page: (value) =>
            t('examples.pagination.details.pageValue', {
              v0: translateExampleText(t, 'pagination', String(value)),
            }),
          jumpBackward: t('examples.pagination.details.jumpBackward5Pages'),
          jumpForward: t('examples.pagination.details.jumpForward5Pages'),
          pageSize: t('examples.pagination.details.pageSize'),
          itemsPerPage: (size) =>
            t('examples.pagination.details.valueItemsPerPage', {
              v0: translateExampleText(t, 'pagination', String(size)),
            }),
          jumpTo: t('examples.pagination.details.jumpTo'),
          pageUnit: t('examples.pagination.details.page'),
          total: (total) =>
            t('examples.pagination.details.valueItemsInTotal', {
              v0: translateExampleText(t, 'pagination', String(total)),
            }),
        }}
      />
    </div>
  );
}
