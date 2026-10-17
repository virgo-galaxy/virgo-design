import { http } from 'msw';

import { requestUser, scopedTasks } from '../../auth/session';
import { getDemoState } from '../../data/store';
import { projects } from '../../fixtures/projects';
import { taskAssignees } from '../../fixtures/tasks';
import { announcements } from '../../fixtures/workplace';
import { endpoint, success } from '../../http/response';
import { reportingDate } from '../../model/task-records';

export const workspaceHandlers = [
  http.get(endpoint('/announcements'), () => success(announcements)),
  http.get(endpoint('/workspace/summary'), ({ request }) => {
    const user = requestUser(request)!;
    const visibleProjects = projects.filter((project) => user.projects.includes(project.id));
    const state = getDemoState();
    const tasks = scopedTasks(state.tasks, request);
    const completed = tasks.filter((task) => task.status === 'done').length;
    const date = reportingDate(state.records);
    return success({
      date,
      activeProjects: visibleProjects.length,
      openTasks: tasks.length - completed,
      teamMembers: taskAssignees.filter(
        (member) =>
          user.role === 'admin' ||
          visibleProjects.some((project) => project.memberIds.includes(member.id)),
      ).length,
      completionRate: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
    });
  }),
];
