import { ExceptionState } from '@/components/exception-state/ExceptionState';
export function ExceptionPage({ code }: { code: '403' | '404' | '500' }) {
  return <ExceptionState code={code} />;
}
