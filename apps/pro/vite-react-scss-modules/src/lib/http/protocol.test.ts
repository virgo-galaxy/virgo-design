import { describe, expect, it } from 'vitest';

import { isApiErrorData, isApiResponse } from './protocol';
describe('Gateway wire protocol', () => {
  it('requires code, msg and an explicit data member', () => {
    expect(isApiResponse({ code: 0, msg: 'success', data: null })).toBe(true);
    for (const value of [
      null,
      [],
      { code: 0, msg: 'success' },
      { code: NaN, msg: 'success', data: {} },
      { code: 0.5, msg: 'success', data: {} },
      { code: '0', msg: 'success', data: {} },
    ])
      expect(isApiResponse(value)).toBe(false);
  });
  it('validates all error metadata, field messages and source members', () => {
    const error = {
      detail: 'Invalid task',
      fields: { title: ['Required'] },
      source: { file: 'task.go', function: 'CreateTask', line: 12 },
      timestamp: '2026-10-03T00:00:00Z',
    };
    expect(isApiErrorData(error)).toBe(true);
    for (const update of [
      { timestamp: 'not a timestamp' },
      { detail: 42 },
      { fields: { title: 'Required' } },
      { fields: { title: [42] } },
      { source: [] },
      { source: { line: '12' } },
      { source: { line: NaN } },
      { source: { function: false } },
    ])
      expect(isApiErrorData({ ...error, ...update })).toBe(false);
  });
});
