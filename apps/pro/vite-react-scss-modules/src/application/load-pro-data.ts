import {
  getAnalyticsOverview,
  getProfile,
  getProjects,
  getTaskMetadata,
  getWorkflowHistory,
  getWorkplaceOverview,
  type TaskDto,
} from '@/api';
export async function loadProData(signal: AbortSignal) {
  const [metadata, profile, projects, analytics, workplace, workflows] = await Promise.all([
    getTaskMetadata(signal),
    getProfile(signal),
    getProjects(signal),
    getAnalyticsOverview(signal),
    getWorkplaceOverview(signal),
    getWorkflowHistory(signal),
  ]);
  return { tasks: [] as TaskDto[], metadata, profile, projects, analytics, workplace, workflows };
}
