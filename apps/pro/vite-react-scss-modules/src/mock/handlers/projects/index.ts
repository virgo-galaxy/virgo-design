import { http } from 'msw';

import { API_ERROR_CODES } from '@/api/gateway/constants';
import type { ProjectSummaryDto } from '@/api/projects/types';

import { requestUser, scopedTasks } from '../../auth/session';
import { getDemoReferenceDate } from '../../data/reporting-date';
import { getDemoState } from '../../data/store';
import { projects } from '../../fixtures/projects';
import { endpoint, failure, success } from '../../http/response';

function projectFor(request: Request, id: unknown) {
  return projects.find(
    (project) => project.id === id && requestUser(request)?.projects.includes(project.id),
  );
}

const missingProject = () =>
  failure({ status: 404, code: API_ERROR_CODES.PROJECT_NOT_FOUND, detail: 'Project not found' });

function summarizeProject(
  projectId: string,
  tasks: readonly import('@/api/tasks/types').TaskDto[],
): ProjectSummaryDto {
  const date = getDemoReferenceDate();
  const related = tasks.filter((task) => task.project === projectId);
  const completed = related.filter((task) => task.status === 'done').length;

  return {
    projectId,
    total: related.length,
    completed,
    open: related.length - completed,
    progress: related.length ? Math.round((completed / related.length) * 100) : 0,
    hours: related.reduce((sum, task) => sum + task.estimateHours, 0),
    overdue: related.filter((task) => task.status !== 'done' && task.dueDate && task.dueDate < date)
      .length,
    review: related.filter((task) => task.status === 'in_review').length,
  };
}

export const projectsHandlers = [
  http.get(endpoint('/projects/:id/summary'), ({ request, params }) => {
    const project = projectFor(request, params.id);

    return project
      ? success(summarizeProject(project.id, scopedTasks(getDemoState().tasks, request)))
      : missingProject();
  }),
  http.get(endpoint('/projects/distribution'), ({ request }) => {
    const user = requestUser(request)!;
    const open = scopedTasks(getDemoState().tasks, request).filter(
      (task) => task.status !== 'done',
    );

    return success(
      projects
        .filter((project) => user.projects.includes(project.id))
        .map((project) => {
          const count = open.filter((task) => task.project === project.id).length;

          return {
            projectId: project.id,
            name: project.name,
            color: project.color,
            count,
            share: open.length ? Math.round((count / open.length) * 100) : 0,
          };
        }),
    );
  }),
  http.get(endpoint('/projects/summaries'), ({ request }) => {
    const user = requestUser(request)!;
    const projectId = new URL(request.url).searchParams.get('projectId');

    const tasks = scopedTasks(getDemoState().tasks, request);

    return success(
      projects
        .filter(
          (project) =>
            user.projects.includes(project.id) && (!projectId || project.id === projectId),
        )
        .map((project) => summarizeProject(project.id, tasks)),
    );
  }),
  http.get(endpoint('/projects/:id/module-stats'), ({ request, params }) => {
    const project = projectFor(request, params.id);

    if (!project) return missingProject();

    const tasks = scopedTasks(getDemoState().tasks, request).filter(
      (task) => task.project === project.id,
    );

    return success(
      project.modules.map((module) => ({
        id: module.id,
        total: tasks.filter((task) => task.module === module.id).length,
        completed: tasks.filter((task) => task.module === module.id && task.status === 'done')
          .length,
      })),
    );
  }),
  http.get(endpoint('/projects/:id/member-stats'), ({ request, params }) => {
    const project = projectFor(request, params.id);

    if (!project) return missingProject();

    const tasks = scopedTasks(getDemoState().tasks, request).filter(
      (task) => task.project === project.id,
    );

    return success(
      project.memberIds.map((memberId) => ({
        memberId,
        count: tasks.filter((task) => task.assignee === memberId).length,
      })),
    );
  }),
  http.get(endpoint('/projects'), ({ request }) =>
    success(projects.filter((project) => requestUser(request)?.projects.includes(project.id))),
  ),
];
