import { WorkplaceView } from '@/features/workplace/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="dashboard.workplace">
      <WorkplaceView />
    </PageAccess>
  );
}
