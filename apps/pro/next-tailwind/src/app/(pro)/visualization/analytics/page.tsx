import { AnalyticsView } from '@/features/analytics/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="visualization.analytics">
      <AnalyticsView />
    </PageAccess>
  );
}
