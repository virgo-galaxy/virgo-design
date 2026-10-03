import {
  getAnalyticsOverview,
  getProfile,
  getProjects,
  getTaskMetadata,
  getWorkflowHistory,
  getWorkplaceOverview,
} from '@/api';

import { getAllTasks } from './task-queries';
export async function loadProData(signal: AbortSignal) {
  const [tasks, metadata, profile, projects, analytics, workplace, workflows] = await Promise.all([
    getAllTasks({}, signal),
    getTaskMetadata(signal),
    getProfile(signal),
    getProjects(signal),
    getAnalyticsOverview(signal),
    getWorkplaceOverview(signal),
    getWorkflowHistory(signal),
  ]);
  return { tasks, metadata, profile, projects, analytics, workplace, workflows };
}
