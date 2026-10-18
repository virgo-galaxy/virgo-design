import { ExceptionState } from '@/components/feedback/exception-state';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="exception.404">
      <ExceptionState code="404" />
    </PageAccess>
  );
}
