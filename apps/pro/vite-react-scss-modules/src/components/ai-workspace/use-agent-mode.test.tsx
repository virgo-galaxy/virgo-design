// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { readAgentMode, saveAgentMode } from '@/components/ai-workspace/agent-mode';
import { useAgentMode } from '@/components/ai-workspace/use-agent-mode';

beforeEach(() => sessionStorage.clear());
afterEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
  window.history.replaceState(null, '', '/');
});

describe('Agent presentation mode', () => {
  it('restores the mode after remounting on another route and forgets an explicit exit', () => {
    const first = renderHook(() => useAgentMode(true));
    expect(first.result.current.agentMode).toBe(false);
    act(() => first.result.current.setAgentMode(true));
    expect(readAgentMode()).toBe(true);
    first.unmount();

    window.history.replaceState(null, '', '/work/tasks');
    const next = renderHook(() => useAgentMode(true));
    expect(next.result.current.agentMode).toBe(true);
    expect(window.location.pathname).toBe('/work/tasks');
    act(() => next.result.current.setAgentMode(false));
    next.unmount();

    expect(renderHook(() => useAgentMode(true)).result.current.agentMode).toBe(false);
  });

  it('still switches in memory when session storage is blocked', () => {
    const denied = () => {
      throw new DOMException('Storage access denied', 'SecurityError');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(denied);
    const view = renderHook(() => useAgentMode(true));
    act(() => view.result.current.setAgentMode(true));
    expect(view.result.current.agentMode).toBe(true);
    act(() => view.result.current.setAgentMode(false));
    expect(view.result.current.agentMode).toBe(false);
  });

  it('rejects entry and clears a saved mode for an unauthorized account', () => {
    saveAgentMode(true);
    const view = renderHook(() => useAgentMode(false));
    expect(view.result.current.agentMode).toBe(false);
    expect(readAgentMode()).toBe(false);
    act(() => view.result.current.setAgentMode(true));
    expect(view.result.current.agentMode).toBe(false);
    expect(readAgentMode()).toBe(false);
  });

  it('exits immediately when admin permission is lost and does not reenter when restored', () => {
    const view = renderHook(({ allowed }) => useAgentMode(allowed), {
      initialProps: { allowed: true },
    });
    act(() => view.result.current.setAgentMode(true));
    view.rerender({ allowed: false });
    expect(view.result.current.agentMode).toBe(false);
    expect(readAgentMode()).toBe(false);
    view.rerender({ allowed: true });
    expect(view.result.current.agentMode).toBe(false);
  });
});
