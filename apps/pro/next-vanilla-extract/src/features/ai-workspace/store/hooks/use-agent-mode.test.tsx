// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { WorkspaceStoreProvider } from '../context/WorkspaceStoreProvider';
import { readAgentMode } from '../persistence/agent-mode';
import { useAgentMode } from './use-agent-mode';

function wrapper({ children }: { children: ReactNode }) {
  return <WorkspaceStoreProvider allowed>{children}</WorkspaceStoreProvider>;
}

beforeEach(() => sessionStorage.clear());
afterEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
  window.history.replaceState(null, '', '/');
});

describe('Agent presentation mode', () => {
  it('restores the mode after remounting on another route and forgets an explicit exit', () => {
    const first = renderHook(useAgentMode, { wrapper });
    expect(first.result.current.agentMode).toBe(false);
    act(() => first.result.current.setAgentMode(true));
    expect(readAgentMode()).toBe(true);
    first.unmount();

    window.history.replaceState(null, '', '/work/tasks');
    const next = renderHook(useAgentMode, { wrapper });
    expect(next.result.current.agentMode).toBe(true);
    expect(window.location.pathname).toBe('/work/tasks');
    act(() => next.result.current.setAgentMode(false));
    next.unmount();
    expect(renderHook(useAgentMode, { wrapper }).result.current.agentMode).toBe(false);
  });

  it('shares in-memory mode between readers even when session storage is blocked', () => {
    const denied = () => {
      throw new DOMException('Storage access denied', 'SecurityError');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(denied);
    const view = renderHook(() => ({ first: useAgentMode(), second: useAgentMode() }), { wrapper });
    act(() => view.result.current.first.setAgentMode(true));
    expect(view.result.current.second.agentMode).toBe(true);
    act(() => view.result.current.second.setAgentMode(false));
    expect(view.result.current.first.agentMode).toBe(false);
  });

  it('rejects entry and clears a saved mode for an unauthorized account', () => {
    sessionStorage.setItem('virgo-pro.workspace.agent-mode', 'true');
    const view = renderHook(useAgentMode, {
      wrapper: ({ children }: { children: ReactNode }) => (
        <WorkspaceStoreProvider allowed={false}>{children}</WorkspaceStoreProvider>
      ),
    });
    expect(view.result.current.agentMode).toBe(false);
    expect(readAgentMode()).toBe(false);
    act(() => view.result.current.setAgentMode(true));
    expect(view.result.current.agentMode).toBe(false);
    expect(readAgentMode()).toBe(false);
  });

  it('exits immediately when admin permission is lost and does not reenter when restored', () => {
    let allowed = true;
    const view = renderHook(useAgentMode, {
      wrapper: ({ children }: { children: ReactNode }) => (
        <WorkspaceStoreProvider allowed={allowed}>{children}</WorkspaceStoreProvider>
      ),
    });
    act(() => view.result.current.setAgentMode(true));
    allowed = false;
    view.rerender();
    expect(view.result.current.agentMode).toBe(false);
    expect(readAgentMode()).toBe(false);
    allowed = true;
    view.rerender();
    expect(view.result.current.agentMode).toBe(false);
  });
});
