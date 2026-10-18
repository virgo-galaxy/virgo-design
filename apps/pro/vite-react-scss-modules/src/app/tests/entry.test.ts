// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const { createRoot, createAppRouter, render, startMocking } = vi.hoisted(() => ({
  createRoot: vi.fn(),
  createAppRouter: vi.fn(),
  render: vi.fn(),
  startMocking: vi.fn<() => Promise<void>>(),
}));

vi.mock('react-dom/client', () => ({ createRoot }));
vi.mock('@/app', () => ({ App: () => null }));
vi.mock('@/routes/router', () => ({ createAppRouter }));
vi.mock('@/mock', () => ({ startMocking }));

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.stubEnv('VITE_API_MOCKING', 'false');
  document.body.innerHTML = '<div id="root"></div>';
  createRoot.mockReturnValue({ render });
  createAppRouter.mockReturnValue({ dispose: vi.fn() });
});

afterEach(() => vi.unstubAllEnvs());

it('starts the normal application without preparing Mock', async () => {
  await import('../../main');

  expect(startMocking).not.toHaveBeenCalled();
  expect(createAppRouter).toHaveBeenCalledExactlyOnceWith();
  expect(createRoot).toHaveBeenCalledExactlyOnceWith(document.getElementById('root'));
  expect(render).toHaveBeenCalledOnce();
});

it('waits for Mock before creating the router and rendering the application', async () => {
  vi.stubEnv('VITE_API_MOCKING', 'true');
  let ready!: () => void;
  startMocking.mockReturnValue(
    new Promise<void>((resolve) => {
      ready = resolve;
    }),
  );

  const entry = import('../../main');
  await vi.waitFor(() => expect(startMocking).toHaveBeenCalledOnce());

  expect(createAppRouter).not.toHaveBeenCalled();
  expect(render).not.toHaveBeenCalled();

  ready();
  await entry;

  expect(createAppRouter).toHaveBeenCalledExactlyOnceWith();
  expect(render).toHaveBeenCalledOnce();
});

it('does not start the application when Mock fails to initialize', async () => {
  vi.stubEnv('VITE_API_MOCKING', 'true');
  startMocking.mockRejectedValue(new Error('Mock unavailable'));

  await expect(import('../../main')).rejects.toThrow('Mock unavailable');

  expect(createAppRouter).not.toHaveBeenCalled();
  expect(render).not.toHaveBeenCalled();
});
