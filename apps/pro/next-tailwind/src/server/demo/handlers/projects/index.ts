import 'server-only';

import { API_ERROR_CODES } from '@/api/gateway/constants';
import type { ProjectSummaryDto } from '@/api/projects/types';

import { requestUser, scopedTasks } from '../../auth/session';
import { getDemoState } from '../../data/store';
import { demoDate } from '../../fixtures/dates';
import { createProjects } from '../../fixtures/projects';
import { failure, success } from '../../http/response';
import type { DemoHandler } from '../../route';

function projectFor(request: Request, id: unknown) {
  return createProjects().find(
    (project) => project.id === id && requestUser(request)?.projects.includes(project.id),
  );
}

const missingProject = () =>
  failure({ status: 404, code: API_ERROR_CODES.PROJECT_NOT_FOUND, detail: 'Project not found' });

function summarizeProject(
  projectId: string,
  tasks: readonly import('@/api/tasks/types').TaskDto[],
): ProjectSummaryDto {
  const date = demoDate();
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

export const getProjectsIdSummary: DemoHandler = ({ request, params }) => {
  const project = projectFor(request, params.id);

  return project
    ? success(summarizeProject(project.id, scopedTasks(getDemoState().tasks, request)))
    : missingProject();
};

export const getProjectsDistribution: DemoHandler = ({ request }) => {
  const user = requestUser(request)!;
  const open = scopedTasks(getDemoState().tasks, request).filter((task) => task.status !== 'done');

  return success(
    createProjects()
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
};

export const getProjectsSummaries: DemoHandler = ({ request }) => {
  const user = requestUser(request)!;
  const projectId = new URL(request.url).searchParams.get('projectId');

  const tasks = scopedTasks(getDemoState().tasks, request);

  return success(
    createProjects()
      .filter(
        (project) => user.projects.includes(project.id) && (!projectId || project.id === projectId),
      )
      .map((project) => summarizeProject(project.id, tasks)),
  );
};

export const getProjectsIdModuleStats: DemoHandler = ({ request, params }) => {
  const project = projectFor(request, params.id);

  if (!project) return missingProject();

  const tasks = scopedTasks(getDemoState().tasks, request).filter(
    (task) => task.project === project.id,
  );

  return success(
    project.modules.map((module) => ({
      id: module.id,
      total: tasks.filter((task) => task.module === module.id).length,
      completed: tasks.filter((task) => task.module === module.id && task.status === 'done').length,
    })),
  );
};

export const getProjectsIdMemberStats: DemoHandler = ({ request, params }) => {
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
};

export const getProjects: DemoHandler = ({ request }) =>
  success(
    createProjects().filter((project) => requestUser(request)?.projects.includes(project.id)),
  );
