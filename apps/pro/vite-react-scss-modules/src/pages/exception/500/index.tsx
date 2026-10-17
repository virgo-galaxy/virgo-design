import { ExceptionState } from '@/components/exception-state/ExceptionState';

export default function ServerErrorPage() {
  return <ExceptionState code="500" />;
}
