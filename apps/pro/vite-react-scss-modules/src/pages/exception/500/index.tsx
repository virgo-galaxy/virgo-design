import { ExceptionState } from '@/components/feedback/exception-state';

export default function ServerErrorPage() {
  return <ExceptionState code="500" />;
}
