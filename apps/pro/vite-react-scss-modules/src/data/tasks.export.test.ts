import { describe, expect, it } from 'vitest';

import { createTasksCsv } from './tasks.export';
import { initialTaskState } from './tasks.seed';

describe('task CSV export', () => {
  const task = initialTaskState.tasks[0]!;

  it('exports all supplied records with readable owners and empty optional dates', () => {
    const csv = createTasksCsv(initialTaskState.tasks);
    expect(csv.startsWith('\uFEFF"ID","Task"')).toBe(true);
    expect(csv.trim().split('\r\n')).toHaveLength(17);
    expect(csv).toContain('"Nina Wu"');
    expect(csv).toContain('"VD-123"');
    expect(csv).toContain('"Estimate (h)","Created at"');
    expect(csv).toContain('"4","2026-10-01T03:20:00Z"');
    expect(createTasksCsv([{ ...task, dueDate: '' }])).toContain('"Nina Wu","",');
  });

  it('preserves Unicode, commas, quotes and multiline descriptions', () => {
    const csv = createTasksCsv([
      { ...task, title: '验证, "发布"', description: 'First line\nSecond line' },
    ]);
    expect(csv).toContain('"验证, ""发布"""');
    expect(csv).toContain('"First line\nSecond line"');
  });

  it('exports the supplied filtered set and keeps formula-like titles as text', () => {
    const csv = createTasksCsv([{ ...task, title: '=SUM(1,2)' }]);
    expect(csv).toContain('"\'=SUM(1,2)"');
    expect(csv).not.toContain('VD-137');
    expect(csv.trim().split('\r\n')).toHaveLength(2);
  });
});
