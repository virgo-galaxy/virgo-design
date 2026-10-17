import { getProjects } from '@/api/projects';
import { getTaskMetadata } from '@/api/tasks';

export async function loadCatalog(signal: AbortSignal) {
  const [metadata, projects] = await Promise.all([getTaskMetadata(signal), getProjects(signal)]);

  return { metadata, projects };
}
