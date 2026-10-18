import 'server-only';

import { requestUser, scopedTasks } from '../../auth/session';
import { getDemoState } from '../../data/store';
import { demoDate } from '../../fixtures/dates';
import { projects } from '../../fixtures/projects';
import { success } from '../../http/response';
import {
  deliveryTrend,
  ownerCapacity,
  projectDelivery,
  recentActivity,
  taskStatusSummary,
} from '../../model/analytics';
import { dailyTokenUsage, reportingYears, visibleRecords } from '../../model/task-records';
import type { DemoHandler } from '../../route';

export const getActivity: DemoHandler = ({ request }) => {
  const state = getDemoState();
  const projectId = new URL(request.url).searchParams.get('projectId');
  const tasks = scopedTasks(state.tasks, request).filter(
    (task) => !projectId || task.project === projectId,
  );
  const records = visibleRecords(state.records, requestUser(request)!).filter(
    (record) => !projectId || record.project === projectId,
  );

  return success(recentActivity(tasks, records));
};

export const getAnalyticsDeliveryTrend: DemoHandler = ({ request }) => {
  const state = getDemoState();

  return success(deliveryTrend(scopedTasks(state.tasks, request), demoDate()));
};

export const getAnalyticsProjectDelivery: DemoHandler = ({ request }) => {
  const state = getDemoState();

  return success(
    projectDelivery(scopedTasks(state.tasks, request), demoDate(), requestUser(request)!.projects),
  );
};

export const getAnalyticsTaskStatus: DemoHandler = ({ request }) =>
  success(taskStatusSummary(scopedTasks(getDemoState().tasks, request)));

export const getAnalyticsOwnerCapacity: DemoHandler = ({ request }) =>
  success(
    ownerCapacity(scopedTasks(getDemoState().tasks, request), [
      ...new Set(
        projects
          .filter((project) => requestUser(request)!.projects.includes(project.id))
          .flatMap((project) => project.memberIds),
      ),
    ]),
  );

export const getAnalyticsTokenUsage: DemoHandler = ({ request }) => {
  const user = requestUser(request)!;
  const state = getDemoState();
  const records = visibleRecords(state.records, user);
  const referenceDate = demoDate();

  return success({
    referenceDate,
    tokenUsage: dailyTokenUsage(records),
    tokenRecords: records,
    reportingYears: reportingYears(state.records, referenceDate),
    reportingScope:
      user.role === 'admin' ? 'workspace' : user.role === 'manager' ? 'projects' : 'personal',
  });
};
