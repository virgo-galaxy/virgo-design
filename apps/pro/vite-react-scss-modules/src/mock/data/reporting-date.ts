import type { DemoState } from '../model/state';
import { reportingDate } from '../model/task-records';
import { getDemoState } from './store';
let previous: DemoState | undefined;
let date = '';
export function getDemoReferenceDate() {
  const state = getDemoState();
  if (state !== previous) {
    previous = state;
    date = reportingDate(state.records);
  }
  return date;
}
