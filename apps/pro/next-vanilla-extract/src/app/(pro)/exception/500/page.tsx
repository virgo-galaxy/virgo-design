import { ExceptionState } from '@/components/feedback/exception-state';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="exception.500">
      <ExceptionState code="500" />
    </PageAccess>
  );
}
