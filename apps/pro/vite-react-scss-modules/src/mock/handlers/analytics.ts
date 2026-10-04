import { http } from 'msw';

import { projectDelivery } from '../fixtures/analytics';
import { projects } from '../fixtures/projects';
import { taskAssignees } from '../fixtures/tasks';
import {
  activity,
  announcements,
  metrics,
  snapshot,
  tokenUsage,
  trendPoints,
} from '../fixtures/workplace';
import { endpoint, success } from '../response';
import { getBackendTasks } from './tasks';
export const analyticsHandlers = [
  http.get(endpoint('/analytics/overview'), () =>
    success({ trendPoints, projectDelivery, activity }),
  ),
  http.get(endpoint('/workplace/overview'), () => {
    const tasks = getBackendTasks();
    const distribution = projects.map((project) => {
      const count = tasks.filter(
        (task) => task.project === project.name && task.status !== 'done',
      ).length;
      return {
        name: project.name,
        count,
        share: tasks.some((task) => task.status !== 'done')
          ? Math.round((count / tasks.filter((task) => task.status !== 'done').length) * 100)
          : 0,
        color: project.color,
      };
    });
    const completed = tasks.filter((task) => task.status === 'done').length;
    const currentSnapshot = {
      ...snapshot,
      activeProjects: projects.length,
      openTasks: tasks.length - completed,
      teamMembers: taskAssignees.length,
      completionRate: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
    };
    return success({
      tokenUsage,
      snapshot: currentSnapshot,
      metrics: metrics.map((metric) => ({
        ...metric,
        value:
          metric.icon === 'projects'
            ? currentSnapshot.activeProjects
            : metric.icon === 'tasks'
              ? currentSnapshot.openTasks
              : metric.icon === 'members'
                ? currentSnapshot.teamMembers
                : `${currentSnapshot.completionRate}%`,
      })),
      projectDistribution: distribution,
      recentTasks: tasks.slice(0, 6).map((task) => ({
        id: task.id,
        title: task.title,
        project: task.project,
        status: task.status,
        priority: task.priority,
        assignee: taskAssignees.find((member) => member.id === task.assignee) ?? {
          id: '',
          name: 'Unassigned',
          initials: '?',
        },
        due: task.dueDate,
      })),
      announcements,
    });
  }),
];
