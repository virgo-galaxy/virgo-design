import { ProjectHandoffView } from '@/features/handoff/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="work.projects.[projectId].handoff">
      <ProjectHandoffView />
    </PageAccess>
  );
}
