import { TasksView } from '@/features/tasks/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="work.tasks">
      <TasksView />
    </PageAccess>
  );
}
