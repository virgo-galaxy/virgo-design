import { http } from 'msw';

import { analyticsSnapshot } from '../fixtures/analytics';
import { projects } from '../fixtures/projects';
import { taskAssignees } from '../fixtures/tasks';
import { announcements } from '../fixtures/workplace';
import { endpoint, success } from '../response';
import { requestUser, scopedTasks } from '../session';
import { getDemoState } from '../store';
import { dailyTokenUsage, reportingDate, reportingYears, visibleRecords } from '../task-records';
import { getBackendTasks } from './tasks';
export const analyticsHandlers = [
  http.get(endpoint('/analytics/overview'), ({ request }) => {
    const state = getDemoState();
    return success(
      analyticsSnapshot(
        scopedTasks(state.tasks, request),
        reportingDate(state.records),
        visibleRecords(state.records, requestUser(request)!),
      ),
    );
  }),
  http.get(endpoint('/workplace/overview'), ({ request }) => {
    const user = requestUser(request)!;
    const visibleProjects = projects.filter((project) => user.projects.includes(project.name));
    const tasks = scopedTasks(getBackendTasks(), request);
    const records = visibleRecords(getDemoState().records, user);
    const date = reportingDate(getDemoState().records);
    const distribution = visibleProjects.map((project) => {
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
      date,
      displayDate: new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeZone: 'UTC',
      }).format(new Date(`${date}T00:00:00Z`)),
      workspace: 'Virgo Studio',
      user: {
        id: user.id,
        name: user.name,
        initials: user.name
          .split(' ')
          .map((part) => part[0])
          .join(''),
      },
      activeProjects: visibleProjects.length,
      openTasks: tasks.length - completed,
      teamMembers: taskAssignees.filter(
        (member) =>
          user.role === 'admin' ||
          visibleProjects.some((project) => project.memberIds.includes(member.id)),
      ).length,
      completionRate: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
    };
    return success({
      tokenUsage: dailyTokenUsage(records),
      tokenRecords: records,
      reportingYears: reportingYears(getDemoState().records, date),
      reportingScope:
        user.role === 'admin' ? 'workspace' : user.role === 'manager' ? 'projects' : 'personal',
      snapshot: currentSnapshot,
      metrics: [
        { icon: 'projects', value: currentSnapshot.activeProjects },
        { icon: 'tasks', value: currentSnapshot.openTasks },
        { icon: 'members', value: currentSnapshot.teamMembers },
        { icon: 'completion', value: `${currentSnapshot.completionRate}%` },
      ],
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
