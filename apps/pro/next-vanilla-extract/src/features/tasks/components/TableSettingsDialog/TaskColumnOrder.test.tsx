// @vitest-environment jsdom
import { createEvent, fireEvent, render, screen, within } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { defaultTableSettings, type TaskColumnKey } from '../../model/table-settings';
import { TaskColumnOrder } from './TaskColumnOrder';

function ColumnOrderHarness() {
  const [settings, setSettings] = useState(defaultTableSettings);
  const [columnKey, setColumnKey] = useState<TaskColumnKey>('title');

  return (
    <div role="dialog" aria-label="Table settings">
      <TaskColumnOrder
        settings={settings}
        columnKey={columnKey}
        onSelect={setColumnKey}
        onChange={setSettings}
      />
    </div>
  );
}

function renderColumnOrder() {
  render(<ColumnOrderHarness />);
  const list = screen.getByRole('list', { name: 'Column order' });
  const columns = new Map(
    within(list)
      .getAllByRole('button', { name: /^Drag column / })
      .map((handle) => {
        const name = handle.getAttribute('aria-label')!.replace('Drag column ', '');
        const item = handle.closest<HTMLElement>('[role="listitem"]')!;
        const label = within(item).getByRole('button', { name });
        return [name, { item, handle, label }] as const;
      }),
  );
  const labels = new Map<Element, HTMLElement>();
  for (const { item, label } of columns.values()) {
    labels.set(item, label);
    vi.spyOn(item, 'getBoundingClientRect').mockImplementation(() => {
      const index = Array.from(list.children).indexOf(item);
      return {
        top: 100 + index * 40,
        bottom: 140 + index * 40,
        height: 40,
        left: 0,
        right: 240,
        width: 240,
      } as DOMRect;
    });
  }
  const row = (name: string) => columns.get(name)!.item;
  const handle = (name: string) => columns.get(name)!.handle;
  const dataTransfer = { setData: vi.fn(), setDragImage: vi.fn(), dropEffect: '' };
  const start = (name: string) => fireEvent.dragStart(handle(name), { dataTransfer });
  const hover = (name: string, edge: 'before' | 'after') => {
    const item = row(name);
    const event = createEvent.dragOver(item, { dataTransfer });
    Object.defineProperty(event, 'clientY', {
      value: item.getBoundingClientRect().top + (edge === 'before' ? 5 : 35),
    });
    fireEvent(item, event);
  };
  const drop = () => fireEvent.drop(list, { dataTransfer });
  const order = () => Array.from(list.children, (item) => labels.get(item)!.textContent);
  return { list, row, handle, start, hover, drop, order };
}

describe('Task column drag and drop', () => {
  it('shows insertion edges and drops columns at the indicated boundary', () => {
    const { list, row, start, hover, drop, order } = renderColumnOrder();
    start('Task');
    hover('Priority', 'before');
    expect(row('Priority')).toHaveAttribute('data-drop-position', 'before');
    hover('Priority', 'after');
    expect(row('Priority')).toHaveAttribute('data-drop-position', 'after');
    expect(list.querySelectorAll('[data-drop-position]')).toHaveLength(1);
    drop();
    expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Status', 'Priority', 'Task']);
    expect(list.querySelector('[data-drop-position]')).toBeNull();

    start('Task');
    hover('Status', 'before');
    expect(row('Status')).toHaveAttribute('data-drop-position', 'before');
    drop();
    expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Task', 'Status', 'Priority']);
  });

  it('keeps leading columns and no-op drop targets unchanged', () => {
    const { list, handle, start, hover, drop, order } = renderColumnOrder();
    fireEvent.keyDown(handle('Task'), { key: 'ArrowUp' });
    expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Task', 'Status', 'Priority']);
    start('Status');
    hover('Selection', 'before');
    expect(list.querySelector('[data-drop-position]')).toBeNull();
    drop();
    expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Task', 'Status', 'Priority']);

    start('Task');
    hover('Task', 'after');
    expect(list.querySelector('[data-drop-position]')).toBeNull();
    hover('Status', 'before');
    expect(list.querySelector('[data-drop-position]')).toBeNull();
    fireEvent.dragEnd(handle('Task'));
  });

  it('clears insertion edges when leaving the list or cancelling a drag', () => {
    const { list, row, handle, start, hover, order } = renderColumnOrder();
    start('Task');
    hover('Priority', 'after');
    expect(row('Priority')).toHaveAttribute('data-drop-position', 'after');
    const leave = createEvent.dragLeave(list);
    Object.defineProperty(leave, 'clientX', { value: -1 });
    fireEvent(list, leave);
    expect(list.querySelector('[data-drop-position]')).toBeNull();
    hover('Priority', 'after');
    fireEvent.dragEnd(handle('Task'));
    expect(list.querySelector('[data-drop-position]')).toBeNull();
    expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Task', 'Status', 'Priority']);
  });
});
