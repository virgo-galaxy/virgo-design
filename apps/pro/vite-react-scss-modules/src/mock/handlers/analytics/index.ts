import { http } from 'msw';

import { requestUser, scopedTasks } from '../../auth/session';
import { getDemoState } from '../../data/store';
import { projects } from '../../fixtures/projects';
import { endpoint, success } from '../../http/response';
import {
  deliveryTrend,
  ownerCapacity,
  projectDelivery,
  recentActivity,
  taskStatusSummary,
} from '../../model/analytics';
import {
  dailyTokenUsage,
  reportingDate,
  reportingYears,
  visibleRecords,
} from '../../model/task-records';

export const analyticsHandlers = [
  http.get(endpoint('/activity'), ({ request }) => {
    const state = getDemoState();
    const projectId = new URL(request.url).searchParams.get('projectId');
    const tasks = scopedTasks(state.tasks, request).filter(
      (task) => !projectId || task.project === projectId,
    );
    const records = visibleRecords(state.records, requestUser(request)!).filter(
      (record) => !projectId || record.project === projectId,
    );

    return success(recentActivity(tasks, records));
  }),
  http.get(endpoint('/analytics/delivery-trend'), ({ request }) => {
    const state = getDemoState();

    return success(deliveryTrend(scopedTasks(state.tasks, request), reportingDate(state.records)));
  }),
  http.get(endpoint('/analytics/project-delivery'), ({ request }) => {
    const state = getDemoState();

    return success(
      projectDelivery(
        scopedTasks(state.tasks, request),
        reportingDate(state.records),
        requestUser(request)!.projects,
      ),
    );
  }),
  http.get(endpoint('/analytics/task-status'), ({ request }) =>
    success(taskStatusSummary(scopedTasks(getDemoState().tasks, request))),
  ),
  http.get(endpoint('/analytics/owner-capacity'), ({ request }) =>
    success(
      ownerCapacity(scopedTasks(getDemoState().tasks, request), [
        ...new Set(
          projects
            .filter((project) => requestUser(request)!.projects.includes(project.id))
            .flatMap((project) => project.memberIds),
        ),
      ]),
    ),
  ),
  http.get(endpoint('/analytics/token-usage'), ({ request }) => {
    const user = requestUser(request)!;
    const state = getDemoState();
    const records = visibleRecords(state.records, user);
    const referenceDate = reportingDate(state.records);

    return success({
      referenceDate,
      tokenUsage: dailyTokenUsage(records),
      tokenRecords: records,
      reportingYears: reportingYears(state.records, referenceDate),
      reportingScope:
        user.role === 'admin' ? 'workspace' : user.role === 'manager' ? 'projects' : 'personal',
    });
  }),
];
