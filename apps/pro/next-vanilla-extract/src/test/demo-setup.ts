import { beforeEach, vi } from 'vitest';

import { resetSession } from './demo-session';

vi.mock('@/server/demo/runtime/context', async (original) => {
  const actual = await original<typeof import('@/server/demo/runtime/context')>();
  const context: import('@/server/demo/runtime/context').DemoContext = {
    sandbox: actual.createDemoSandbox(),
    changes: new Set(),
  };
  actual.demoRuntime.sandboxes.set('test-browser', context.sandbox);
  const getDemoContext = () => {
    const current = actual.demoRuntime.context.getStore() ?? context;
    current.sandbox.touchedAt = Date.now();
    return current;
  };
  return { ...actual, getDemoContext, getDemoSandbox: () => getDemoContext().sandbox };
});
vi.stubEnv('NEXT_PUBLIC_DEMO_API', 'true');
vi.setSystemTime(new Date('2026-10-05T12:00:00Z'));
beforeEach(() => {
  vi.setSystemTime(new Date('2026-10-05T12:00:00Z'));
  resetSession();
});
