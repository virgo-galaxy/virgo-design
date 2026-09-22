import { createContext, forwardRef, useContext, useEffect, useState } from 'react';

import type {
  PaginationItem as PageItem,
  PaginationItemProps,
  PaginationProps,
  PaginationState,
} from './Pagination.types';

const PaginationContext = createContext<PaginationState | null>(null);

function positiveInteger(value: number, fallback: number) {
  return Number.isFinite(value) && value >= 1
    ? Math.min(Number.MAX_SAFE_INTEGER, Math.floor(value))
    : fallback;
}

function clampPage(page: number, pageCount: number) {
  return Math.min(positiveInteger(page, 1), pageCount);
}

function pageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);

  const start = Math.max(2, Math.min(page - 1, pageCount - 4));
  const end = Math.min(pageCount - 1, Math.max(page + 1, 5));
  const items: PageItem[] = [1];
  if (start === 3) items.push(2);
  else if (start > 3) items.push('start-ellipsis');
  for (let value = start; value <= end; value += 1) items.push(value);
  if (end === pageCount - 2) items.push(pageCount - 1);
  else if (end < pageCount - 2) items.push('end-ellipsis');
  items.push(pageCount);
  return items;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    total: totalProp,
    page: controlledPage,
    defaultPage = 1,
    pageSize: controlledPageSize,
    defaultPageSize = 10,
    onChange,
    disabled = false,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  forwardedRef,
) {
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
  const [uncontrolledPageSize, setUncontrolledPageSize] = useState(defaultPageSize);
  const total = Number.isFinite(totalProp)
    ? Math.max(0, Math.min(Number.MAX_SAFE_INTEGER, Math.floor(totalProp)))
    : 0;
  const pageSize = positiveInteger(controlledPageSize ?? uncontrolledPageSize, 10);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = clampPage(controlledPage ?? uncontrolledPage, pageCount);
  const isDisabled = disabled || total === 0;

  // Persist a reduced range so old uncontrolled pages do not reappear when total grows again.
  useEffect(() => {
    if (controlledPage === undefined) {
      setUncontrolledPage((value) => clampPage(value, pageCount));
    }
  }, [controlledPage, pageCount]);

  const state: PaginationState = {
    page,
    pageSize,
    pageCount,
    total,
    range: total === 0 ? [0, 0] : [(page - 1) * pageSize + 1, Math.min(page * pageSize, total)],
    items: pageItems(page, pageCount),
    disabled: isDisabled,
    setPage(nextPage) {
      if (isDisabled || !Number.isFinite(nextPage)) return;
      const next = clampPage(nextPage, pageCount);
      if (next === page) return;
      if (controlledPage === undefined) setUncontrolledPage(next);
      onChange?.(next, pageSize);
    },
    setPageSize(nextPageSize) {
      if (
        isDisabled ||
        !Number.isSafeInteger(nextPageSize) ||
        nextPageSize < 1 ||
        nextPageSize === pageSize
      )
        return;
      if (controlledPageSize === undefined) setUncontrolledPageSize(nextPageSize);
      if (controlledPage === undefined) setUncontrolledPage(1);
      onChange?.(1, nextPageSize);
    },
  };

  return (
    <PaginationContext.Provider value={state}>
      <nav
        {...props}
        ref={forwardedRef}
        aria-label={ariaLabel ?? (ariaLabelledBy === undefined ? 'Pagination' : undefined)}
        aria-labelledby={ariaLabelledBy}
        data-disabled={isDisabled || undefined}
      >
        {typeof children === 'function' ? children(state) : children}
      </nav>
    </PaginationContext.Provider>
  );
});

Pagination.displayName = 'Pagination';

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  function PaginationItem(
    { page, current = true, disabled, onClick, children, 'aria-label': ariaLabel, ...props },
    forwardedRef,
  ) {
    const state = useContext(PaginationContext);
    if (state === null) throw new Error('Pagination.Item must be used inside Pagination.');
    const isDisabled =
      state.disabled ||
      disabled ||
      page < 1 ||
      page > state.pageCount ||
      !Number.isSafeInteger(page);

    return (
      <button
        {...props}
        ref={forwardedRef}
        type="button"
        disabled={isDisabled}
        aria-label={ariaLabel ?? `Page ${page}`}
        aria-current={current && state.page === page ? 'page' : undefined}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !isDisabled) state.setPage(page);
        }}
      >
        {children ?? page}
      </button>
    );
  },
);

PaginationItem.displayName = 'Pagination.Item';
