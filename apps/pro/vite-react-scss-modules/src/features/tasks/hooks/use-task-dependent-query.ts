import { useRemoteData } from '@/hooks/async/use-remote-data';
import { useResourceRevision } from '@/store/resources';

export function useTaskDependentQuery<T>(load: (signal: AbortSignal) => Promise<T>, key?: string) {
  const revision = useResourceRevision('tasks');
  return useRemoteData(load, { key, revision });
}
