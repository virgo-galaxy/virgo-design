import { WorkflowResultView } from '@/features/handoff/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="result.error">
      <WorkflowResultView outcome="error" />
    </PageAccess>
  );
}
