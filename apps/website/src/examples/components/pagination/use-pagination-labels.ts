import type { PaginationLabels } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export function usePaginationLabels(): PaginationLabels {
  const { t } = useTranslation();
  return {
    navigation: t('examples.pagination.details.pagination'),
    previous: t('examples.pagination.details.previousPage'),
    next: t('examples.pagination.details.nextPage'),
    page: (value) => t('examples.pagination.details.pageValue', { v0: value }),
    jumpBackward: t('examples.pagination.details.jumpBackward5Pages'),
    jumpForward: t('examples.pagination.details.jumpForward5Pages'),
    pageSize: t('examples.pagination.details.pageSize'),
    itemsPerPage: (value) => t('examples.pagination.details.valueItemsPerPage', { v0: value }),
    jumpTo: t('examples.pagination.details.jumpTo'),
    pageUnit: t('examples.pagination.details.page'),
    total: (value) => t('examples.pagination.details.valueItemsInTotal', { v0: value }),
  };
}
