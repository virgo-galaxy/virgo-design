// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { emptyTaskQuery } from '../../model/query-params';
import { TaskFilters } from './TaskFilters';

vi.mock('@/features/catalog', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/features/catalog')>()),
  useTaskCatalog: () => ({
    projects: [],
    metadata: {
      members: [
        { id: 'ava', name: 'Anika Rao' },
        { id: 'nina', name: 'Nina Wu' },
      ],
      projects: ['online-store'],
      referenceDate: '2026-10-02',
    },
  }),
}));

describe('Task combination query', () => {
  it('opens assignee suggestions only after typing, including the empty result state', async () => {
    const user = userEvent.setup();
    render(<TaskFilters filters={emptyTaskQuery} onApply={vi.fn()} onReset={vi.fn()} />);
    const input = screen.getByRole('combobox', { name: 'Assignee' });
    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear input' })).not.toBeInTheDocument();
    await user.type(input, 'nin');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Enter}');
    await user.click(screen.getByRole('textbox', { name: 'Search tasks' }));
    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'false');
    await user.clear(input);
    expect(input).toHaveAttribute('aria-expanded', 'false');
    await user.type(input, 'unknown');
    expect(screen.getByText('No team member matches')).toBeVisible();
  });
  it('autocompletes assignees by name and applies the selected member ID', async () => {
    const user = userEvent.setup();
    const apply = vi.fn();
    render(<TaskFilters filters={emptyTaskQuery} onApply={apply} onReset={vi.fn()} />);
    const input = screen.getByRole('combobox', { name: 'Assignee' });
    await user.type(input, 'nin');
    expect(screen.getByRole('option', { name: 'Nina Wu' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Anika Rao' })).not.toBeInTheDocument();
    await user.keyboard('{Enter}');
    expect(input).toHaveValue('Nina Wu');
    expect(apply).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(apply).toHaveBeenLastCalledWith({ ...emptyTaskQuery, assignee: ['nina'] });
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(input).toHaveValue('');
  });
  it('does not apply a stale assignee while editing and allows clearing the filter', async () => {
    const user = userEvent.setup();
    const apply = vi.fn();
    render(
      <TaskFilters
        filters={{ ...emptyTaskQuery, assignee: ['ava'] }}
        onApply={apply}
        onReset={vi.fn()}
      />,
    );
    const input = screen.getByRole('combobox', { name: 'Assignee' });
    expect(input).toHaveValue('Anika Rao');
    await user.clear(input);
    await user.type(input, 'unknown');
    expect(screen.getByText('No team member matches')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(apply).not.toHaveBeenCalled();
    expect(screen.getByText('Choose an assignee.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear input' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(apply).toHaveBeenLastCalledWith({ ...emptyTaskQuery, assignee: [] });
  });
  it('keeps conditions as a draft until Apply, then resets both the draft and results', async () => {
    const user = userEvent.setup();
    const apply = vi.fn();
    const reset = vi.fn();
    render(<TaskFilters filters={emptyTaskQuery} onApply={apply} onReset={reset} />);
    await user.type(screen.getByRole('textbox', { name: 'Search tasks' }), 'release');
    fireEvent.change(screen.getByLabelText('Created between'), { target: { value: '2026-09-01' } });
    fireEvent.change(screen.getByLabelText('End date'), { target: { value: '2026-09-30' } });
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '7' } });
    await user.click(screen.getByRole('button', { name: 'Increase value' }));
    await user.click(screen.getByLabelText('Status'));
    await user.click(screen.getByRole('option', { name: 'Todo' }));
    await user.keyboard('{Escape}');
    await user.click(screen.getByLabelText('Priority'));
    await user.click(screen.getByRole('option', { name: 'High' }));
    await user.keyboard('{Escape}');
    expect(apply).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(apply).toHaveBeenLastCalledWith({
      ...emptyTaskQuery,
      search: 'release',
      status: ['todo'],
      priority: ['high'],
      createdFrom: '2026-09-01',
      createdTo: '2026-09-30',
      minimumHours: '8',
    });
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    await user.click(resetButton);
    expect(reset).toHaveBeenCalledOnce();
    expect(screen.getByRole('textbox', { name: 'Search tasks' })).toHaveValue('');
    expect(screen.getByLabelText('Created between')).toHaveValue('');
    expect(screen.getByRole('spinbutton')).toHaveValue(null);
  });
  it('limits both creation endpoints to today and rejects manually entered future dates', async () => {
    const user = userEvent.setup();
    const apply = vi.fn();
    render(<TaskFilters filters={emptyTaskQuery} onApply={apply} onReset={vi.fn()} />);
    const from = screen.getByLabelText('Created between');
    const to = screen.getByLabelText('End date');
    expect(from.getAttribute('max')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(to).toHaveAttribute('max', from.getAttribute('max'));
    fireEvent.change(to, { target: { value: '9999-12-31' } });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(apply).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Creation dates cannot be later than today.',
    );
    fireEvent.change(from, { target: { value: '9999-12-30' } });
    fireEvent.change(to, { target: { value: '' } });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(apply).not.toHaveBeenCalled();
  });
  it('rejects invalid intervals without applying them and accepts open-ended dates', async () => {
    const user = userEvent.setup();
    const apply = vi.fn();
    render(<TaskFilters filters={emptyTaskQuery} onApply={apply} onReset={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Created between'), { target: { value: '2026-10-02' } });
    fireEvent.change(screen.getByLabelText('End date'), { target: { value: '2026-09-01' } });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(apply).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('End date'), { target: { value: '' } });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(apply).toHaveBeenCalledWith({ ...emptyTaskQuery, createdFrom: '2026-10-02' });
  });
});
