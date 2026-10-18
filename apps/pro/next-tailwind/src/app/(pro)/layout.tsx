import type { ReactNode } from 'react';

import { ProtectedLayout } from '@/routes/components/ProtectedLayout';
export default function ProLayout({ children }: { children: ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
