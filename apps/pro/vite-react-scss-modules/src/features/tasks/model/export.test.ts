import { describe, expect, it } from 'vitest';

import { i18nInstance } from '@/i18n';
import { initialTaskState, taskAssignees } from '@/mock/fixtures/tasks';

import { taskStatusLabelNames } from '../presentation/task-presentation';
import { createTasksCsv } from './export';
import type { Task } from './task';

describe('task CSV export', () => {
  const task = initialTaskState.tasks[0]!;
  const labels = {
    status: (code: Task['status']) =>
      i18nInstance.t(`tasks.statusLabels.${taskStatusLabelNames[code]}`, { lng: 'en-US' }),
    priority: (code: Task['priority']) =>
      i18nInstance.t(`tasks.priorityLabels.${code}`, { lng: 'en-US' }),
  };

  it('exports all supplied records with readable owners and empty optional dates', () => {
    const csv = createTasksCsv(initialTaskState.tasks, taskAssignees, labels);
    expect(csv.startsWith('\uFEFF"ID","Task"')).toBe(true);
    expect(csv.trim().split('\r\n')).toHaveLength(initialTaskState.tasks.length + 1);
    expect(csv).toContain('"Nina Wu"');
    expect(csv).toContain('"Todo","Urgent"');
    const chinese = {
      status: (code: Task['status']) =>
        i18nInstance.t(`tasks.statusLabels.${taskStatusLabelNames[code]}`, { lng: 'zh-CN' }),
      priority: (code: Task['priority']) =>
        i18nInstance.t(`tasks.priorityLabels.${code}`, { lng: 'zh-CN' }),
    };
    expect(createTasksCsv([task], taskAssignees, chinese)).toContain('"待办","紧急"');
    expect(task.status).toBe('todo');
    expect(task.priority).toBe('urgent');
    expect(csv).toContain('"04a7780b-584a"');
    expect(csv).toContain('"Estimate (h)","Created at","Completed at"');
    expect(csv).toContain(
      JSON.stringify(initialTaskState.tasks.find((task) => task.completedAt)!.completedAt),
    );
    expect(csv).toContain('"3","2026-10-01T03:20:00.000Z"');
    expect(createTasksCsv([{ ...task, dueDate: '' }], taskAssignees, labels)).toContain(
      '"Anika Rao","",',
    );
  });

  it('preserves Unicode, commas, quotes and multiline descriptions', () => {
    const csv = createTasksCsv(
      [{ ...task, title: '验证, "发布"', description: 'First line\nSecond line' }],
      taskAssignees,
      labels,
    );
    expect(csv).toContain('"验证, ""发布"""');
    expect(csv).toContain('"First line\nSecond line"');
  });

  it('exports the supplied filtered set and keeps formula-like titles as text', () => {
    const csv = createTasksCsv([{ ...task, title: '=SUM(1,2)' }], taskAssignees, labels);
    expect(csv).toContain('"\'=SUM(1,2)"');
    expect(csv).not.toContain('abb01fb9-ab2f');
    expect(csv.trim().split('\r\n')).toHaveLength(2);
  });
});
