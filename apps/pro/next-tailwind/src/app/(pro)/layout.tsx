import type { ReactNode } from 'react';

import { DemoResetAction } from '@/demo/react';
import { ProtectedLayout } from '@/routes/components/ProtectedLayout';

export default function ProLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedLayout
      settingsActions={process.env.NEXT_PUBLIC_DEMO_API === 'true' ? <DemoResetAction /> : null}
    >
      {children}
    </ProtectedLayout>
  );
}
