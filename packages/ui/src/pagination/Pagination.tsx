import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EllipsisIcon,
} from '@virgo-design/icons';
import { Pagination as PrimitivePagination, type PaginationState } from '@virgo-design/primitives';
import { forwardRef, useEffect, useState } from 'react';

import { Dropdown } from '../dropdown';
import { Input } from '../input';
import styles from './Pagination.module.scss';
import type { PaginationLabels, PaginationProps } from './Pagination.types';

const defaultLabels: PaginationLabels = {
  navigation: 'Pagination',
  previous: 'Previous page',
  next: 'Next page',
  page: (page) => `Page ${page}`,
  jumpBackward: 'Jump back 5 pages',
  jumpForward: 'Jump forward 5 pages',
  pageSize: 'Items per page',
  itemsPerPage: (size) => `${size} / page`,
  jumpTo: 'Go to',
  pageUnit: 'page',
  total: (total) => `Total ${total} items`,
};

function QuickJumper({ state, labels }: { state: PaginationState; labels: PaginationLabels }) {
  const [value, setValue] = useState('');
  useEffect(() => setValue(''), [state.page, state.pageSize]);
  const invalid =
    value !== '' &&
    (!/^\d+$/.test(value) ||
      !Number.isSafeInteger(Number(value)) ||
      Number(value) < 1 ||
      Number(value) > state.pageCount);

  return (
    <label className={styles.jumper}>
      <span>{labels.jumpTo}</span>
      <Input
        size="small"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        disabled={state.disabled}
        invalid={invalid}
        aria-label={`${labels.jumpTo} ${labels.pageUnit}`}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            if (value !== '' && !invalid) {
              state.setPage(Number(value));
              setValue('');
            }
          } else if (event.key === 'Escape') {
            setValue('');
          }
        }}
      />
      <span>{labels.pageUnit}</span>
    </label>
  );
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    align = 'left',
    showAll = false,
    showTotal = showAll,
    showSizeChanger = showAll,
    showQuickJumper = showAll,
    pageSizeOptions = [10, 20, 50, 100],
    previousLabel,
    nextLabel,
    labels: customLabels,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  forwardedRef,
) {
  const labels = { ...defaultLabels, ...customLabels };

  return (
    <PrimitivePagination
      {...props}
      ref={forwardedRef}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-align={align}
      aria-label={ariaLabel ?? (ariaLabelledBy === undefined ? labels.navigation : undefined)}
      aria-labelledby={ariaLabelledBy}
    >
      {(state) => (
        <>
          {showTotal ? (
            <span className={styles.total} data-slot="total">
              {(typeof showTotal === 'function' ? showTotal : labels.total)(
                state.total,
                state.range,
              )}
            </span>
          ) : null}
          <ol className={styles.list}>
            <li>
              <PrimitivePagination.Item
                page={state.page - 1}
                current={false}
                className={styles.item}
                aria-label={labels.previous}
              >
                {previousLabel ?? <ChevronLeftIcon size={16} aria-hidden="true" />}
              </PrimitivePagination.Item>
            </li>
            {state.items.map((item) => (
              <li key={item}>
                {typeof item === 'number' ? (
                  <PrimitivePagination.Item
                    page={item}
                    className={styles.item}
                    aria-label={labels.page(item)}
                  />
                ) : (
                  <PrimitivePagination.Item
                    page={Math.max(
                      1,
                      Math.min(state.pageCount, state.page + (item === 'start-ellipsis' ? -5 : 5)),
                    )}
                    current={false}
                    className={`${styles.item} ${styles.more}`}
                    aria-label={
                      item === 'start-ellipsis' ? labels.jumpBackward : labels.jumpForward
                    }
                  >
                    <EllipsisIcon size={16} className={styles.ellipsis} aria-hidden="true" />
                    {item === 'start-ellipsis' ? (
                      <ChevronsLeftIcon size={16} className={styles.jumpIcon} aria-hidden="true" />
                    ) : (
                      <ChevronsRightIcon size={16} className={styles.jumpIcon} aria-hidden="true" />
                    )}
                  </PrimitivePagination.Item>
                )}
              </li>
            ))}
            <li>
              <PrimitivePagination.Item
                page={state.page + 1}
                current={false}
                className={styles.item}
                aria-label={labels.next}
              >
                {nextLabel ?? <ChevronRightIcon size={16} aria-hidden="true" />}
              </PrimitivePagination.Item>
            </li>
          </ol>
          {showSizeChanger ? (
            <Dropdown className={styles.sizeChanger} size="small" disabled={state.disabled}>
              <Dropdown.Trigger aria-label={labels.pageSize}>
                {labels.itemsPerPage(state.pageSize)}
              </Dropdown.Trigger>
              <Dropdown.Content>
                {[...new Set([...pageSizeOptions, state.pageSize])]
                  .filter((size) => Number.isSafeInteger(size) && size > 0)
                  .sort((left, right) => left - right)
                  .map((size) => (
                    <Dropdown.Item
                      key={size}
                      checked={state.pageSize === size}
                      onSelect={() => state.setPageSize(size)}
                    >
                      {labels.itemsPerPage(size)}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Content>
            </Dropdown>
          ) : null}
          {showQuickJumper ? <QuickJumper state={state} labels={labels} /> : null}
        </>
      )}
    </PrimitivePagination>
  );
});

Pagination.displayName = 'Pagination';
