import { ExceptionState } from '@/components/feedback/exception-state';

export default function ForbiddenPage() {
  return <ExceptionState code="403" />;
}
