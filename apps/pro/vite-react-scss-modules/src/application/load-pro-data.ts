import { getProjects, getTaskMetadata } from '@/api';
// Only the shared task catalog is grouped. Reports, profile and workflows own their failures.
export async function loadProData(signal: AbortSignal) {
  const [metadata, projects] = await Promise.all([getTaskMetadata(signal), getProjects(signal)]);
  return { metadata, projects };
}
