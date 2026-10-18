import { ProjectDetailView } from '@/features/projects/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="work.projects.[projectId]">
      <ProjectDetailView />
    </PageAccess>
  );
}
