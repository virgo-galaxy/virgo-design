import { ExceptionState } from '@/components/exception-state';

export default function ServerErrorPage() {
  return <ExceptionState code="500" />;
}
