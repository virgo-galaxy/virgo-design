import { WorkflowResultView } from '@/features/handoff/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="result.success">
      <WorkflowResultView outcome="success" />
    </PageAccess>
  );
}
