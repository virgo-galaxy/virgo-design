// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { beforeEach, expect, it, vi } from 'vitest';

import { installNavigationBridge } from './bootstrap';
import { useNavigationContext } from './context';
import { NavigationProvider } from './NavigationProvider';
import { useNavigationBlocker } from './use-navigation-blocker';

function Editor({ onNavigate }: { onNavigate: () => void }) {
  const [dirty, setDirty] = useState(false);
  const guard = useNavigationBlocker(
    ({ currentLocation, nextLocation }) =>
      dirty &&
      (currentLocation.pathname !== nextLocation.pathname ||
        currentLocation.search !== nextLocation.search),
  );
  const { request } = useNavigationContext();
  return (
    <>
      <button onClick={() => setDirty(true)}>Edit</button>
      <button onClick={() => request('/work/projects', onNavigate)}>Projects</button>
      <button onClick={() => request(window.location.pathname + '#section', onNavigate)}>
        Section
      </button>
      {guard.state === 'blocked' ? (
        <div role="dialog">
          <button onClick={guard.reset}>Keep editing</button>
          <button onClick={guard.proceed}>Discard</button>
        </div>
      ) : null}
    </>
  );
}

beforeEach(() => {
  installNavigationBridge();
  window.history.replaceState({}, '', '/work/tasks/1/edit');
});
it('navigates immediately when a draft is unchanged', () => {
  const navigate = vi.fn();
  render(
    <NavigationProvider>
      <Editor onNavigate={navigate} />
    </NavigationProvider>,
  );
  fireEvent.click(screen.getByText('Projects'));
  expect(navigate).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole('dialog')).toBeNull();
});
it('keeps the draft when cancelled and performs the queued navigation once after confirmation', () => {
  const navigate = vi.fn();
  render(
    <NavigationProvider>
      <Editor onNavigate={navigate} />
    </NavigationProvider>,
  );
  fireEvent.click(screen.getByText('Edit'));
  fireEvent.click(screen.getByText('Projects'));
  expect(navigate).not.toHaveBeenCalled();
  fireEvent.click(screen.getByText('Keep editing'));
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(navigate).not.toHaveBeenCalled();
  fireEvent.click(screen.getByText('Projects'));
  fireEvent.click(screen.getByText('Discard'));
  expect(navigate).toHaveBeenCalledTimes(1);
});
it('allows hash navigation without discarding a dirty form', () => {
  const navigate = vi.fn();
  render(
    <NavigationProvider>
      <Editor onNavigate={navigate} />
    </NavigationProvider>,
  );
  fireEvent.click(screen.getByText('Edit'));
  fireEvent.click(screen.getByText('Section'));
  expect(navigate).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole('dialog')).toBeNull();
});
it('restores a blocked browser back transition and replays it after confirmation', async () => {
  window.history.replaceState({}, '', '/work/tasks');
  render(
    <NavigationProvider>
      <Editor onNavigate={() => {}} />
    </NavigationProvider>,
  );
  window.history.pushState({ __NA: true }, '', '/work/tasks/1/edit');
  fireEvent.click(screen.getByText('Edit'));
  await act(async () => window.history.back());
  await screen.findByRole('dialog');
  await waitFor(() => expect(window.location.pathname).toBe('/work/tasks/1/edit'));
  fireEvent.click(screen.getByText('Discard'));
  await waitFor(() => expect(window.location.pathname).toBe('/work/tasks'));
});

it('intercepts a dirty traversal before a framework listener registered ahead of the provider', async () => {
  const framework = vi.fn();
  window.addEventListener('popstate', framework);
  try {
    window.history.replaceState({}, '', '/work/tasks');
    render(
      <NavigationProvider>
        <Editor onNavigate={() => {}} />
      </NavigationProvider>,
    );
    window.history.pushState({ __NA: true }, '', '/work/tasks/1/edit');
    fireEvent.click(screen.getByText('Edit'));
    await act(async () => window.history.back());
    await screen.findByRole('dialog');
    await waitFor(() => expect(window.location.pathname).toBe('/work/tasks/1/edit'));
    expect(framework).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('Discard'));
    await waitFor(() => expect(framework).toHaveBeenCalledTimes(1));
  } finally {
    window.removeEventListener('popstate', framework);
  }
});
