import { describe, expect, it } from 'vitest';

import { i18nInstance } from '@/i18n/runtime';
import { taskAssignees } from '@/mock/fixtures/tasks';
import { initialTaskState } from '@/mock/fixtures/tasks';
import { getTaskExportLabels } from '@/pages/tasks/task-presentation';

import { createTasksCsv } from './tasks.export';

describe('task CSV export', () => {
  const task = initialTaskState.tasks[0]!;
  const labels = getTaskExportLabels(i18nInstance.getFixedT('en-US'));

  it('exports all supplied records with readable owners and empty optional dates', () => {
    const csv = createTasksCsv(initialTaskState.tasks, taskAssignees, labels);
    expect(csv.startsWith('\uFEFF"ID","Task"')).toBe(true);
    expect(csv.trim().split('\r\n')).toHaveLength(initialTaskState.tasks.length + 1);
    expect(csv).toContain('"Nina Wu"');
    expect(csv).toContain('"Todo","Urgent"');
    const chinese = getTaskExportLabels(i18nInstance.getFixedT('zh-CN'));
    expect(createTasksCsv([task], taskAssignees, chinese)).toContain('"待办","紧急"');
    expect(task.status).toBe('todo');
    expect(task.priority).toBe('urgent');
    expect(csv).toContain('"VD-123"');
    expect(csv).toContain('"Estimate (h)","Created at"');
    expect(csv).toContain('"4","2026-10-01T03:20:00Z"');
    expect(createTasksCsv([{ ...task, dueDate: '' }], taskAssignees, labels)).toContain(
      '"Nina Wu","",',
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
    expect(csv).not.toContain('VD-137');
    expect(csv.trim().split('\r\n')).toHaveLength(2);
  });
});
