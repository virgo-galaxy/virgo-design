import { ExceptionState } from '@/components/feedback/exception-state';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="exception.403">
      <ExceptionState code="403" />
    </PageAccess>
  );
}
