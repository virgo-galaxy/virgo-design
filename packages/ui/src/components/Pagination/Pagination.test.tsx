import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from './Pagination';

describe('Pagination UI', () => {
  it('retains totals and appends an external selection count across pages', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Pagination total={85} showTotal selectedCount={20} />);
    const summary = screen
      .getByText('Total 85 items', { exact: false })
      .closest('[data-slot="total"]')!;
    expect(summary).toHaveTextContent('Total 85 items (Selected 20 items)');
    expect(summary).toHaveAttribute('aria-live', 'polite');
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(summary).toHaveTextContent('Total 85 items (Selected 20 items)');
    rerender(<Pagination total={85} showTotal selectedCount={0} />);
    expect(summary).toHaveTextContent('Total 85 items');
    expect(summary.querySelector('[data-slot="selected"]')).toBeNull();
    rerender(<Pagination total={85} selectedCount={20} />);
    expect(screen.queryByText('Total 85 items', { exact: false })).not.toBeInTheDocument();
  });

  it('localizes the total and selection suffix, including custom ranges', () => {
    render(
      <Pagination
        total={85}
        showTotal={(total, [start, end]) => `第 ${start}–${end} 项，共 ${total} 项`}
        selectedCount={2}
        labels={{ selected: (count) => `（已选 ${count} 项）` }}
      />,
    );
    expect(screen.getByText('第 1–10 项，共 85 项', { exact: false })).toHaveTextContent(
      '第 1–10 项，共 85 项 （已选 2 项）',
    );
  });

  it('applies the requested density to every pagination control and keeps small as the default', () => {
    const { rerender } = render(<Pagination total={85} showAll size="medium" />);
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('data-size', 'medium');
    expect(
      screen.getByRole('button', { name: 'Items per page' }).closest('[data-size]'),
    ).toHaveAttribute('data-size', 'medium');
    expect(
      screen.getByRole('textbox', { name: 'Go to page' }).closest('[data-size]'),
    ).toHaveAttribute('data-size', 'medium');
    rerender(<Pagination total={85} showAll />);
    expect(navigation).toHaveAttribute('data-size', 'small');
  });
  it('shows optional controls independently and lets explicit flags override showAll', () => {
    const { rerender } = render(<Pagination total={85} />);
    expect(screen.queryByText('Total 85 items')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Items per page' })).not.toBeInTheDocument();
    rerender(<Pagination total={85} showAll showSizeChanger={false} />);
    expect(screen.getByText('Total 85 items')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Items per page' })).not.toBeInTheDocument();
  });

  it('selects size with the keyboard, includes custom current sizes and resets once', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Pagination
        total={85}
        defaultPage={4}
        defaultPageSize={15}
        showAll
        pageSizeOptions={[10, 20, 20, -1, 0]}
        onChange={onChange}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Items per page' });
    expect(trigger).toHaveTextContent('15 / page');
    await user.click(trigger);
    expect(screen.getAllByRole('menuitemradio')).toHaveLength(3);
    expect(screen.getByRole('menuitemradio', { name: '15 / page' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledExactlyOnceWith(1, 20);
    expect(trigger).toHaveTextContent('20 / page');
    expect(trigger).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
  });

  it('validates jump drafts, commits Enter once and keeps focus without submitting a parent form', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSubmit = vi.fn((event) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Pagination total={85} showQuickJumper onChange={onChange} />
      </form>,
    );
    const input = screen.getByRole('textbox', { name: 'Go to page' });
    for (const value of ['', 'abc', '2.5', '0', '10']) {
      fireEvent.change(input, { target: { value } });
      await user.click(input);
      await user.keyboard('{Enter}');
      expect(onChange).not.toHaveBeenCalled();
      if (value !== '') expect(input).toHaveAttribute('aria-invalid', 'true');
    }
    await user.clear(input);
    await user.type(input, '9{Enter}');
    expect(onChange).toHaveBeenCalledExactlyOnceWith(9, 10);
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
    await user.type(input, '4{Escape}');
    expect(input).toHaveValue('');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders totals from the visible range and clamps a controlled last page', () => {
    const range = vi.fn((total, [start, end]) => `${start}-${end} of ${total}`);
    render(<Pagination total={85} page={99} pageSize={20} showTotal={range} />);
    expect(screen.getByText('81-85 of 85')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 5' })).toHaveAttribute('aria-current', 'page');
  });

  it('uses accessible five-page jumps and text navigation with a single current page', async () => {
    const user = userEvent.setup();
    render(<Pagination total={500} defaultPage={6} previousLabel="Previous" nextLabel="Next" />);
    await user.click(screen.getByRole('button', { name: 'Jump forward 5 pages' }));
    expect(screen.getByRole('button', { name: 'Page 11' })).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByRole('button', { name: 'Jump back 5 pages' }));
    expect(screen.getByRole('button', { name: 'Page 6' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getAllByRole('button', { current: 'page' })).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Previous page' })).toHaveTextContent('Previous');
    expect(screen.getByRole('button', { name: 'Next page' })).toHaveTextContent('Next');
  });

  it.each([0, 85])('disables every control for disabled/empty data (%i)', async (total) => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination total={total} disabled={total !== 0} showAll onChange={onChange} />);
    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled();
      await user.click(button);
    }
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each(['left', 'center', 'right'] as const)(
    'supports %s alignment and localized labels',
    (align) => {
      render(
        <Pagination
          total={50}
          align={align}
          labels={{ navigation: '分页', page: (page) => `第 ${page} 页` }}
        />,
      );
      const nav = screen.getByRole('navigation', { name: '分页' });
      expect(nav).toHaveAttribute('data-align', align);
      expect(within(nav).getByRole('button', { name: '第 1 页' })).toHaveAttribute(
        'aria-current',
        'page',
      );
    },
  );
});
