// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { createMemoryRouter } from 'react-router';
import { beforeEach, expect, it, vi } from 'vitest';

import { App } from '../root/App';

const { enableMocking, createAppRouter } = vi.hoisted(() => ({
  enableMocking: vi.fn<() => Promise<void>>(),
  createAppRouter: vi.fn<typeof createMemoryRouter>(),
}));

vi.mock('../bootstrap/initialize', () => ({}));
vi.mock('@/mock', () => ({ enableMocking }));
vi.mock('../router/router', () => ({ createAppRouter }));

const disposals: ReturnType<typeof vi.spyOn>[] = [];
beforeEach(() => {
  vi.resetAllMocks();
  disposals.length = 0;
  createAppRouter.mockImplementation(() => {
    const router = createMemoryRouter([{ path: '*', element: <p>Application router ready</p> }]);
    disposals.push(vi.spyOn(router, 'dispose'));
    return router;
  });
});

it('waits for transport bootstrap before starting the router and disposes every StrictMode instance', async () => {
  let ready!: () => void;
  enableMocking.mockReturnValue(new Promise<void>((resolve) => (ready = resolve)));
  const view = render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  expect(createAppRouter).not.toHaveBeenCalled();
  expect(screen.queryByText('Application router ready')).toBeNull();
  await act(async () => ready());
  expect(await screen.findByText('Application router ready')).toBeInTheDocument();
  expect(disposals.length).toBeGreaterThan(0);
  view.unmount();
  for (const dispose of disposals) expect(dispose).toHaveBeenCalledExactlyOnceWith();
});

it('keeps the router stopped after bootstrap failure and starts it after retry', async () => {
  enableMocking.mockRejectedValueOnce(new Error('Transport unavailable')).mockResolvedValue();
  const view = render(<App />);
  const retry = await screen.findByRole('button', { name: 'Retry' });
  expect(createAppRouter).not.toHaveBeenCalled();
  fireEvent.click(retry);
  expect(await screen.findByText('Application router ready')).toBeInTheDocument();
  view.unmount();
  for (const dispose of disposals) expect(dispose).toHaveBeenCalledExactlyOnceWith();
});
