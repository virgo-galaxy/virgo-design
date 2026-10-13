import { http } from 'msw';

import type { ProjectOverviewDto } from '@/api/projects';

import { requestUser, scopedTasks } from '../../auth/session';
import { getDemoReferenceDate } from '../../data/reporting-date';
import { getDemoState } from '../../data/store';
import { analyticsSnapshot } from '../../fixtures/analytics';
import { projects } from '../../fixtures/projects';
import { endpoint, success } from '../../http/response';
import { visibleRecords } from '../../model/task-records';
export const projectsHandlers = [
  http.get(endpoint('/projects/overview'), ({ request }) => {
    const user = requestUser(request)!;
    const projectId = new URL(request.url).searchParams.get('projectId');
    const state = getDemoState();
    const tasks = scopedTasks(state.tasks, request);
    const records = visibleRecords(state.records, user);
    const date = getDemoReferenceDate();
    return success(
      projects
        .filter(
          (project) =>
            user.projects.includes(project.id) && (!projectId || project.id === projectId),
        )
        .map((project): ProjectOverviewDto => {
          const related = tasks.filter((task) => task.project === project.id);
          const completed = related.filter((task) => task.status === 'done').length;
          return {
            projectId: project.id,
            total: related.length,
            completed,
            open: related.length - completed,
            progress: related.length ? Math.round((completed / related.length) * 100) : 0,
            hours: related.reduce((sum, task) => sum + task.estimateHours, 0),
            overdue: related.filter(
              (task) => task.status !== 'done' && task.dueDate && task.dueDate < date,
            ).length,
            review: related.filter((task) => task.status === 'in_review').length,
            modules: project.modules.map((module) => ({
              id: module.id,
              total: related.filter((task) => task.module === module.id).length,
              completed: related.filter(
                (task) => task.module === module.id && task.status === 'done',
              ).length,
            })),
            memberTaskCounts: Object.fromEntries(
              project.memberIds.map((id) => [
                id,
                related.filter((task) => task.assignee === id).length,
              ]),
            ),
            tasks: related.slice(0, 8),
            activity: analyticsSnapshot(
              related,
              date,
              records.filter((record) => record.project === project.id),
            ).activity,
          };
        }),
    );
  }),
  http.get(endpoint('/projects'), ({ request }) =>
    success(projects.filter((project) => requestUser(request)?.projects.includes(project.id))),
  ),
];
