// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const { createRoot, createAppRouter, render, startMocking } = vi.hoisted(() => ({
  createRoot: vi.fn(),
  createAppRouter: vi.fn(),
  render: vi.fn(),
  startMocking: vi.fn<() => Promise<void>>(),
}));
vi.mock('react-dom/client', () => ({ createRoot }));
vi.mock('@/i18n/bootstrap', () => ({ initializeAppLocale: vi.fn() }));
vi.mock('@/routes/router', () => ({ createAppRouter }));
vi.mock('@/mock', () => ({ startMocking }));
vi.mock('@/store/bootstrap', () => ({ initializeAppStores: vi.fn(), disposeAppStores: vi.fn() }));

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.stubEnv('VITE_API_MOCKING', 'false');
  document.body.innerHTML = '<div id="root"></div>';
  createRoot.mockReturnValue({ render });
  createAppRouter.mockReturnValue({ dispose: vi.fn() });
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

it('starts the normal application without preparing Mock', async () => {
  await import('../../main');
  const { initialApp } = await import('../bootstrap/initialize');
  expect(await initialApp).toHaveProperty('router');
  expect(startMocking).not.toHaveBeenCalled();
  expect(createAppRouter).toHaveBeenCalledExactlyOnceWith();
  expect(createRoot).toHaveBeenCalledExactlyOnceWith(document.getElementById('root'));
  expect(render).toHaveBeenCalledOnce();
});

it('renders the application shell immediately while deferring router creation until Mock is ready', async () => {
  vi.stubEnv('VITE_API_MOCKING', 'true');
  let ready!: () => void;
  startMocking.mockReturnValue(
    new Promise<void>((resolve) => {
      ready = resolve;
    }),
  );
  await import('../../main');
  await vi.waitFor(() => expect(startMocking).toHaveBeenCalledOnce());
  expect(render).toHaveBeenCalledOnce();
  expect(createAppRouter).not.toHaveBeenCalled();
  ready();
  const { initialApp } = await import('../bootstrap/initialize');
  expect(await initialApp).toHaveProperty('router');
  expect(createAppRouter).toHaveBeenCalledExactlyOnceWith();
});

it('returns startup failures to the mounted application and allows a successful retry', async () => {
  vi.stubEnv('VITE_API_MOCKING', 'true');
  startMocking.mockRejectedValueOnce(new Error('Mock unavailable')).mockResolvedValue(undefined);
  await import('../../main');
  const { initialApp, initializeApp } = await import('../bootstrap/initialize');
  expect(await initialApp).toEqual({
    error: expect.objectContaining({ message: 'Mock unavailable' }),
  });
  expect(createAppRouter).not.toHaveBeenCalled();
  expect(render).toHaveBeenCalledOnce();
  expect(await initializeApp()).toHaveProperty('router');
  expect(createAppRouter).toHaveBeenCalledOnce();
});

it('does not import Mock while storage is denied and retries after access is restored', async () => {
  vi.stubEnv('VITE_API_MOCKING', 'true');
  const read = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new DOMException('Denied', 'SecurityError');
  });
  await import('../../main');
  const { initialApp, initializeApp, StorageUnavailableError } =
    await import('../bootstrap/initialize');
  expect(await initialApp).toEqual({ error: expect.any(StorageUnavailableError) });
  expect(startMocking).not.toHaveBeenCalled();
  expect(render).toHaveBeenCalledOnce();
  read.mockRestore();
  startMocking.mockResolvedValue(undefined);
  expect(await initializeApp()).toHaveProperty('router');
  expect(startMocking).toHaveBeenCalledOnce();
});
