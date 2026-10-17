import { Pagination } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function PaginationExample() {
  const { t } = useTranslation();

  return (
    <Pagination total={72} defaultPage={2} pageSize={10} data-docs-primitive="pagination">
      {(state) => (
        <>
          <Pagination.Item page={state.page - 1} disabled={state.page === 1}>
            {t('primitives.examples.previous')}
          </Pagination.Item>{' '}
          {state.items.map((item) =>
            typeof item === 'number' ? (
              <Pagination.Item key={item} page={item} current={item === state.page}>
                {item}
              </Pagination.Item>
            ) : (
              <span key={item}> … </span>
            ),
          )}{' '}
          <Pagination.Item page={state.page + 1} disabled={state.page === state.pageCount}>
            {t('primitives.examples.next')}
          </Pagination.Item>
        </>
      )}
    </Pagination>
  );
}
