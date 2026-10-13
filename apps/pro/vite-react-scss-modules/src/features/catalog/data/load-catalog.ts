import { getProjects } from '@/api/projects';
import { getTaskMetadata } from '@/api/tasks';
// Only the shared task catalog is grouped. Reports, profile and workflows own their failures.
export async function loadCatalog(signal: AbortSignal) {
  const [metadata, projects] = await Promise.all([getTaskMetadata(signal), getProjects(signal)]);
  return { metadata, projects };
}
