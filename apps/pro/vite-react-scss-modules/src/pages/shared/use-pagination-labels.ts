import type { PaginationLabels } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export function usePaginationLabels(): PaginationLabels {
  const { t } = useTranslation();
  return {
    navigation: t('shared.pagination.navigation'),
    previous: t('shared.pagination.previous'),
    next: t('shared.pagination.next'),
    page: (page) => t('shared.pagination.page', { page }),
    jumpBackward: t('shared.pagination.jumpBackward'),
    jumpForward: t('shared.pagination.jumpForward'),
    pageSize: t('shared.pagination.pageSize'),
    itemsPerPage: (size) => t('shared.pagination.itemsPerPage', { size }),
    jumpTo: t('shared.pagination.jumpTo'),
    pageUnit: t('shared.pagination.pageUnit'),
    selected: (count) => t('shared.pagination.selected', { count }),
    total: (count) => t('shared.pagination.total', { count }),
  };
}
