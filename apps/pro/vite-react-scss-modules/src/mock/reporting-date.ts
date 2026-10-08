import { type DemoState, getDemoState } from './store';
import { reportingDate } from './task-records';
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
