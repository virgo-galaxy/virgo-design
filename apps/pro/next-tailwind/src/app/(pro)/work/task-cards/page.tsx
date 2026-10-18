import { TaskCardsView } from '@/features/tasks/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="work.task-cards">
      <TaskCardsView />
    </PageAccess>
  );
}
