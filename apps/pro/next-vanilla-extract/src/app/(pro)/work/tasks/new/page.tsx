import { TaskWorkspaceView } from '@/features/tasks/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="work.tasks.new">
      <TaskWorkspaceView mode="create" />
    </PageAccess>
  );
}
