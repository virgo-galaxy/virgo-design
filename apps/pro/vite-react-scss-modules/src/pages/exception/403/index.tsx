import { ExceptionState } from '@/components/exception-state/ExceptionState';

export default function ForbiddenPage() {
  return <ExceptionState code="403" />;
}
