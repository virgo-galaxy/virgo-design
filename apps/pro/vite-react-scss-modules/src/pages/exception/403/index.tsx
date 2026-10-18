import { ExceptionState } from '@/components/exception-state';

export default function ForbiddenPage() {
  return <ExceptionState code="403" />;
}
