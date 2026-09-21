import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination, type PaginationProps } from './index';

function Example(props: Omit<PaginationProps, 'children'>) {
  return (
    <Pagination {...props}>
      {(state) => (
        <>
          <output data-testid="state">
            {JSON.stringify({
              page: state.page,
              pageSize: state.pageSize,
              range: state.range,
              items: state.items,
            })}
          </output>
          <Pagination.Item page={state.page - 1} current={false} aria-label="Previous" />
          {state.items.map((item) =>
            typeof item === 'number' ? (
              <Pagination.Item key={item} page={item} />
            ) : (
              <span key={item}>…</span>
            ),
          )}
          <Pagination.Item page={state.page + 1} current={false} aria-label="Next" />
          <button type="button" onClick={() => state.setPageSize(20)}>
            Resize
          </button>
        </>
      )}
    </Pagination>
  );
}

describe('Pagination primitive', () => {
  it.each([
    [50, 1, [1, 2, 3, 4, 5]],
    [500, 1, [1, 2, 3, 4, 5, 'end-ellipsis', 50]],
    [500, 6, [1, 'start-ellipsis', 5, 6, 7, 'end-ellipsis', 50]],
    [500, 50, [1, 'start-ellipsis', 46, 47, 48, 49, 50]],
    [80, 4, [1, 2, 3, 4, 5, 'end-ellipsis', 8]],
    [80, 5, [1, 'start-ellipsis', 4, 5, 6, 7, 8]],
  ])('renders a bounded page window for total %i at page %i', (total, page, items) => {
    render(<Example total={total} page={page} />);
    expect(JSON.parse(screen.getByTestId('state').textContent ?? '{}').items).toEqual(items);
    expect(screen.getByRole('button', { name: `Page ${page}` })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('supports native keyboard navigation and ignores the current page', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Example total={30} onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Page 1' }));
    expect(onChange).not.toHaveBeenCalled();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('keeps controlled values until the owner updates them and reports size changes once', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Example total={85} page={3} pageSize={10} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Page 4' }));
    expect(onChange).toHaveBeenLastCalledWith(4, 10);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByRole('button', { name: 'Resize' }));
    expect(onChange).toHaveBeenLastCalledWith(1, 20);
    expect(onChange).toHaveBeenCalledTimes(2);
    rerender(<Example total={85} page={1} pageSize={20} onChange={onChange} />);
    expect(screen.getByTestId('state')).toHaveTextContent('"range":[1,20]');
  });

  it('persists clamping after totals shrink without emitting a user change', () => {
    const onChange = vi.fn();
    const { rerender } = render(<Example total={500} defaultPage={50} onChange={onChange} />);
    rerender(<Example total={25} defaultPage={50} onChange={onChange} />);
    expect(screen.getByTestId('state')).toHaveTextContent('"range":[21,25]');
    rerender(<Example total={500} defaultPage={50} onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each([0, -5, Number.NaN, Number.POSITIVE_INFINITY])(
    'handles empty/invalid total %s',
    (total) => {
      render(<Example total={total} pageSize={0} />);
      expect(screen.getByTestId('state')).toHaveTextContent('"range":[0,0]');
      expect(screen.getByRole('button', { name: 'Page 1' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    },
  );

  it('bounds rendering for huge totals', () => {
    render(<Example total={Number.MAX_SAFE_INTEGER} page={100000} />);
    expect(screen.getAllByRole('button')).toHaveLength(8);
  });

  it('forwards a navigation ref, respects disabled and composes cancellation', () => {
    const ref = createRef<HTMLElement>();
    const onChange = vi.fn();
    const { rerender } = render(
      <Pagination total={50} ref={ref} aria-label="Results" onChange={onChange}>
        <Pagination.Item page={2} onClick={(event) => event.preventDefault()} />
      </Pagination>,
    );
    expect(ref.current).toBe(screen.getByRole('navigation', { name: 'Results' }));
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).not.toHaveBeenCalled();
    rerender(
      <Pagination total={50} disabled onChange={onChange}>
        <Pagination.Item page={2} />
      </Pagination>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
